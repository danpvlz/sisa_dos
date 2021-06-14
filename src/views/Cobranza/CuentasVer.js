import React, { useState, useEffect, useRef } from "react";
import PaginationComponent from "react-reactstrap-pagination";

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
import SearchAsociado from "components/Selects/SearchAsociado.js";
import SearchCobrador from "components/Selects/SearchCobrador.js";
import BySector from "components/Tables/BySector";
import { useDispatch, useSelector } from "react-redux";
import { listBills, indicatorsBills, getBillDetail, exportBills, exportBillsDetail } from "../../redux/actions/Cuenta";
import Loading from "../../components/Loaders/LoadingSmall";

var timeOutFunc;
const Cuenta = () => {
  const selectInputRef = useRef();
  const selectInputRefAsociado = useRef();
  const dispatch = useDispatch();
  const { billList, billIndicators, billsStatusActions } = useSelector(({ cuenta }) => cuenta);
  const { loading } = useSelector(({ commonData }) => commonData);
  const [loaded, setloaded] = useState(false);

  const [page, setPage] = useState(1);
  const [search, setsearch] = useState({});

  const [showBillDetail, setshowBillDetail] = useState(false);

  const [showBillsTable, setshowBillsTable] = useState(false);

  //Filters
  const [since, setsince] = useState(`${new Date().getFullYear()}-${new Date().getMonth() + 1 < 10 ? '0' + (new Date().getMonth() + 1) : new Date().getMonth() + 1}-01`);
  const [until, setuntil] = useState(`${new Date().getFullYear()}-${new Date().getMonth() + 1 < 10 ? '0' + (new Date().getMonth() + 1) : new Date().getMonth() + 1}-${new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate()}`);
  const [sincePay, setsincepay] = useState(null);
  const [untilPay, setuntilpay] = useState(null);
  const [status, setstatus] = useState(null);
  const [typeDetail, settypeDetail] = useState(null);
  const [idAsociado, setidAsociado] = useState(null);
  const [cobrador, setcobrador] = useState(null);
  const [number, setnumber] = useState(null);

  useEffect(() => {
    if (billsStatusActions === 200) {
      dispatch(listBills(page, search));
      dispatch(indicatorsBills(search));
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

    if (idAsociado == null) {
      delete tsearch.idAsociado;
    } else {
      tsearch.idAsociado = idAsociado;
    }

    if (status == null || status === 0) {
      delete tsearch.status;
    } else {
      tsearch.status = status;
    }

    if (typeDetail == null || typeDetail === 0) {
      delete tsearch.typeDetail;
    } else {
      tsearch.typeDetail = typeDetail;
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
        timeOutFunc = setTimeout(() => {
          setsearch(tsearch);
          dispatch(listBills(page, tsearch));
          dispatch(indicatorsBills(search));
        }, 800);
      }
    }else{
      dispatch(listBills(page, tsearch));
      dispatch(indicatorsBills(search));
    }
    return () => {
      setloaded(false);
    }
  }, [page, cobrador, idAsociado, status, typeDetail, number, sincePay, untilPay, since, until,loaded,search,dispatch]);
  
  const toggleModalDetail = () => {
    setshowBillDetail(!showBillDetail);
  };

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
        <PaymentsModal
          showDetail={showBillDetail} toggleModal={toggleModalDetail}
        />
        {/* Table */}
        <BySector since={since} until={until} />
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0 bg-secondary">
                <Row >
                  <Col lg="12" className="border-0 d-flex justify-content-between">
                    <h3 className="mb-0">Cuentas</h3>
                    <Button
                      className="btn btn-sm btn-new-small icon icon-shape rounded-circle shadow "
                      onClick={() => setshowBillsTable(!showBillsTable)}
                    >
                      <i className={showBillsTable ? `fa fa-angle-up` : `fa fa-angle-down`} />
                    </Button>
                  </Col>
                  <Col lg="12 " className={showBillsTable ? '' : 'd-none'}>
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
                            Asociado
                      </label>
                          <SearchAsociado setVal={setidAsociado} selectInputRef={selectInputRefAsociado} />
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
                          <SearchCobrador setVal={setcobrador} selectInputRef={selectInputRef} />
                        </FormGroup>
                      </Col>
                      <Col lg="3"  >
                        <FormGroup className="mb-0 pb-4">
                          <label
                            className="form-control-label"
                            htmlFor="filterMonth"
                          >
                            Tipo
                      </label>
                          <Select
                            placeholder="Seleccione..."
                            className="select-style"
                            name="typeDetail"
                            onChange={(inputValue, actionMeta) => {
                              settypeDetail(inputValue.value);
                            }}
                            value={typeDetail ? [{ value: 0, label: "Todos" }, { value: 69, label: "Afiliaciones" }][typeDetail] : ""}
                            options={[{ value: 0, label: "Todos" }, { value: 69, label: "Afiliaciones" }]} />
                        </FormGroup >
                      </Col>
                      <Col lg="3" className="text-left my-auto">
                        <Button className="btn-sm" color="info" type="button" onClick={() => {
                          setloaded(false);
                          setsince(null);
                          setuntil(null);
                          setstatus(null);
                          settypeDetail(null);
                          setidAsociado(null);
                          setcobrador(null);
                          setnumber(null);
                          setsincepay(null);
                          setuntilpay(null);
                          selectInputRef?.current?.select?.clearValue();
                          selectInputRefAsociado?.current?.select?.clearValue();
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
                !loading || billList?.data ?
                  <>
                    <Table className={`align-items-center table-flush ${showBillsTable ? '' : 'd-none'}`} responsive>
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
                              <td>
                                {cuenta.fechaEmision}
                              </td>
                              <td>
                                {`${cuenta.tipo}`}
                              </td>
                              <td>
                                {`${cuenta.serieNumero} ${cuenta.tipo === " - NC" ? cuenta.tipo : ""}`}
                              </td>
                              <td>
                                {cuenta.asociado}
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
                                  <DropdownMenu className="dropdown-menu-arrow" right positionFixed={true}>
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
                    <CardFooter className={`py-4 ${showBillsTable ? '' : 'd-none'}`}>
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
