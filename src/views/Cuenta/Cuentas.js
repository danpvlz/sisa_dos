import React, { useState, useEffect, useRef } from "react";
import PaginationComponent from "react-reactstrap-pagination";
import ConfirmDialog from '../../components/ConfirmDialog';

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
import PaymentsModal from "components/Payments.js";
import CuentasHeader from "components/Headers/CuentasHeader.js";
import SearchAsociado from "components/Selects/SearchAsociado.js";
import SearchCobrador from "components/Selects/SearchCobrador.js";
import { useDispatch, useSelector } from "react-redux";
import { listBills, listbysector, indicatorsBills, anularCuenta, pagarCuenta, getBillDetail, exportBills, exportBillsDetail } from "../../redux/actions/Cuenta";

const Cuenta = () => {
  const selectInputRef = useRef();
  const selectInputRefAsociado = useRef();
  const dispatch = useDispatch();
  const { billList, billIndicators, billsStatusActions, billListBySector } = useSelector(({ cuenta }) => cuenta);

  const [loaded, setloaded] = useState(false);

  const [page, setPage] = useState(1);
  const [search, setsearch] = useState({});
  const [idCuenta, setidCuenta] = useState(null);
  const [action, setaction] = useState(1);
  const [showConfirm, setShowConfirm] = useState(false);
  const [sendConfirm, setsendConfirm] = useState(false);

  const [showPay, setshowPay] = useState(false);
  const [fecha, setfecha] = useState({ "fecha": new Date().toISOString().substring(0, 10) });
  const [monto, setmonto] = useState(0);
  const [bancopago, setbancopago] = useState(1);
  const [sendPay, setsendPay] = useState(0);

  const [showBillDetail, setshowBillDetail] = useState(false);

  const [showBillsTable, setshowBillsTable] = useState(false);

  //Filters
  const [since, setsince] = useState(null);
  const [until, setuntil] = useState(null);
  const [sincePay, setsincepay] = useState(null);
  const [untilPay, setuntilpay] = useState(null);
  const [status, setstatus] = useState(null);
  const [idAsociado, setidAsociado] = useState(null);
  const [cobrador, setcobrador] = useState(null);
  const [number, setnumber] = useState(null);

  useEffect(() => {
    if (billsStatusActions == 200) {
      dispatch(listBills(page, search));
      dispatch(indicatorsBills(search));
    dispatch(listbysector(search));
    }
  }, [billsStatusActions]);

  
  useEffect(() => {
    let tsearch = search;
    
    if (cobrador == null) {
      delete tsearch.debCollector;
    } else {
      tsearch.debCollector = cobrador;
    }

    if (idAsociado == null) {
      delete tsearch.idAsociado;
    } else {
      tsearch.idAsociado = idAsociado;
    }

    if (status == null || status == 0) {
      delete tsearch.status;
    } else {
      tsearch.status = status;
    }

    if (number == null || number == 0) {
      delete tsearch.number;
    } else {
      tsearch.number = number;
    }
    if (sincePay == null) {
      delete tsearch.sincePay;
    } else {
      tsearch.sincePay = sincePay;
    }

    if (untilPay == null) {
      delete tsearch.untilPay;
    } else {
      tsearch.untilPay = untilPay;
    }

    if (since == null) {
      delete tsearch.since;
    } else {
      tsearch.since = since;
    }

    if (until == null) {
      delete tsearch.until;
    } else {
      tsearch.until = until;
    }

    if (loaded) {
    setsearch(tsearch);
    dispatch(listBills(page, tsearch));
    dispatch(indicatorsBills(search));
    dispatch(listbysector(search));
    }
  }, [page,cobrador,idAsociado,status ,number,sincePay,untilPay,since,until]);

  const toggleModal = () => {
    setShowConfirm(!showConfirm);
  };

  const toggleModalPay = () => {
    setshowPay(!showPay);
  };

  const toggleModalDetail = () => {
    setshowBillDetail(!showBillDetail);
  };

  useEffect(() => {
    if (action == 1 && sendConfirm) {
      //REGISTRAR
      var fData = {
        "idCuenta": idCuenta,
      }
      dispatch(anularCuenta(fData))
      //REGISTRAR
      setsendConfirm(false);
      setidCuenta(null);
    }
  }, [sendConfirm]);

  useEffect(() => {
    if (sendPay) {
      //REGISTRAR
      var fData = {
        "idCuenta": idCuenta,
        "monto": monto,
        "fechaPago": fecha,
        "banco": bancopago,
      }
      dispatch(pagarCuenta(fData))
      //REGISTRAR
      setsendPay(false);
      setidCuenta(null);
      setbancopago(1);
    }
  }, [sendPay]);

  useEffect(() => {
    dispatch(listBills(page, search));
    dispatch(indicatorsBills(search));
    dispatch(listbysector(search));
    setloaded(true);
    return () => {
      setloaded(false);
    }
  }, []);

  return (
    <>
      <CuentasHeader
        pendientes={billIndicators?.pendientes}
        cobrado={billIndicators?.cobrado}
        emitidos={billIndicators?.emitidos}
        anulado={billIndicators?.anulado}
      />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <ConfirmDialog
          question={action == 1 ? "¿Seguro de anular cuenta y pagos asociados?" : "¿Seguro de pagar cuenta?"}
          showConfirm={showConfirm} toggleModal={toggleModal} setConfirm={setsendConfirm} />
        <PaymentsModal
          showDetail={showBillDetail} toggleModal={toggleModalDetail}
        />
        {/* Table */}
        <Row className="mb-3">
          <div className="col">
            <Card className="shadow">
              <Table
                className="align-items-center table-flush"
                responsive
              >
                <thead>
                  <tr>
                    <th scope="col" className="text-left font-weight-bold">Cobrador</th>
                    <th scope="col" className="text-right font-weight-bold" >Emitido</th>
                    <th scope="col" className="text-right font-weight-bold">Cobrado</th>
                    <th scope="col" className="text-right font-weight-bold">Pendiente</th>
                    <th scope="col" className="text-right font-weight-bold">Anulado</th>
                  </tr>
                </thead>
                <tbody className="text-right">
                {
                    billListBySector?.cuentas?.map((bill, key) =>
                      <tr key={key}>
                        <td scope="row" className="text-left font-weight-bold">{bill.descripcion}</td>
                        <td>{bill.emitidos}</td>
                        <td>{bill.cobrado}</td>
                        <td>{bill.pendientes}</td>
                        <td>{bill.anulado}</td>
                      </tr>
                    )
                  }
                  <tr>
                    <td scope="row" className="text-left font-weight-bold">Afiliaciones</td>
                    <td>{billListBySector?.afiliaciones?.emitidos}</td>
                    <td>{billListBySector?.afiliaciones?.cobrado}</td>
                    <td>{billListBySector?.afiliaciones?.pendientes}</td>
                    <td>{billListBySector?.afiliaciones?.anulado}</td>
                  </tr>
                </tbody>
              </Table>
            </Card>
          </div>
        </Row>
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0 bg-secondary">
                <Row >
                  <Col lg="12" className="border-0 d-flex justify-content-between">
                    <h3 className="mb-0">Cuentas</h3>
                    <Button
                      className="btn btn-sm btn-new-small icon icon-shape rounded-circle shadow "
                      onClick={()=>setshowBillsTable(!showBillsTable)}
                    >
                      <i className={showBillsTable ? `fa fa-angle-up` : `fa fa-angle-down`} />
                    </Button>
                  </Col>
                  <Col lg="12 " className={showBillsTable ?  '' : 'd-none'}>
                    <hr className="my-4 " />
                    <Row className="bg-secondary">
                      <Col lg="3"  >
                        <FormGroup className="mb-0 pb-4">
                          <label
                            className="form-control-label"
                            htmlFor="filterMonth"
                          >
                            Emisión desde
                      </label>
                          <Input
                            className="form-control-alternative"
                            id="fitlerSince"
                            placeholder="fitlerSince"
                            type="date"
                            value={since ? since : ""}
                            onChange={(inputValue, actionMeta) => {
                              console.log(inputValue)
                              setsince(inputValue != null ? inputValue.target.value : null);
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
                            Emisión hasta
                      </label>
                          <Input
                            className="form-control-alternative"
                            id="filterUntil"
                            placeholder="filterUntil"
                            type="date"
                            value={until ? until : ""}
                            onChange={(inputValue, actionMeta) => {
                              setuntil(inputValue != null ? inputValue.target.value : null);
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
                              setnumber(e.target.value == "" ? null : e.target.value)
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
                            Asociado
                      </label>
                          <SearchAsociado setVal={setidAsociado} selectInputRef={selectInputRefAsociado}/>
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
                            onChange={(inputValue, actionMeta) => {
                              setstatus(inputValue.value);
                            }}
                            value={status ? [{ value: 0, label: "Emitido" }, { value: 1, label: "Por cancelar" }, { value: 2, label: "Cancelada" }, { value: 3, label: "Anulada" }][status] : ""}
                            options={[{ value: 0, label: "Emitido" }, { value: 1, label: "Por cancelar" }, { value: 2, label: "Cancelada" }, { value: 3, label: "Anulada" }]} />
                        </FormGroup >
                      </Col>
                      <Col lg="4"  >
                        <FormGroup className="mb-0 pb-4">
                          <label
                            className="form-control-label"
                            htmlFor="filterMonth"
                          >
                            Cobrador
                      </label>
                          <SearchCobrador setVal={setcobrador} selectInputRef={selectInputRef}/>
                        </FormGroup>
                      </Col>
                      <Col lg="3"  >
                        <FormGroup className="mb-0 pb-4">
                          <label
                            className="form-control-label"
                            htmlFor="filterMonth"
                          >
                            Pagadas desde
                      </label>
                          <Input
                            className="form-control-alternative"
                            type="date"
                            value={sincePay ? sincePay : ""}
                            onChange={(inputValue) => {
                              console.log(inputValue.target.value)
                              setsincepay(inputValue != "" ? inputValue.target.value : null);
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
                            Pagadas hasta
                      </label>
                          <Input
                            className="form-control-alternative"
                            type="date"
                            value={untilPay ? untilPay : ""}
                            onChange={(inputValue) => {
                              setuntilpay(inputValue != "" ? inputValue.target.value : null);
                            }}
                          />
                        </FormGroup >
                      </Col>
                      <Col lg="3" className="text-left ">
                        <Button className="btn-sm" color="info" type="button" onClick={() => {
                          setloaded(false);
                          setsince(null);
                          setuntil(null);
                          setstatus(null);
                          setidAsociado(null);
                          setcobrador(null);
                          setnumber(null);
                          setsincepay(null);
                          setuntilpay(null);
                          selectInputRef.current.select.clearValue();
                          selectInputRefAsociado.current.select.clearValue();
                          setloaded(true);
                        }}>
                        <i className="fa fa-ban mr-1" aria-hidden="true"></i>Limpiar filtros
                        </Button>
                      </Col>
                      <Col lg="1" className="text-right my-auto ml-auto">
                        <Button color="success" type="button" onClick={() => { dispatch(exportBills(search)); dispatch(exportBillsDetail(search)); }}>
                          <img src={require("../../assets/img/theme/excel_export.png").default} style={{ height: "20px" }} />
                        </Button>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </CardHeader>
              <Table className={`align-items-center table-flush ${showBillsTable ?  '' : 'd-none'}`} responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Emision</th>
                    <th scope="col">Tipo</th>
                    <th scope="col">Serie-Número</th>
                    <th scope="col">Asociado</th>
                    <th scope="col">Total</th>
                    <th scope="col">Estado</th>
                    <th scope="col">Cobrador</th>
                    <th scope="col">Fecha fin pago</th>
                    <th scope="col">Anulación</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {
                    billList?.data?.map((cuenta, key) =>

                      <tr key={key}>
                        <td scope="row">
                          {cuenta.fechaEmision}
                        </td>
                        <td>
                          {`${cuenta.tipo}`}
                        </td>
                        <td>
                          {`${cuenta.serieNumero} ${cuenta.tipo == " - NC" ? cuenta.tipo : ""}`}
                        </td>
                        <td>
                          {cuenta.asociado}
                        </td>
                        <td className="text-center">
                          <small>S/.</small> {cuenta.total}
                        </td>
                        <td>
                          <Badge color="" className="badge-dot mr-4">
                            <i className={cuenta.estado == 1 ? "bg-info" : cuenta.estado == 2 ? "bg-success" : "bg-danger"} />
                            {cuenta.estado == 1 ? "Por cancelar" : cuenta.estado == 2 ? "Cancelada" : cuenta.estado == 0 ? "Emitido" : "Anulada"}
                          </Badge>
                        </td>
                        <td>
                          {cuenta.descripcion}
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
                              href="#pablo"
                              role="button"
                              size="sm"
                              color=""
                              onClick={(e) => e.preventDefault()}
                            >
                              <i className="fas fa-ellipsis-v" />
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-menu-arrow" right>
                              <DropdownItem
                                className="d-flex"
                                onClick={(e) => {
                                  dispatch(getBillDetail({ "idCuenta": cuenta.idCuenta }));
                                  toggleModalDetail();
                                }}
                              >
                                <i className="text-blue fa fa-eye" aria-hidden="true"></i> Detalle
                        </DropdownItem>

                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </td>
                      </tr>
                    )
                  }

                </tbody>
              </Table>
              <CardFooter className={`py-4 ${showBillsTable ?  '' : 'd-none'}`}>
                <nav aria-label="..." className="pagination justify-content-end mb-0">
                  <PaginationComponent
                    listClassName="justify-content-end mb-0"
                    firstPageText="<<"
                    lastPageText=">>"
                    previousPageText="<"
                    nextPageText=">"
                    totalItems={billList?.meta?.total ? billList?.meta?.total : 0}
                    pageSize={10}
                    onSelect={(selectedPage) => setPage(selectedPage)}
                  />
                </nav>
              </CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Cuenta;
