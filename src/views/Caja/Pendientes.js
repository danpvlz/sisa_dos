import React, { useState, useEffect } from "react";
import PaginationComponent from "react-reactstrap-pagination";

// reactstrap components
import {
    Card,
    CardHeader,
    CardFooter,
    Table,
    Container,
    Row,
    Col,
    UncontrolledCollapse,
    Button
} from "reactstrap";
// core components
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loaders/LoadingSmall";
import { listPendings } from "../../redux/actions/Caja";
import { toSoles } from "../../util/Helper";
import { getDetail, payCaja } from "../../redux/actions/Caja";
import PaymentsModal from "components/Modals/Payments.js";
import PayModal from '../../components/Modals/PayModal';
import moment from "moment";
import 'moment/locale/es';
moment.locale('es')

const Pendientes = () => {
    const dispatch = useDispatch();
    const { pendingsListCaja } = useSelector(({ caja }) => caja);
    const { billsStatusActions } = useSelector(({ cuenta }) => cuenta);
    const [page, setPage] = useState(1);
    const [showBillDetail, setshowBillDetail] = useState(false);
    const { loading } = useSelector(({ commonData }) => commonData);
    const [fechasince, setfechasince] = useState(new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60000)).toISOString().split('T')[0]);
    const [idCuenta, setidCuenta] = useState(null);
    const [showPay, setshowPay] = useState(false);
    const [bancopago, setbancopago] = useState(1);
    const [fecha, setfecha] = useState("");
    const [monto, setmonto] = useState(0);
    const [numoperacion, setNumOperacion] = useState("");
    const [numsofdoc, setNumSofdoc] = useState("");
    const [montoPaid, setMontoPaid] = useState("");

    useEffect(() => {
        dispatch(listPendings(page));
    }, [billsStatusActions,page,dispatch]);

    const toggleModalDetail = () => {
        setshowBillDetail(!showBillDetail);
    };

    const toggleModalPay = () => {
        setshowPay(!showPay);
    };

    const handlePay = () => {
        //REGISTRAR
        var fData = {
            "idCuenta": idCuenta,
            "monto": monto,
            "fechaPago": fecha,
            "opcion": bancopago,
            "numoperacion": numoperacion,
            "numsofdoc": numsofdoc,
            "montoPaid": montoPaid,
        }
        dispatch(payCaja(fData))
        //REGISTRAR
        setidCuenta(null);
        setbancopago(1);
        setmonto("");
        setfecha("");
        setNumOperacion("");
        setNumSofdoc("");
    }

    return (
        <>
            <div className="header pb-8 pt-9 d-flex align-items-center">
                <span className="mask bg-gradient-info opacity-8" />
            </div>
            {/* Page content */}
            <Container className="mt--9" fluid>
                <PayModal
                    showPay={showPay}
                    toggleModal={toggleModalPay}
                    opciones={true}
                    fecha={fecha}
                    setfecha={setfecha}
                    monto={monto}
                    setmonto={setmonto}
                    handlePay={handlePay}
                    setbancopago={setbancopago}
                    fechasince={fechasince}
                    numoperacion={numoperacion}
                    numsofdoc={numsofdoc}
                    setNumOperacion={setNumOperacion}
                    setNumSofdoc={setNumSofdoc}
                    setMontoPaid={setMontoPaid}
                    montoPaid={montoPaid}
                />
                <PaymentsModal
                    showDetail={showBillDetail} toggleModal={toggleModalDetail}
                />
                <Row>
                    <div className="col">
                        <Card className="shadow">
                            <CardHeader className="border-0 bg-secondary">
                                <Row >
                                    <Col lg="12" className="border-0 d-flex justify-content-between">
                                        <h3 className="mb-0">Pendientes</h3>
                                    </Col>
                                </Row>
                            </CardHeader>
                            {
                                !loading || pendingsListCaja?.data ?
                                    <>
                                        <Table className="align-items-center table-flush" responsive>
                                            <thead className="thead-light">
                                                <tr>
                                                    <th scope="col">Vencimiento</th>
                                                    <th scope="col">Emisión</th>
                                                    <th scope="col">Serie</th>
                                                    <th scope="col">Cliente</th>
                                                    <th scope="col">Total</th>
                                                    <th scope="col">Observaciones</th>
                                                </tr>
                                            </thead>
                                            {
                                                pendingsListCaja?.data?.map((cuenta, key) =>
                                                    <tbody key={key} style={{ borderBottom: '0px' }}>
                                                        <tr id={`toggler_${key}`} className="selectable-row">
                                                            <td className={`font-weight-bold ${moment(cuenta.fechaVencimiento).diff(moment(), 'days') <= 7 ? 'text-danger' : ''}`}>
                                                                {`${moment(cuenta.fechaVencimiento).fromNow()}`} <span className="flex">({moment(cuenta.fechaVencimiento).format('D MMM')})</span>
                                                            </td>
                                                            <td>
                                                                {moment(cuenta.fechaEmision).format('L')}
                                                            </td>
                                                            <td>
                                                                {cuenta.serieNumero}
                                                            </td>
                                                            <td>
                                                                {cuenta.denominacion}
                                                            </td>
                                                            <td>
                                                                {`S/.${toSoles(cuenta.total)}`}
                                                            </td>
                                                            <td>
                                                                {cuenta.observaciones}
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td colSpan="9" style={{ padding: '0px', border: '0px' }}>
                                                                <UncontrolledCollapse toggler={`#toggler_${key}`}>
                                                                    <div className="text-muted text-small p-3 text-center">
                                                                        <Button className="btn-sm" color="white" variant="contained"
                                                                            onClick={(e) => {
                                                                                dispatch(getDetail(cuenta.idCuenta));
                                                                                toggleModalDetail();
                                                                            }}
                                                                        >
                                                                            <i className="text-blue fa fa-eye" aria-hidden="true"></i> Detalle
                                                                        </Button>
                                                                        <Button className="btn-sm" color="white" variant="contained"
                                                                            onClick={(e) => { setfechasince(cuenta.fechaEmision); setidCuenta(cuenta.idCuenta); setmonto(cuenta.total); toggleModalPay(); }}
                                                                        >
                                                                            <i className="fa fa-credit-card text-success" aria-hidden="true"></i> Cancelar
                                                                        </Button>
                                                                    </div>
                                                                </UncontrolledCollapse>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                )
                                            }
                                        </Table>
                                        <CardFooter className="py-4">
                                            <nav aria-label="..." className="pagination justify-content-end mb-0">
                                                <PaginationComponent
                                                    listClassName="justify-content-end mb-0"
                                                    firstPageText="<<"
                                                    lastPageText=">>"
                                                    previousPageText="<"
                                                    nextPageText=">"
                                                    totalItems={pendingsListCaja?.meta?.total ? pendingsListCaja?.meta?.total : 0}
                                                    pageSize={10}
                                                    onSelect={(selectedPage) => setPage(selectedPage)}
                                                    defaultActivePage={page}
                                                />
                                            </nav>
                                        </CardFooter>
                                    </>
                                    :
                                    <Loading />
                            }
                        </Card>
                    </div>
                </Row>
            </Container>
        </>
    );
};

export default Pendientes;
