import React, { useCallback, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';

// reactstrap components
import PaginationComponent from "react-reactstrap-pagination";
import {
    Row,
    Col,
    Card,
    Table,
    Container,
    CardHeader,
    CardBody,
    CardFooter,
    Collapse,
    Badge,
    Button,
    FormGroup,
    Input,
} from "reactstrap";
import ConfirmGenerarComprobante from "../../components/Modals/ConfirmGenerarComprobante"
import { listReservation, checkIn } from "../../redux/actions/Reserva";
import { toSoles } from "../../util/Helper"
import moment from "moment";
import 'moment/locale/es';
import { useHistory } from 'react-router-dom';
moment.locale('es')

var timeOutFunc;
export default function Reservas() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { reservationList } = useSelector(({ reserva }) => reserva);
    const [page, setpage] = useState(1);
    const [isopen, setisopen] = useState({});
    const [search, setsearch] = useState("");
    const [showConfirm, setshowConfirm] = useState(false);
    const [infoReserva, setinfoReserva] = useState({
        idRC:null,
        pagado: false,
        banco: null,
        sofdoc: null,
        monto: null,
    });

    useEffect(() => {
        clearTimeout(timeOutFunc);
        timeOutFunc = setTimeout(() => {
            dispatch(listReservation(page, { searchReserva: search }));
        }, 800);
    }, [dispatch, page, search]);

    const toggleModal = () => {
        setshowConfirm(!showConfirm);
    };

    const handleConfirm = () => {
        dispatch(checkIn(infoReserva));
        dispatch(listReservation(page, { searchReserva: search }));
    }

    const handleNew = useCallback(() => history.push('/admin/ambientes/reserva'), [history]);

    return (
        <>
            <div className="header pb-8 pt-8 d-flex align-items-center">
                <span className="mask bg-gradient-info opacity-8" />
            </div>
            {/* Page content */}
            <Container className="mt--9" fluid>
                <ConfirmGenerarComprobante
                showConfirm={showConfirm}
                toggleModal={toggleModal}
                handleConfirm={handleConfirm}
                infoReserva={infoReserva}
                setinfoReserva={setinfoReserva}
                />
                <Row>
                    <Col>
                        <Card className="shadow">
                            <CardHeader className="border-0 bg-secondary">
                                <Row>
                                    <Col lg="12" className="border-0 d-flex justify-content-between">
                                        <h3 className="mb-0">Reservas</h3>
                                        <Button
                                            className="btn-new-xl btn-icon d-none d-md-block"
                                            color="primary"
                                            onClick={handleNew}
                                        >
                                            <span className="btn-inner--icon">

                                                <i className="fa fa-plus" />
                                            </span>
                                            <span className="btn-inner--text">Nueva reserva</span>
                                        </Button>
                                    </Col>
                                    <Col lg="12 ">
                                        <hr className="my-4" />
                                        <Row className="bg-secondary">
                                            <Col>
                                                <FormGroup className="mb-0 pb-4">
                                                    <Input
                                                        className="form-control-alternative"
                                                        id="filterReservas"
                                                        placeholder="Buscar motivo o cliente/responsable"
                                                        type="text"
                                                        onChange={(e) => {
                                                            setsearch(e.target.value === "" ? "" : e.target.value)
                                                        }}
                                                        defaultValue={search}
                                                    />
                                                </FormGroup >
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody className="m-0 p-0 border-0">
                                <Table className="align-items-center table-flush" responsive>
                                    <thead className="thead-light">
                                        <tr>
                                            <th scope="col">Fecha</th>
                                            <th scope="col">Horario</th>
                                            <th scope="col">Tipo</th>
                                            <th scope="col">Motivo</th>
                                            <th scope="col">Cliente/Responsable</th>
                                            <th scope="col"></th>
                                        </tr>
                                    </thead>
                                    {
                                        reservationList?.data?.map((r, i) =>
                                            <tbody key={i} style={{ borderBottom: '0px' }}>
                                                <tr className="selectable-row"
                                                    onClick={() => setisopen({ ...isopen, [r.idReserva]: isopen.hasOwnProperty(r.idReserva) ? !isopen[r.idReserva] : true })}>
                                                    <td>
                                                        {moment(r.fecha, "YYYY-MM-DD").format("L")}
                                                    </td>
                                                    <td>
                                                        {`
                                                        ${moment(r.desde, "H:m:s").format("h:mm a")} - 
                                                        ${moment(r.hasta, "H:m:s").format("h:mm a")}`}
                                                    </td>
                                                    <td>
                                                        <Badge color={r.tipo === 1 ? "primary" : r.estado === 2 ? "success" : "danger"}>
                                                            {`${r.tipo === 1 ? "Interna" : "Externa"}`}
                                                        </Badge>
                                                    </td>
                                                    <td className="table-w-line-break">{r.motivo ? r.motivo : <i>Sin motivo</i>}</td>
                                                    <td>{r.persona}</td>
                                                    <td>
                                                        <i className={`fa fa-angle-${isopen[r.idReserva] ? "up" : "down"}`} aria-hidden="true"></i>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colSpan="9" style={{ padding: '0px', border: '0px' }}>
                                                        <Collapse isOpen={isopen[r.idReserva]}>
                                                            <Row>
                                                                <div className="col-12 px-5 py-4 bg-secondary">
                                                                    {r.tipo === 2 &&
                                                                        <div className="col-12 d-flex mx-auto mt-3 mb-3">
                                                                            <strong className="mr-3">
                                                                                {r.idCuenta === null ?
                                                                                    <Button
                                                                                        className="btn btn-sm"
                                                                                        color="success"
                                                                                        type="button"
                                                                                        onClick={() => {
                                                                                            setinfoReserva({...infoReserva,idRC:r.idReserva})
                                                                                            toggleModal();
                                                                                        }}
                                                                                    >
                                                                                        Solicitar generar comprobante
                                                                                    </Button> :
                                                                                    r.idCuenta === 0 ? <span><i className="ni ni-fat-remove text-danger mr-1"></i>Boleta pendiente de generar</span>
                                                                                        : <span><i className="ni ni-check-bold text-success mr-2"></i>Boleta generada</span>
                                                                                }
                                                                            </strong>
                                                                            {
                                                                                r.idCuenta ?
                                                                                    <strong>{r.estado === 1 ? <span><i className="ni ni-fat-remove text-danger mr-2"></i>Pendiente de pago</span> : r.estado === 2 ? <span><i className="ni ni-check-bold text-success mr-1"></i>Cancelada</span> : <span><i className="ni ni-fat-remove text-danger mr-1"></i>Anulada</span>}</strong>
                                                                                    :
                                                                                    ""
                                                                            }
                                                                        </div>
                                                                    }
                                                                    <Table className="text-center">
                                                                        <thead className="thead-light">
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
                                                                    {r.tipo === 2 &&
                                                                        <div className="col-12 text-right mx-auto pr-5">
                                                                            <strong className="ml-auto"><small>Total: S/. </small>{toSoles(r.total)}</strong>
                                                                        </div>
                                                                    }
                                                                </div>
                                                            </Row>
                                                        </Collapse>
                                                    </td>
                                                </tr>
                                            </tbody>

                                        )
                                    }
                                </Table>
                            </CardBody>
                            <CardFooter className="py-4">
                                <nav aria-label="..." className="pagination justify-content-end mb-0">
                                    <PaginationComponent
                                        listClassName="justify-content-end mb-0"
                                        firstPageText="<<"
                                        lastPageText=">>"
                                        previousPageText="<"
                                        nextPageText=">"
                                        totalItems={reservationList?.meta?.total ? reservationList?.meta?.total : 0}
                                        pageSize={10}
                                        onSelect={(selectedPage) => setpage(selectedPage)}
                                        defaultActivePage={page}
                                    />
                                </nav>
                            </CardFooter>
                        </Card>
                    </Col>
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
        {
            d.gratuito ?
                <>
                    <td><strong>GRATUITO</strong></td>
                    <td>{d.cantidad}h</td>
                    <td><strong>GRATUITO</strong></td>
                    <td><strong>GRATUITO</strong></td>
                </>
                :
                <>
                    <td>{toSoles(d.price)}</td>
                    <td>{d.cantidad}h</td>
                    <td>S/. {toSoles(d.descuento)}</td>
                    <td>{toSoles(d.total)}</td>
                </>
        }
    </>