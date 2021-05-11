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
    Table,
} from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import {  showMessage, hideMessage } from '../../redux/actions/Common';
import DataService from "../../firebase/services/notifications";
import moment from "moment";
import 'moment/locale/es';
moment.locale('es');

const Notification = (props) => {
    const dispatch = useDispatch();
    const { authUser } = useSelector(({ auth }) => auth);
    const firebaseNotif=new DataService(authUser?.idColaborador);
    const { reapetedList } = useSelector(({ cuenta }) => cuenta);
    const { notifications } = useSelector(({ firebase }) => firebase);

    const [isOpen, setIsOpen] = useState({});

    const toggle = (key) => {
        if (isOpen[key]) {
            setIsOpen({ ...isOpen, [key]: !isOpen[key] });
        } else {
            setIsOpen({ ...isOpen, [key]: true });
            firebaseNotif.update(key,{
                ...notifications['key'],
                clicked: true,
            });
        }
    }

    return (
        <>
            <div className="header pb-8 pt-5 pt-lg-8 pt-md-8  d-flex align-items-center">
                <span className="mask bg-gradient-info opacity-8" />
            </div>
            {/* Page content */}
            <Container className="mt--7" fluid>
                {/* Table */}
                <Row>
                    <div className="col">
                        <Card className="shadow p-4">
                            <Row>
                                {
                                    reapetedList.map((repeated, key) =>
                                        repeated.serieNumero
                                    )
                                }
                                {
                                    notifications.length > 0 ?
                                    
                                    notifications?.sort((a, b) => moment(b.timestamp).diff(a.timestamp))?.map((notification, key) =>
                                    <Col className={`col-12 p-3 ${props?.location?.state?.notifSelected  == notification.key ? 'notif-selected' : '' }`} key={key}>
                                        <div className="d-flex justify-content-between">
                                            <div className="d-flex">
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
                                                                            <tr>
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
                                                    <Button
                                                        className="btn d-block m-auto mb-1"
                                                        color="success"
                                                        type="button"
                                                        onClick={()=>{
                                                            dispatch(showMessage("Actividad aprobada"));
                                                            firebaseNotif.delete(notification.key);
                                                            setTimeout(() => {
                                                                dispatch(hideMessage());
                                                            }, 3000);
                                                        }}
                                                    >
                                                        <i className="fa fa-check mr-2" aria-hidden="true"></i> Aprobar
                                                    </Button>
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
                                    <div className="text-center">
                                        <small className="text-muted p-1 user-select-none">No tienes notificaciones</small>
                                    </div>
                                }
                            </Row >
                        </Card>
                    </div>
                </Row>
            </Container>
        </>
    );
}
export default Notification;