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
    CardHeader,
    Form,
    FormGroup,
    InputGroupAddon,
    InputGroupText,
    Input,
    InputGroup,
} from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { showMessage, hideMessage } from '../../redux/actions/Common';
import { getMyFolders, storeFolderContent, storeFolder } from '../../redux/actions/Colaborador';
import DataService from "../../firebase/services/notifications";
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
    }, []);

    useEffect(() => {
        let a_folders = [];
        myFolders?.map(y => y.idFolder).filter((x, i, a) => a.indexOf(x) == i).map((idFolder, key) =>
            a_folders.push(myFolders.find(f => f.idFolder == idFolder))
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
                    <div className="col">
                        <Card className="shadow container">
                            <Row className=" bg-secondary rounded">
                                <Col className="col-3 text-muted bar-notif-container">
                                    <Row>
                                        <Col className="p-0">
                                            <button
                                                className={`notif-bar-item ${selectItem == 'notif' ? ' notif-bar-item-selected' : 'notif-bar-item-not-selected'}`}
                                                type="button"
                                                onClick={() => setselectItem('notif')}
                                            >
                                                <div className="ml-2">
                                                    <i className="ni ni-email-83 mr-2" />
                                                    <span>Notificaciones</span>
                                                    {
                                                        notifications?.length > 0 &&
                                                        <Badge color="primary" pill style={{ fontSize:'10px', marginLeft: 'auto'}}>
                                                            {notifications?.length}
                                                        </Badge>
                                                    }
                                                </div>
                                            </button>
                                        </Col>
                                        <Col className="mt-4">
                                            <div className="d-flex justify-content-between" style={{ cursor: 'pointer' }}>
                                                <strong>Carpetas</strong>
                                                <Badge className="badge-success" onClick={toggleModal}><i className="fa fa-plus mr-2" /> Nuevo</Badge>
                                            </div>
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
                                                        <Col className="p-0" key={key}>
                                                            <button
                                                                className={`notif-bar-item ${selectItem == folder.idFolder ? ' notif-bar-item-selected' : 'notif-bar-item-not-selected'}`}
                                                                type="button"
                                                                onClick={() => setselectItem(folder.idFolder)}
                                                            >
                                                                <div className="ml-2">
                                                                    <i className="fa fa-folder mr-2" style={{ color: folder.color ? folder.color : '#fed86f' }} />
                                                                    <span>{folder.folder} </span>
                                                                    {
                                                                        myFolders?.filter(n => n.idFolder == folder.idFolder  && n.contenido != null)?.length>0 &&
                                                                        <Badge color="primary" pill style={{ fontSize:'10px', marginLeft: 'auto'}}>
                                                                            {myFolders?.filter(n => n.idFolder == folder.idFolder  && n.contenido != null)?.length}
                                                                        </Badge>
                                                                    }
                                                                </div>
                                                            </button>
                                                        </Col>
                                                    )
                                                }
                                            </Row>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col className="col-9">
                                    <Row className="p-3" style={{ overflow: 'auto', maxHeight: '550px' }}>
                                        {
                                            selectItem == 'notif' ?
                                                <NotificationContainer props={props} folders={folders} />
                                                :
                                                <FolderContainer folders={myFolders} selected={selectItem} />
                                        }
                                    </Row>
                                </Col>
                            </Row>
                        </Card>
                    </div>
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
                folders?.filter(n => n.idFolder == selected  && n.contenido != null)?.length > 0 ?
                    folders?.filter(n => n.idFolder == selected )?.map(n => JSON.parse(n.contenido))?.sort((a, b) => moment(b.timestamp).diff(a.timestamp))?.map((notification, key) =>
                        <Col className={`col-12 my-2 p-2 notif-normal`} key={key}>
                            <div className="d-flex justify-content-between">
                                <div className="d-flex py-2 px-3">
                                    <div style={{ padding: '0 .8rem 0 0', fontSize: '1.2rem' }}>
                                        <i className="ni ni-bell-55 text-danger" />
                                    </div>
                                    <div>
                                        <strong style={{ display: 'block' }}>{notification.title}
                                        </strong>
                                        <span>{notification.description}</span>
                                        <small className="d-block mt-2">{moment(notification.timestamp, "YYYY-MM-DD h:m:s").fromNow()}</small>
                                    </div>
                                </div>
                                <div style={{ padding: '0 .8rem 0 0', fontSize: '.7rem', display: 'block', margin: 'auto 0', color: '#949494' }}>
                                    <Button
                                        className="btn btn-sm m-0 p-0 icon icon-shape rounded-circle shadow"
                                        onClick={() => toggle(notification.key)}
                                    >
                                        <i className="fa fa-angle-down" aria-hidden="true"></i>
                                    </Button>
                                </div>
                            </div>
                            <Collapse className="mt-3" isOpen={isOpen[notification.key]}>
                                <Card>
                                    <CardBody>
                                        {
                                            notification?.detail?.map((detail, kdetail) =>
                                                <div key={kdetail}>
                                                    <strong>{detail.serieNumero} - <span className="font-weight-normal">{detail.fechaEmision}</span></strong>
                                                    <p className="mb-0">{detail.asociado}</p>
                                                    <p>
                                                        <Badge style={{ marginRight: '.5rem', fontSize: '.8rem' }} color="success">
                                                            {detail.estado == 1 ? 'Por cancelar' : detail.estado == 2 ? 'Cancelada' : 'Anulada'}
                                                        </Badge>
                                                        <span className="font-weight-bold">S/.{detail.total}</span>
                                                    </p>
                                                    <table className="table-sm align-items-center table-flush text-center">
                                                        <thead className="thead-light ">
                                                            <tr>
                                                                <th scope="col">Fecha</th>
                                                                <th scope="col">Monto</th>
                                                                <th scope="col">Banco</th>
                                                                <th scope="col">Operación</th>
                                                                <th scope="col">SofDoc</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {JSON.parse(detail.pagos).map((pago, key) =>
                                                                <tr key={key}>
                                                                    <td>
                                                                        {pago.fecha}
                                                                    </td>
                                                                    <td>
                                                                        {pago.monto}
                                                                    </td>
                                                                    <td>
                                                                        {pago.banco ?
                                                                            pago.banco == 1 ? 'BCP' : pago.banco == 2 ? 'BBVA' : pago.banco == 3 ? 'BANCOS' : pago.banco == 4 ? 'CONTADO' : 'CRÉDITO'
                                                                            : '-'}
                                                                    </td>
                                                                    <td className={`${notification.numoperacion ? 'text-danger font-weight-bold' : 'd-block'}`}>
                                                                        {pago.numoperacion}
                                                                    </td>
                                                                    <td className={`${notification.numsofdoc ? 'text-danger font-weight-bold' : 'd-block'}`}>
                                                                        {pago.numsofdoc ? pago.numsofdoc : '-'}
                                                                    </td>
                                                                </tr>)}
                                                        </tbody>
                                                    </table>
                                                    <hr className="my-4 " />
                                                </div>
                                            )
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
                        <Col className={`col-12 my-2 p-2 ${props?.location?.state?.notifSelected == notification.key ? 'notif-selected' : notification.clicked ? 'notif-normal' : 'not-clicked'}`} key={key}>
                            <div className="d-flex justify-content-between">
                                <div className="d-flex py-2 px-3">
                                    <div style={{ padding: '0 .8rem 0 0', fontSize: '1.2rem' }}>
                                        <i className="ni ni-bell-55 text-danger" />
                                    </div>
                                    <div>
                                        <strong style={{ display: 'block' }}>{notification.title}
                                        </strong>
                                        <span>{notification.description}</span>
                                        <small className="d-block mt-2">{moment(notification.timestamp, "YYYY-MM-DD h:m:s").fromNow()}</small>
                                    </div>
                                </div>
                                <div style={{ padding: '0 .8rem 0 0', fontSize: '.7rem', display: 'block', margin: 'auto 0', color: '#949494' }}>
                                    <Button
                                        className="btn btn-sm m-0 p-0 icon icon-shape rounded-circle shadow"
                                        onClick={() => toggle(notification.key)}
                                    >
                                        <i className="fa fa-angle-down" aria-hidden="true"></i>
                                    </Button>
                                </div>
                            </div>
                            <Collapse className="mt-3" isOpen={isOpen[notification.key]}>
                                <Card>
                                    <CardBody>
                                        {
                                            notification?.detail?.map((detail, kdetail) =>
                                                <div key={kdetail}>
                                                    <strong>{detail.serieNumero} - <span className="font-weight-normal">{detail.fechaEmision}</span></strong>
                                                    <p className="mb-0">{detail.asociado}</p>
                                                    <p>
                                                        <Badge style={{ marginRight: '.5rem', fontSize: '.8rem' }} color="success">
                                                            {detail.estado == 1 ? 'Por cancelar' : detail.estado == 2 ? 'Cancelada' : 'Anulada'}
                                                        </Badge>
                                                        <span className="font-weight-bold">S/.{detail.total}</span>
                                                    </p>
                                                    <table className="table-sm align-items-center table-flush text-center">
                                                        <thead className="thead-light ">
                                                            <tr>
                                                                <th scope="col">Fecha</th>
                                                                <th scope="col">Monto</th>
                                                                <th scope="col">Banco</th>
                                                                <th scope="col">Operación</th>
                                                                <th scope="col">SofDoc</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {JSON.parse(detail.pagos).map((pago, key) =>
                                                                <tr key={key}>
                                                                    <td>
                                                                        {pago.fecha}
                                                                    </td>
                                                                    <td>
                                                                        {pago.monto}
                                                                    </td>
                                                                    <td>
                                                                        {pago.banco ?
                                                                            pago.banco == 1 ? 'BCP' : pago.banco == 2 ? 'BBVA' : pago.banco == 3 ? 'BANCOS' : pago.banco == 4 ? 'CONTADO' : 'CRÉDITO'
                                                                            : '-'}
                                                                    </td>
                                                                    <td className={`${notification.numoperacion ? 'text-danger font-weight-bold' : 'd-block'}`}>
                                                                        {pago.numoperacion}
                                                                    </td>
                                                                    <td className={`${notification.numsofdoc ? 'text-danger font-weight-bold' : 'd-block'}`}>
                                                                        {pago.numsofdoc ? pago.numsofdoc : '-'}
                                                                    </td>
                                                                </tr>)}
                                                        </tbody>
                                                    </table>
                                                    <hr className="my-4 " />
                                                </div>
                                            )
                                        }
                                        <div className="d-flex">
                                            {
                                                folders?.map((f, k) =>
                                                    <Button
                                                        className="btn d-block m-auto mb-1"
                                                        style={{ backgroundColor: f.color ? f.color : '#fed86f', color: 'white' }}
                                                        type="button"
                                                        onClick={() => {
                                                            dispatch(storeFolderContent({
                                                                idFolder: f.idFolder,
                                                                content: JSON.stringify(notification),
                                                            }));
                                                            firebaseNotif.delete(notification.key);
                                                            dispatch(showMessage("Actividad aprobada"));
                                                            setTimeout(() => {
                                                                dispatch(hideMessage());
                                                                dispatch(getMyFolders());
                                                            }, 3000);
                                                        }}
                                                    >
                                                        {f.folder}
                                                    </Button>
                                                )
                                            }
                                        </div>
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
        formdata.nombre.length == 0 ?
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
        />
    </div>

export default Notification;