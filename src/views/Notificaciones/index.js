import React, { useEffect, useState } from 'react';
// reactstrap components
import {
    Card,
    Badge,
    CardBody,
    Container,
    Row,
    Col,
    Button,
    Collapse,
    Modal,
    UncontrolledDropdown,
    DropdownToggle,
    Form,
    FormGroup,
    InputGroupAddon,
    InputGroupText,
    Input,
    InputGroup,
    DropdownMenu,
    DropdownItem,
} from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { showMessage, hideMessage } from '../../redux/actions/Common';
import { getMyFolders, storeFolderContent, storeFolder } from '../../redux/actions/Colaborador';
import DataService from "../../firebase/services/notifications";
import NotificationPagos from "./Tables/NotificationPagos";
import NotificationAsociado from "./Tables/NotificationAsociado";
import NotificationAsociadoEdit from "./Tables/NotificationAsociadoEdit";
import NotificacionInscripcion from "./Tables/NotificacionInscripcion";
import moment from "moment";
import 'moment/locale/es';
moment.locale('es');

const Notification = (props) => {
    const dispatch = useDispatch();
    const { notifications } = useSelector(({ firebase }) => firebase);
    const { myFolders } = useSelector(({ colaborador }) => colaborador);
    const [folders, setfolders] = useState([]);
    const [selectItem, setselectItem] = useState('notif');

    const [addFolterModal, setaddFolterModal] = useState(false);

    const toggleModal = () => {
        setaddFolterModal(!addFolterModal)
    }

    useEffect(() => {
        dispatch(getMyFolders());
    }, [dispatch]);

    useEffect(() => {
        const updateWidth = () => {
            const width = document.body.clientWidth
            if (width > 767) {
                document.getElementById('sidenav-main')?.classList?.add('d-none');
                document.getElementById('admin-main-content')?.classList?.add('ml-0');
            } else {
                document.getElementById('sidenav-main')?.classList?.remove('d-none');
                document.getElementById('admin-main-content')?.classList?.remove('ml-0');
            }
        }
        // Actualizaremos el width al montar el componente
        updateWidth()
        // Nos suscribimos al evento resize de window
        window.addEventListener("resize", updateWidth)

        // Devolvemos una función para anular la suscripción al evento
        return () => {
            document.getElementById('sidenav-main')?.classList?.remove('d-none');
            document.getElementById('admin-main-content')?.classList?.remove('ml-0');
            window.removeEventListener("resize", updateWidth);
        }
    })

    useEffect(() => {
        let a_folders = [];
        myFolders?.map(y => y.idFolder).filter((x, i, a) => a.indexOf(x) === i).map((idFolder) =>
            a_folders.push(myFolders.find(f => f.idFolder === idFolder))
        );
        setfolders(a_folders);
    }, [myFolders])

    return (
        <>
            <div className="header pb-8 pt-5 pt-lg-8 pt-md-8  d-flex align-items-center">
                <span className="mask bg-gradient-info opacity-8" />
            </div>
            {/* Page content */}
            <Container className="mt--9" fluid>
                {/* Table */}
                <Row>
                    <Col className="shadow mx-2">
                        <Row className=" bg-secondary rounded">
                            <Col className="col-3 text-muted bar-notif-container">
                                <Row>
                                    <div className="col-12 p-0">
                                        <button
                                            className={`notif-bar-item ${selectItem === 'notif' ? ' notif-bar-item-selected' : 'notif-bar-item-not-selected'}`}
                                            type="button"
                                            onClick={() => setselectItem('notif')}
                                        >
                                            <div className="ml-2">
                                                <i className="ni ni-email-83 mr-2" />
                                                <span className="d-none d-md-block">Notificaciones</span>
                                                {
                                                    notifications?.length > 0 &&
                                                    <Badge color="primary" pill style={{ fontSize: '10px', marginLeft: 'auto' }}>
                                                        {notifications?.length}
                                                    </Badge>
                                                }
                                            </div>
                                        </button>
                                    </div>
                                    <div className="col-12 mt-4">
                                        <Row className="d-flex justify-content-between m-0">
                                            <strong>Carpetas</strong>
                                            <Badge className="badge-success" style={{ cursor: 'pointer' }} onClick={toggleModal}><i className="fa fa-plus mr-2" /> Nuevo</Badge>
                                        </Row>
                                        <Row className="mt-2">
                                            {
                                                folders.sort((a, b) => {
                                                    if (a.folder > b.folder) {
                                                        return 1;
                                                    }
                                                    if (a.folder < b.folder) {
                                                        return -1;
                                                    }
                                                    return 0;
                                                }).map((folder, key) =>
                                                    <div className="col-12 p-0" key={key}>
                                                        <button
                                                            className={`notif-bar-item ${selectItem === folder.idFolder ? ' notif-bar-item-selected' : 'notif-bar-item-not-selected'}`}
                                                            type="button"
                                                            onClick={() => setselectItem(folder.idFolder)}
                                                        >
                                                            <Row >
                                                                <i className="fa fa-folder folder-icon" style={{ color: folder.color ? folder.color : '#fed86f' }} />
                                                                <span className="mx-1">{folder.folder} </span>
                                                                {
                                                                    myFolders?.filter(n => n.idFolder === folder.idFolder && n.contenido != null)?.length > 0 &&
                                                                    <Badge className="d-none d-md-block" color="primary" pill style={{ fontSize: '10px', marginLeft: 'auto', marginRight: '1rem' }}>
                                                                        {myFolders?.filter(n => n.idFolder === folder.idFolder && n.contenido != null)?.length}
                                                                    </Badge>
                                                                }
                                                            </Row>
                                                        </button>
                                                    </div>
                                                )
                                            }
                                        </Row>
                                    </div>
                                </Row>
                            </Col>
                            <Col className="col-9">
                                <Row className="p-3  styled-scroll" style={{ overflow: 'auto', maxHeight: '550px', margin: '.3rem 0' }}>
                                    {
                                        selectItem === 'notif' ?
                                            <NotificationContainer props={props} folders={folders} />
                                            :
                                            <FolderContainer folders={myFolders} selected={selectItem} />
                                    }
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <AddNewFolder isOpen={addFolterModal} toggleModal={toggleModal} />
            </Container>
        </>
    );
}

const FolderContainer = ({ folders, selected }) => {
    const [isOpen, setIsOpen] = useState({});
    const toggle = (key) => {
        if (isOpen[key]) {
            setIsOpen({ ...isOpen, [key]: !isOpen[key] });
        } else {
            setIsOpen({ ...isOpen, [key]: true });
        }
    }
    return (
        <>
            {
                folders?.filter(n => n.idFolder === selected && n.contenido != null)?.length > 0 ?
                    folders?.filter(n => n.idFolder === selected)?.map(n => JSON.parse(n.contenido))?.sort((a, b) => moment(b.timestamp).diff(a.timestamp))?.map((notification, key) =>
                        <Col className={`col-12 my-2 p-2 notif-normal`} key={key}>
                            <div className="d-flex justify-content-between"
                            >
                                <div className="d-flex py-2 px-3" onClick={() => toggle(notification.key)} style={{ cursor: 'pointer' }}>
                                    <div style={{ padding: '0 .8rem 0 0', fontSize: '1.2rem' }}>
                                        <i className={`ni ni-bell-55 text-${notification.color ? notification.color : 'danger'}`} />
                                    </div>
                                    <div>
                                        <strong style={{ display: 'block' }}>{notification.title}
                                        </strong>
                                        <span>{notification.description}</span>
                                        <small className="d-block mt-2">{moment(notification.timestamp, "YYYY-MM-DD h:m:s").fromNow()}</small>
                                    </div>
                                </div>
                            </div>
                            <Collapse className="mt-3" isOpen={isOpen[notification.key]}>
                                <Card>
                                    <CardBody>
                                        {
                                            notification?.tipo === 2 ?
                                                <NotificationAsociado detail={notification?.detail} timestamp={notification?.timestamp} />
                                                :
                                                notification?.tipo === 3 ?
                                                    <NotificationAsociadoEdit detail={notification?.detail} />
                                                    :
                                                    notification?.tipo === 4 ?
                                                        <NotificacionInscripcion detail={notification?.detail} />
                                                        :
                                                            <NotificationPagos details={notification?.detail} numoperacion={notification.numoperacion} numsofdoc={notification.numsofdoc} />
                                        }
                                    </CardBody>
                                </Card>
                            </Collapse>
                        </Col>
                    )
                    :
                    <EmptyMessages />
            }
        </>
    );
}

const NotificationContainer = ({ props, folders }) => {
    const dispatch = useDispatch();
    const { authUser } = useSelector(({ auth }) => auth);
    const firebaseNotif = new DataService(authUser?.idColaborador);
    const { notifications } = useSelector(({ firebase }) => firebase);
    const [isOpen, setIsOpen] = useState({});
    const toggle = (key) => {
        if (isOpen[key]) {
            setIsOpen({ ...isOpen, [key]: !isOpen[key] });
        } else {
            setIsOpen({ ...isOpen, [key]: true });
            firebaseNotif.update(key, {
                ...notifications['key'],
                clicked: true,
            });
        }
    }

    return (
        <>
            {
                notifications.length > 0 ?
                    notifications?.sort((a, b) => moment(b.timestamp).diff(a.timestamp))?.map((notification, key) =>
                        <Col className={`col-12 my-2 p-2 ${props?.location?.state?.notifSelected === notification.key ? 'notif-selected' : notification.clicked ? 'notif-normal' : 'not-clicked'}`} key={key}>
                            <div className="d-flex justify-content-between" >
                                <div className="d-flex py-2 px-3" onClick={() => toggle(notification.key)} style={{ cursor: 'pointer' }}>
                                    <div style={{ padding: '0 .8rem 0 0', fontSize: '1.2rem' }}>
                                        <i className={`ni ni-bell-55 text-${notification.color ? notification.color : 'danger'}`} />
                                    </div>
                                    <div>
                                        <strong style={{ display: 'block' }}>{notification.title}
                                        </strong>
                                        <span>{notification.description}</span>
                                        <small className="d-block mt-2">{`${moment(notification.timestamp, "YYYY-MM-DD h:m:s").fromNow()} - ${moment(notification.timestamp).format('LLL')}`}</small>
                                    </div>
                                </div>
                                <UncontrolledDropdown>
                                    <DropdownToggle
                                        className="text-primary mt-1"
                                        role="button"
                                        size="sm"
                                        color=""
                                        onClick={(e) => e.preventDefault()}
                                    >
                                    <i className="ni ni-archive-2 fa-lg" />
                                    </DropdownToggle>
                                    <DropdownMenu className="dropdown-menu-arrow" right positionFixed={true}>
                                            {
                                                folders?.map((f, k) =>
                                                    <DropdownItem
                                                        key={k}
                                                        className="d-flex"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            if(notification.detail.hasOwnProperty('id')){
                                                                let not=notification.detail;
                                                                delete not.id;
                                                            }
                                                            dispatch(storeFolderContent({
                                                                idFolder: f.idFolder,
                                                                content: JSON.stringify(notification),
                                                            }));
                                                            firebaseNotif.delete(notification.key);
                                                            dispatch(showMessage("Notificación archivada"));
                                                            setTimeout(() => {
                                                                dispatch(hideMessage());
                                                                dispatch(getMyFolders());
                                                            }, 3000);
                                                        }}
                                                    >
                                                    <i className="fa fa-folder folder-icon"  aria-hidden="true" style={{ color: f.color ? f.color : '#fed86f' }} />
                                                     {f.folder}
                                                    </DropdownItem>
                                                )
                                            }
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </div>
                            <Collapse className="mt-3" isOpen={isOpen[notification.key]}>
                                <Card>
                                    <CardBody>
                                        {
                                            notification?.tipo === 2 ?
                                                <NotificationAsociado detail={notification?.detail} timestamp={notification?.timestamp} />
                                                :
                                                notification?.tipo === 3 ?
                                                    <NotificationAsociadoEdit detail={notification?.detail} handleDone={()=>firebaseNotif.delete(notification.key)}/>
                                                    :
                                                    notification?.tipo === 4 ?
                                                        <NotificacionInscripcion detail={notification?.detail} />
                                                        :
                                                            <NotificationPagos details={notification?.detail} numoperacion={notification.numoperacion} numsofdoc={notification.numsofdoc} />
                                        }
                                    </CardBody>
                                </Card>
                            </Collapse>
                            {
                                notification.length > (key + 1) &&
                                <hr className="my-4 " />
                            }
                        </Col>
                    )
                    :
                    <EmptyMessages />
            }
        </>
    );
}

const AddNewFolder = ({ isOpen, toggleModal }) => {
    const dispatch = useDispatch();

    const [formdata, setformdata] = useState({
        nombre: '',
        color: '#adb5bd'
    });

    const [error, seterror] = useState(false);

    const handleSubmit = () => {
        formdata.nombre.length === 0 ?
            seterror(true) :
            dispatch(storeFolder(formdata));
        toggleModal();
        setTimeout(() => {
            dispatch(getMyFolders());
            setformdata({
                nombre: '',
                color: '#adb5bd'
            });
        }, 1000)
    }

    return (
        <Modal
            className="modal-dialog-centered"
            size="sm"
            isOpen={isOpen}
            toggle={toggleModal}
        >
            <div className="modal-body p-0">
                <Card className="bg-secondary shadow border-0">
                    <CardBody>
                        <Form role="form">
                            <FormGroup>
                                <InputGroup className="input-group-alternative">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="fa fa-folder" style={{ color: formdata.color }} />
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input placeholder="Nombre del nuevo folder" type="text"
                                        value={formdata.nombre}
                                        onChange={(e) => {
                                            seterror(false);
                                            setformdata({ ...formdata, nombre: e.target.value });
                                        }} />
                                </InputGroup>
                                {
                                    error &&
                                    <div className="text-danger text-center">
                                        <span className="text-sm">Falta completar nombre del folder</span>
                                    </div>
                                }
                            </FormGroup>
                            <FormGroup>
                                <Input type="color"
                                    value={formdata.color}
                                    onChange={(e) => {
                                        setformdata({ ...formdata, color: e.target.value });
                                    }} />
                            </FormGroup>
                            <div className="text-center">
                                <Button
                                    color="primary"
                                    type="button"
                                    onClick={handleSubmit}
                                >
                                    Guardar
                                </Button>
                            </div>
                        </Form>
                    </CardBody>
                </Card>
            </div>
        </Modal>
    );
}

const EmptyMessages = () =>
    <div className="text-center m-auto">
        <img
            style={{ opacity: '.2' }}
            src={require("../../assets/img/brand/empty-messages.png").default}
            alt="Bandeja vacía"
        />
    </div>

export default Notification;