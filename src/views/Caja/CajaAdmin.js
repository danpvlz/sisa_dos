import React, { useCallback, useState, useEffect, useRef  } from "react";
import { useHistory } from 'react-router-dom';
import PaginationComponent from "react-reactstrap-pagination";
import ConfirmDialog from '../../components/Modals/ConfirmDialog';
import PayModal from '../../components/Modals/PayModal';

// reactstrap components
import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Table,
  Container,
  Row,
  Button,
  Col,
  FormGroup,
  Input,
} from "reactstrap";
// core components
import Select from 'react-select';
import PaymentsModal from "components/Modals/Payments.js";
import CuentasHeader from "components/Headers/CuentasHeader.js";
import SearchCliente from "components/Selects/SearchCliente.js";
import { useDispatch, useSelector } from "react-redux";
import { listbysector} from "../../redux/actions/Cuenta";
import { listBills, anularCuenta, payCaja, getDetail, indicatorsBills, exportBills, exportBillsDetail } from "../../redux/actions/Caja";
import Loading from "../../components/Loaders/LoadingSmall";

var timeOutFunc;
const Cuenta = () => {
  const dispatch = useDispatch();
  const selectInputRef = useRef();
  const selectInputRefCliente = useRef();
  const { billsStatusActions } = useSelector(({ cuenta }) => cuenta);
  const { loading } = useSelector(({ commonData }) => commonData);
  const { billListCaja, billIndicatorsCaja } = useSelector(({ caja }) => caja);
  const history = useHistory();
  const handleNew = useCallback(() => history.push('/admin/registro-caja'), [history]);

  const [page, setPage] = useState(1);
  const [search, setsearch] = useState({});
  const [idCuenta, setidCuenta] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);

  const [showPay, setshowPay] = useState(false);
  const [fecha, setfecha] = useState("");
  const [monto, setmonto] = useState(0);
  const [bancopago, setbancopago] = useState(1);
  const [numoperacion, setNumOperacion] = useState("");
  const [numsofdoc, setNumSofdoc] = useState("");

  const [showBillDetail, setshowBillDetail] = useState(false);

  //Filters
  const [loaded, setloaded] = useState(false);
  const [since, setsince] = useState(`${new Date().getFullYear()}-${new Date().getMonth()+1<10 ? '0'+(new Date().getMonth()+1) : new Date().getMonth()+1}-01`);
  const [until, setuntil] = useState(`${new Date().getFullYear()}-${new Date().getMonth()+1<10 ? '0'+(new Date().getMonth()+1) : new Date().getMonth()+1}-${new Date(new Date().getFullYear(), new Date().getMonth()+1, 0).getDate()}`);
  const [status, setstatus] = useState(null);
  const [idCliente, setidCliente] = useState(null);
  const [cobrador, setcobrador] = useState(null);
  const [number, setnumber] = useState(null);
  const [sincePay, setsincepay] = useState(null);
  const [untilPay, setuntilpay] = useState(null);
  const [montoPaid, setMontoPaid] = useState("");
  
  const [fechasince, setfechasince] = useState(new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60000)).toISOString().split('T')[0]);

  useEffect(() => {
    if (billsStatusActions === 200) {
      dispatch(listBills(page, search));
      dispatch(indicatorsBills(search));
      dispatch(listbysector(search));
    }
  }, [billsStatusActions,page,search,dispatch]);
  
  useEffect(() => {
    let tsearch = search;
    let wait = false;
    
    if (cobrador == null) {
      delete tsearch.debCollector;
    } else {
      tsearch.debCollector = cobrador;
    }

    if (idCliente == null) {
      delete tsearch.idCliente;
    } else {
      tsearch.idCliente = idCliente;
    }

    if (status == null || status === 0) {
      delete tsearch.status;
    } else {
      tsearch.status = status;
    }

    if (number == null || number === 0) {
      delete tsearch.number;
    } else {
      tsearch.number = number;
      wait=true;
    }
    if (sincePay == null) {
      delete tsearch.sincePay;
    } else {
      tsearch.sincePay = sincePay;
      wait=true;
    }

    if (untilPay == null) {
      delete tsearch.untilPay;
    } else {
      tsearch.untilPay = untilPay;
      wait=true;
    }

    if (since == null) {
      delete tsearch.since;
    } else {
      tsearch.since = since;
      wait=true;
    }

    if (until == null) {
      delete tsearch.until;
    } else {
      tsearch.until = until;
      wait=true;
    }

    if (loaded) {
      if(wait){
        clearTimeout(timeOutFunc);
        timeOutFunc = setTimeout(()=>{ 
          setsearch(tsearch);
          dispatch(listBills(page, tsearch));
          dispatch(indicatorsBills(search));
          dispatch(listbysector(search));
        }, 800);
      }
    }else{
      setsearch(tsearch);
      dispatch(listBills(page, tsearch));
      dispatch(indicatorsBills(search));
    }
    return () => {
    setloaded(false);
    }
  }, [page,cobrador,idCliente,status ,number,sincePay,untilPay,since,until,search,loaded,dispatch]);

  const toggleModal = () => {
    setShowConfirm(!showConfirm);
  };

  const toggleModalPay = () => {
    setshowPay(!showPay);
  };

  const toggleModalDetail = () => {
    setshowBillDetail(!showBillDetail);
  };

  const handleConfirm = () => {
    //REGISTRAR
    dispatch(anularCuenta(idCuenta))
    //REGISTRAR
    setidCuenta(null);
  }
  
  const handlePay=()=>{
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
      <CuentasHeader
        pendientes={billIndicatorsCaja?.pendientes}
        cobrado={billIndicatorsCaja?.cobrado}
        emitidos={billIndicatorsCaja?.emitidos}
        anulado={billIndicatorsCaja?.anulado}
      />
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
      {/* Page content */}
      <Container className="mt--7" fluid>
        <ConfirmDialog
          question={"¿Seguro de anular cuenta y pagos asociados?"}
          showConfirm={showConfirm} toggleModal={toggleModal} handleConfirm={handleConfirm} />
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
                    <h3 className="mb-0">Cuentas</h3>
                    <Button
                      className="btn-new-xl btn-icon d-none d-md-block"
                      color="primary"
                      onClick={handleNew}
                    >
                      <span className="btn-inner--icon">

                        <i className="fa fa-plus" />
                      </span>
                      <span className="btn-inner--text">Nueva emisión</span>
                    </Button>
                    <Button
                      className="btn-new-small icon icon-shape bg-primary text-white rounded-circle shadow d-sm-none"
                      onClick={handleNew}
                    >
                      <i className="fas fa-plus" />
                    </Button>
                  </Col>
                  <Col lg="12 ">
                    <hr className="my-4 " />
                    <Row className="bg-secondary">
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
                            id="fitlerSince"
                            placeholder="fitlerSince"
                            type="date"
                            value={since ? since : ""}
                            onChange={(e, actionMeta) => {
                              setsince(e.target.value !== "" ? e.target.value : null);
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
                            id="filterUntil"
                            placeholder="filterUntil"
                            type="date"
                            value={until ? until : ""}
                            onChange={(e, actionMeta) => {
                              setuntil(e.target.value !== "" ? e.target.value : null);
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
                            Número
                      </label>
                          <Input
                            className="form-control-alternative"
                            name="number"
                            onChange={(e) => {
                              setnumber(e.target.value === "" ? null : e.target.value)
                            }}
                            value={number ? number : ""}
                        />
                        </FormGroup >
                      </Col>
                      <Col lg="4"  >
                        <FormGroup className="mb-0 pb-4">
                          <label
                            className="form-control-label"
                            htmlFor="filterMonth"
                          >
                            Cliente
                      </label>
                          <SearchCliente setVal={setidCliente} selectInputRef={selectInputRefCliente}/>
                        </FormGroup>
                      </Col>
                      <Col lg="2"  >
                        <FormGroup className="mb-0 pb-4">
                          <label
                            className="form-control-label"
                            htmlFor="filterMonth"
                          >
                            Estado
                      </label>
                          <Select
                            placeholder="Seleccione..."
                            className="select-style"
                            name="status"
                            isClearable
                            onChange={(inputValue, actionMeta) => {
                              setstatus(inputValue ? inputValue.value : null);
                            }}
                            value={status ? [{ value: 4, label: "Emitido" }, { value: 1, label: "Por cancelar" }, { value: 2, label: "Cancelada" }, { value: 3, label: "Anulada" }][status] : ""}
                            options={[{ value: 4, label: "Emitido" }, { value: 1, label: "Por cancelar" }, { value: 2, label: "Cancelada" }, { value: 3, label: "Anulada" }]} />
                        </FormGroup >
                      </Col>
                      <Col lg="3" className="text-left my-auto">
                        <Button className="btn-sm" color="info" type="button" onClick={() => {
                          setloaded(false);
                          setsince(null);
                          setuntil(null);
                          setstatus(null);
                          setidCliente(null);
                          setcobrador(null);
                          setnumber(null);
                          setsincepay(null);
                          setuntilpay(null);
                          setfechasince(null);
                          selectInputRef?.current?.select?.clearValue();
                          selectInputRefCliente?.current?.select?.clearValue();
                          setloaded(true);
                        }}>
                        <i className="fa fa-ban mr-1" aria-hidden="true"></i>Limpiar filtros
                        </Button>
                      </Col>
                      <Col lg="1" className="text-right my-auto ml-auto">
                        <Button color="success" type="button" onClick={() => { dispatch(exportBills(search)); dispatch(exportBillsDetail(search)); }}>
                          <img alt="Exportar" src={require("../../assets/img/theme/excel_export.png").default} style={{ height: "20px" }} />
                        </Button>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </CardHeader>
              {
                !loading || billListCaja?.data ?
                  <>
              <Table className="align-items-center table-flush table-sm" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Emision</th>
                    <th scope="col">Serie-Número</th>
                    <th scope="col">Cliente</th>
                    <th scope="col">Total</th>
                    <th scope="col">Estado</th>
                    <th scope="col">Observaciones</th>
                    <th scope="col">Fecha fin pago</th>
                    <th scope="col">Anulación</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {
                    billListCaja?.data?.map((cuenta, key) =>

                      <tr key={key}>
                        <td>
                          {cuenta.fechaEmision}
                        </td>
                        <td>
                          {`${cuenta.serieNumero} ${cuenta.tipo === "NC" ? " - "+cuenta.tipo : ""}`}
                        </td>
                        <td>
                          {cuenta.denominacion}
                        </td>
                        <td className="text-center">
                          <small>S/.</small> {cuenta.total}
                        </td>
                        <td>
                          <Badge color="" className="badge-dot mr-4">
                            <i className={cuenta.estado === 1 ? "bg-info" : cuenta.estado === 2 ? "bg-success" : "bg-danger"} />
                            {cuenta.estado === 1 ? "Por cancelar" : cuenta.estado === 2 ? "Cancelada" : cuenta.estado === 0 ? "Emitido" : "Anulada"}
                          </Badge>
                        </td>
                        <td>
                          {cuenta.observaciones}
                        </td>
                        <td>
                          {cuenta.fechaFinPago}
                        </td>
                        <td>
                          {cuenta.fechaAnulacion}
                        </td>
                        <td className="text-right">
                          <UncontrolledDropdown>
                            <DropdownToggle
                              className="btn-icon-only text-light"
                              role="button"
                              size="sm"
                              color=""
                              onClick={(e) => e.preventDefault()}
                            >
                              <i className="fas fa-ellipsis-v" />
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-menu-arrow" right positionFixed={true}>
                              <DropdownItem
                                className="d-flex"
                                onClick={(e) => {
                                  dispatch(getDetail(cuenta.idCuenta));
                                  toggleModalDetail();
                                }}
                              >
                                <i className="text-blue fa fa-eye" aria-hidden="true"></i> Detalle
                              </DropdownItem>
                              {
                                cuenta.estado === 1 ?
                                  <>
                                    <DropdownItem
                                      className="d-flex"
                                      onClick={(e) => { setfechasince(cuenta.fechaEmision); setidCuenta(cuenta.idCuenta); setmonto(cuenta.total); toggleModalPay(); }}
                                    >
                                      <i className="fa fa-credit-card text-success" aria-hidden="true"></i> Cancelar
                                    </DropdownItem>
                                    <DropdownItem
                                      className="d-flex"
                                      onClick={(e) => { setidCuenta(cuenta.idCuenta); toggleModal(); }}
                                    >
                                      <i className="text-danger fa fa-ban" aria-hidden="true"></i> Anular
                                    </DropdownItem>
                                  </>
                                  :
                                  cuenta.estado === 2 ?
                                    <>
                                      <DropdownItem
                                        className="d-flex"
                                        onClick={(e) => { setidCuenta(cuenta.idCuenta); toggleModal(); }}
                                      >
                                        <i className="text-danger fa fa-ban" aria-hidden="true"></i> Anular
                                      </DropdownItem>
                                    </>
                                    :
                                    ""
                              }
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </td>
                      </tr>
                    )
                  }

                </tbody>
              </Table>
              <CardFooter className="py-4">
                <nav aria-label="..." className="pagination justify-content-end mb-0">
                  <PaginationComponent
                    listClassName="justify-content-end mb-0"
                    firstPageText="<<"
                    lastPageText=">>"
                    previousPageText="<"
                    nextPageText=">"
                    totalItems={billListCaja?.meta?.total ? billListCaja?.meta?.total : 0}
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

export default Cuenta;
