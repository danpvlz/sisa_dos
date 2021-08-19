import React, { useState, useEffect } from "react";

// reactstrap components
import {
    Card,
    CardHeader,
    CardFooter,
    Table,
    Container,
    Row,
    Button,
    Col,
    FormGroup,
    Input,
    UncontrolledCollapse,
} from "reactstrap";
// core components
import Select from 'react-select';
import PaginationComponent from "react-reactstrap-pagination";
import SearchAsociado from "components/Selects/SearchAsociado.js";
import SearchCliente from "components/Selects/SearchCliente.js";
import PaymentsModal from "components/Modals/Payments.js";
import { useDispatch, useSelector } from "react-redux";
import { list, exportPagos } from "../../redux/actions/Pago";
import Loading from "../../components/Loaders/LoadingSmall";
import { toSoles } from "../../util/Helper"
import moment from "moment";
import 'moment/locale/es';
moment.locale('es')

const Pagos = () => {
    const dispatch = useDispatch();
    const { pagoList } = useSelector(({ pago }) => pago);
    const { loading } = useSelector(({ commonData }) => commonData);
    const [showBillDetail, setshowBillDetail] = useState(false);

    const [page, setPage] = useState(1);
    const [search, setsearch] = useState({
        serie: 109,
        since: `${new Date().getFullYear()}-${new Date().getMonth() + 1 < 10 ? '0' + (new Date().getMonth() + 1) : new Date().getMonth() + 1}-01`,
        until: `${new Date().getFullYear()}-${new Date().getMonth() + 1 < 10 ? '0' + (new Date().getMonth() + 1) : new Date().getMonth() + 1}-${new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate()}`
    });

    const toggleModalDetail = () => {
        setshowBillDetail(!showBillDetail);
    };

    useEffect(() => {
        dispatch(list(page, search));
    }, [page, search, dispatch]);

    const deleteSearch = (key) => {
        let tsearch = search;
        delete tsearch[key];
        setsearch(tsearch);
        dispatch(list(page, search));
    }

    return (
        <>
            <div className="header pb-8 pt-9 d-flex align-items-center">
                <span className="mask bg-gradient-info opacity-8" />
            </div>
            {/* Page content */}
            <Container className="mt--9" fluid>
                <PaymentsModal
                    showDetail={showBillDetail} toggleModal={toggleModalDetail}
                />
                {/* Table */}
                <Row>
                    <div className="col">
                        <Card className="shadow">
                            <CardHeader className="border-0 bg-secondary">
                                <Row >
                                    <Col lg="12" className="border-0 d-flex justify-content-between">
                                        <h3 className="mb-0">Pagos</h3>
                                    </Col>
                                    <Col lg="12 ">
                                        <hr className="my-4 " />
                                        <Row className="bg-secondary">
                                            <Col lg="2"  >
                                                <FormGroup className="mb-0 pb-4">
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="filterMonth"
                                                    >
                                                        Serie
                                                    </label>
                                                    <Select
                                                        isSearchable={false}
                                                        defaultValue={{ value: 109, label: "109" }}
                                                        className="select-style"
                                                        name="serie"
                                                        onChange={(e) => {
                                                            setsearch({ ...search, serie: e.value })
                                                        }}
                                                        options={[
                                                            { value: 108, label: "108" },
                                                            { value: 109, label: "109" }
                                                        ]}
                                                    />
                                                </FormGroup >
                                            </Col>
                                            <Col lg="3"  >
                                                <FormGroup className="mb-0 pb-4">
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="filterMonth"
                                                    >
                                                        Desde
                                                    </label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        name="since"
                                                        type="date"
                                                        value={search?.since}
                                                        onChange={(e) => {
                                                            e.target.value !== "" ?
                                                                setsearch({ ...search, since: e.target.value })
                                                                :
                                                                deleteSearch('since');
                                                        }}
                                                    />
                                                </FormGroup >
                                            </Col>
                                            <Col lg="3"  >
                                                <FormGroup className="mb-0 pb-4">
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="filterMonth"
                                                    >
                                                        Hasta
                                                    </label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        name="until"
                                                        type="date"
                                                        value={search?.until}
                                                        onChange={(e) => {
                                                            e.target.value !== "" ?
                                                                setsearch({ ...search, until: e.target.value })
                                                                :
                                                                deleteSearch('until');
                                                        }}
                                                    />
                                                </FormGroup >
                                            </Col>
                                            <Col lg="2"  >
                                                <FormGroup className="mb-0 pb-4">
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="filterMonth"
                                                    >
                                                        Operación
                                                    </label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        type="text"
                                                        onChange={(e) => {
                                                            e.target.value !== "" ?
                                                                setsearch({ ...search, operacion: e.target.value })
                                                                :
                                                                deleteSearch('operacion');
                                                        }}
                                                    />
                                                </FormGroup >
                                            </Col>
                                            <Col lg="2"  >
                                                <FormGroup className="mb-0 pb-4">
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="filterMonth"
                                                    >
                                                        SofDoc
                                                    </label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        type="text"
                                                        onChange={(e) => {
                                                            e.target.value !== "" ?
                                                                setsearch({ ...search, sofdoc: e.target.value })
                                                                :
                                                                deleteSearch('sofdoc');
                                                        }}
                                                    />
                                                </FormGroup >
                                            </Col>
                                            <Col lg="2"  >
                                                <FormGroup className="mb-0 pb-4">
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="filterMonth"
                                                    >
                                                        Banco
                                                    </label>
                                                    <Select
                                                        placeholder="Seleccione..."
                                                        className="select-style"
                                                        name="banco"
                                                        isClearable
                                                        onChange={(e) => {
                                                            e != null ?
                                                                setsearch({ ...search, banco: e.value })
                                                                :
                                                                deleteSearch('banco');
                                                        }}
                                                        options={
                                                            search.serie === 109 ?
                                                                [
                                                                    { value: 1, label: "BCP" },
                                                                    { value: 2, label: "BBVA" }
                                                                ]
                                                                :
                                                                [
                                                                    { value: 1, label: "BCP" },
                                                                    { value: 2, label: "BBVA" },
                                                                    { value: 3, label: "BANCOS" },
                                                                    { value: 4, label: "CONTADO" },
                                                                    { value: 5, label: "CREDITO" }
                                                                ]
                                                        }
                                                    />
                                                </FormGroup >
                                            </Col>
                                            <Col lg="6"  >
                                                {
                                                    search?.serie === 109 ?
                                                        <FormGroup className="mb-0 pb-4">
                                                            <label
                                                                className="form-control-label"
                                                                htmlFor="filterMonth"
                                                            >
                                                                Asociado
                                                            </label>
                                                            <SearchAsociado setVal={(e) => setsearch({ ...search, idAsociado: e })} />
                                                        </FormGroup>
                                                        :
                                                        <FormGroup className="mb-0 pb-4">
                                                            <label
                                                                className="form-control-label"
                                                                htmlFor="filterMonth"
                                                            >
                                                                Cliente
                                                            </label>
                                                            <SearchCliente setVal={(e) => setsearch({ ...search, idCliente: e })} />
                                                        </FormGroup>
                                                }
                                            </Col>
                                            <Col lg="1" className="text-right my-auto ml-auto">
                                                <Button color="success" type="button" onClick={() => dispatch(exportPagos(search))}>
                                                    <img alt="Botón exportar" src={require("../../assets/img/theme/excel_export.png").default} style={{ height: "20px" }} />
                                                </Button>
                                            </Col>
                                        </Row>

                                    </Col>
                                </Row>
                            </CardHeader>
                            {
                                !loading ?
                                    <>
                                        <Table className="align-items-center table-flush table-sm" responsive>
                                            <thead className="thead-light">
                                                <tr>
                                                    <th scope="col">Fecha</th>
                                                    <th scope="col">{search?.serie === 109 ? 'Asociado' : 'Cliente'}</th>
                                                    <th scope="col">Monto Op.</th>
                                                    <th scope="col">Banco</th>
                                                    <th scope="col">Operación</th>
                                                    <th scope="col">SofyDoc</th>
                                                    <th scope="col">Serie-Número</th>
                                                    <th scope="col">Monto Fact.</th>
                                                </tr>
                                            </thead>
                                            {
                                                pagoList?.data?.map((cuenta, key) =>
                                                    <tbody key={key} style={{ borderBottom: '0px' }}>
                                                        <tr id={`toggler_${key}`} className="selectable-row">
                                                            <td>
                                                                {moment(cuenta.fecha).format('L')}
                                                            </td>
                                                            <td>
                                                                {cuenta.adquiriente}
                                                            </td>
                                                            <td className="text-right">
                                                                <small>S/.</small>
                                                                {toSoles(cuenta.montoPaid)}
                                                            </td>
                                                            <td>
                                                                {
                                                                    cuenta.bancos === 'BBVA' || cuenta.bancos === 'BCP' ?
                                                                        <img
                                                                            className="img-card-pagos"
                                                                            alt={cuenta.bancos}
                                                                            src={
                                                                                require(`../../assets/img/resources/${cuenta.bancos}.png`).default} />
                                                                        :
                                                                        cuenta.bancos
                                                                }
                                                            </td>
                                                            <td className="text-right">
                                                                {cuenta.numoperacion ? cuenta.numoperacion : "-"}
                                                            </td>
                                                            <td className="text-right">
                                                                {cuenta.numsofdoc ? cuenta.numsofdoc : "-"}
                                                            </td>
                                                            <td className="text-right">
                                                                {cuenta.serieNumero}
                                                            </td>
                                                            <td className="text-right">
                                                                <small>S/.</small>
                                                                {toSoles(cuenta.total)}
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td colSpan="9" style={{ padding: '0px', border: '0px' }}>
                                                                <UncontrolledCollapse toggler={`#toggler_${key}`}>
                                                                    {
                                                                        cuenta.metadata ? 
                                                                        <DetailTransaction data={JSON.parse(cuenta.metadata)} />
                                                                        :
                                                                        <div className="text-muted text-small m-3">--No hay pago externo--</div>
                                                                    }
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
                                                    totalItems={pagoList?.meta?.total ? pagoList?.meta?.total : 0}
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

const DetailTransaction = ({ data }) => {
    return (
        <div className="p-4 row bg-secondary">
            <div className="mx-4">
                <span className="d-block"><small><i className="mr-2 fa fa-file" aria-hidden="true"></i></small> Información de transacción</span>
                <span className="d-block"><strong>Estado: <span className={`text-${data.orderStatus === 'PAID' ? 'success' : 'black'}`}>{data.orderStatus === 'PAID' ? 'PAGADO' : data.orderStatus === 'UNPAID' ? 'NO PAGADO' : data.orderStatus === 'RUNNING' ? 'PROCESANDO' : data.orderStatus === 'PARTIALLY_PAID' ? 'PARCIALMENTE PAGADO' : data.orderStatus}</span></strong></span>
                <span className="d-block"><strong>Monto: </strong>S/. {toSoles(data?.orderDetails?.orderTotalAmount / 100)}</span>
                <span className="d-block"><strong>Fecha: </strong>{moment(data.serverDate).format('L h:mm:ss a')}</span>
                <br></br>
                <span className="d-block"><small><i className="mr-2 ni ni-credit-card"></i></small> Medio de pago</span>
                {data.transactions.map((t, i) =>
                    <div key={i} className="mb-3">
                        <span className="d-block"><strong>Medio de pago: </strong>{t.transactionDetails.cardDetails.effectiveBrand}</span>
                        <span className="d-block"><strong>Tarjeta: </strong>{t.transactionDetails.cardDetails.pan}</span>
                        <span className="d-block"><strong>Monto: </strong>S/. {toSoles(t.amount / 100)}</span>
                        <span className="d-block"><strong>Estado: </strong>{t.status === 'PAID' ? 'Pagado' : t.status === 'UNPAID' ? 'No pagado' : t.status === 'RUNNING' ? 'Procesando' : t.status === 'PARTIALLY_PAID' ? 'Parcialmente pagado' : t.status}</span>
                        {
                            data.transactions.length > (i + 1) &&
                            <hr className="my-1"></hr>
                        }
                    </div>
                )}
            </div>
            <div className="mx-4">
                <span className="d-block"><small><i className="mr-2 ni ni-badge"></i></small> Comprador</span>
                <span className="d-block"><strong>DNI: </strong> {data.customer.billingDetails.identityCode}</span>
                <span className="d-block"><strong>Cliente: </strong> {`${data.customer.billingDetails.firstName} ${data.customer.billingDetails.lastName}`}</span>
                <span className="d-block"><strong>Correo: </strong> {data.customer.email}</span>
                <span className="d-block"><strong>Teléfonos: </strong> {`${data.customer.billingDetails.cellPhoneNumber}, ${data.customer.billingDetails.phoneNumber}`}</span>
                <span className="d-block"><strong>Dirección: </strong> {data.customer.billingDetails.address}</span>
            </div>
            <div className="mx-4">
                <span className="d-block"><small><i className="mr-2 ni ni-cart"></i></small> Carrito</span>
                {data.customer.shoppingCart.cartItemInfo.map((c, i) => <div key={i}>
                    <span className="d-block"><strong>Servicio: </strong> {c.productLabel}</span>
                    <span className="d-block"><strong>Precio: </strong> S/. {toSoles(c.productAmount)}</span>
                    {
                        data.customer.shoppingCart.cartItemInfo.length > (i + 1) &&
                        <hr className="my-1"></hr>
                    }
                </div>)}
            </div>
        </div>
    );
}

export default Pagos;
