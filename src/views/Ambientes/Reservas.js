import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';

// reactstrap components
import {
    Container,
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
    Badge,
    Collapse,
    Table,
} from "reactstrap";

import { listReservation } from "../../redux/actions/Reserva";
import { toSoles } from "../../util/Helper"
import moment from "moment";
import 'moment/locale/es';
moment.locale('es');

export default function Reservas() {
    const dispatch = useDispatch();
    const { reservationList } = useSelector(({ reserva }) => reserva);
    const [isopen, setisopen] = useState({});

    useEffect(() => {
        dispatch(listReservation());
    }, [dispatch]);

    return (
        <>
            <div className="header pb-8 pt-8 d-flex align-items-center">
                <span className="mask bg-gradient-info opacity-8" />
            </div>
            {/* Page content */}
            <Container className="mt--9" fluid>
                <Row>
                    <Col>
                        <Card className="shadow">
                            <CardHeader className="border-0 bg-secondary">
                                <Row >
                                    <Col lg="12" className="border-0 d-flex justify-content-between">
                                        <h3 className="mb-0">Reservas</h3>
                                    </Col>
                                </Row>
                            </CardHeader>
                        </Card>
                    </Col>
                    {
                        [...new Set(reservationList?.data?.map(a => a.fecha))].map((f, k) =>
                            <Col key={k} className="col-12 mt-1">
                                <Card>
                                    <CardHeader className="border-0">
                                        <Row >
                                            <Col lg="12" className="border-0 d-flex justify-content-between">
                                                <strong>{moment(f, "YYYY-MM-DD").format("ll")}</strong>
                                            </Col>
                                        </Row>
                                    </CardHeader>
                                    <CardBody className="border-0">
                                        <Row>
                                            {
                                                reservationList?.data?.filter(rl => rl.fecha === f)?.map((r, i) =>
                                                    <Col key={i} className="col-12 pt-2 pb-3 selectable-row"
                                                        onClick={() => setisopen({ ...isopen, [r.idReserva]: isopen.hasOwnProperty(r.idReserva) ? !isopen[r.idReserva] : true })}
                                                    >
                                                        <Row>
                                                            <Col className="col-3">
                                                                <strong>
                                                                    {`${moment(r.desde, "H:m:s").format("h:mm a")} - ${moment(r.hasta, "H:m:s").format("h:mm a")}`}
                                                                </strong>
                                                            </Col>
                                                            <Col>
                                                                <strong className="mr-3">{r.motivo ? r.motivo : <i>Sin título</i>}</strong>
                                                                <Badge color={r.tipo === 1 ? "primary" : "danger"}>
                                                                    {`${r.tipo === 1 ? "Interna" : "Externa"}`}
                                                                </Badge>
                                                                <p className="mb-0"><small><i className="ni ni-single-02 text-muted"></i> {r.persona}</small></p>
                                                            </Col>
                                                            <Col className="col-1 d-flex d-flex align-items-center">
                                                                <i className={`fa fa-angle-${isopen[r.idReserva] ? "up" : "down"}`} aria-hidden="true"></i>
                                                            </Col>
                                                        </Row>
                                                        <Collapse isOpen={isopen[r.idReserva]}>
                                                            <Row>
                                                                <div className="col-12 d-flex justify-content-between mx-auto mt-5">
                                                                    <div>
                                                                    <strong className="mr-3">{r.boleta===1 ? <span><i className="ni ni-check-bold text-success mr-2"></i>Boleta generada</span> : <span><i className="ni ni-fat-remove text-danger mr-1"></i>Boleta pendiente de generar</span>}</strong>
                                                                    <strong>{r.pagada===1 ? <span><i className="ni ni-check-bold text-success mr-2"></i>Pagado</span> : <span><i className="ni ni-fat-remove text-danger mr-1"></i>Pago pendiente</span>}</strong>
                                                                    </div>
                                                                </div>
                                                                <Table className="table-sm align-items-center table-flush text-center mb-3" responsive>
                                                                    <thead className="thead-light ">
                                                                        {r.tipo === 1 ?
                                                                            <tr>
                                                                                <th>Ambiente/Material</th>
                                                                            </tr> :
                                                                            <tr>
                                                                                <th>Ambiente/Material</th>
                                                                                <th>Precio</th>
                                                                                <th>Cantidad</th>
                                                                                <th>Descuento</th>
                                                                                <th>Total</th>
                                                                            </tr>}
                                                                    </thead>
                                                                    <tbody>
                                                                        {
                                                                            JSON.parse(r.detalle)?.map((d, j) =>
                                                                                <tr key={j}>
                                                                                    {r.tipo === 1 ? <ItemInternal d={d} /> : <ItemExternal d={d} />}
                                                                                </tr>
                                                                            )
                                                                        }
                                                                    </tbody>
                                                                </Table>
                                                                <div className="col-12 d-flex justify-content-between mx-auto">
                                                                    <strong className="mr-4"><small>Total: S/. </small>{toSoles(r.total)}</strong>
                                                                </div>
                                                            </Row>
                                                        </Collapse>
                                                    </Col>
                                                )
                                            }
                                        </Row>
                                    </CardBody>
                                </Card>
                            </Col>
                        )
                    }
                </Row>
            </Container>
        </>
    )
}


const ItemInternal = ({ d }) =>
    <>
        <td>{d.concepto}</td>
    </>

const ItemExternal = ({ d }) =>
    <>
        <td>{d.concepto}</td>
        <td>S/. {toSoles(d.price)}</td>
        <td>{d.cantidad}h</td>
        <td>S/. {toSoles(d.descuento)}</td>
        <td>S/. {toSoles(d.total)}</td>
    </>