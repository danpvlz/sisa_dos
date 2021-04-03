import React, { useCallback, useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import PaginationComponent from "react-reactstrap-pagination";
import ConfirmDialog from '../../components/ConfirmDialog';
import PayModal from '../../components/PayModal';

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
import { listBills, indicatorsBills,anularCuenta,pagarCuenta,getBillDetail } from "../../redux/actions/Cuenta";

const Cuenta = () => {
  const dispatch = useDispatch();
  const { billList, billIndicators } = useSelector(({ cuenta }) => cuenta);
  const history = useHistory();
  const handleNew = useCallback(() => history.push('/admin/registro-emision'), [history]);

  const [page, setPage] = useState(1);
  const [search, setsearch] = useState({});
  const [idCuenta, setidCuenta] = useState(null);
  const [action, setaction] = useState(1);
  const [showConfirm, setShowConfirm] = useState(false);
  const [sendConfirm, setsendConfirm] = useState(false);

  const [showPay, setshowPay] = useState(false);
  const [fecha, setfecha] = useState({"fecha":new Date().toISOString().substring(0, 10)});
  const [monto, setmonto] = useState(0);
  const [sendPay, setsendPay] = useState(0);

  const [showBillDetail, setshowBillDetail] = useState(false);

  //Filters
  const [since, setsince] = useState(null);
  const [until, setuntil] = useState(null);
  const [status, setstatus] = useState(null);
  const [idAsociado, setidAsociado] = useState(null);
  const [cobrador, setcobrador] = useState(null);

  useEffect(() => {
    console.log(since)
    let tsearch=search;
    if(since == null){
      delete tsearch.since;
    }else{
      tsearch.since=since;
    }
    setsearch(tsearch);
    dispatch(listBills(page,tsearch));
    dispatch(indicatorsBills(search));
  }, [since]);

  useEffect(() => {
    let tsearch=search;
    if(until == null){
      delete tsearch.until;
    }else{
      tsearch.until=until;
    }
    setsearch(tsearch);
    dispatch(listBills(page,tsearch));
    dispatch(indicatorsBills(search));
  }, [until]);

  useEffect(() => {
    let tsearch=search;
    if(status == null){
      delete tsearch.status;
    }else{
      tsearch.status=status;
    }
    setsearch(tsearch);
    dispatch(listBills(page,tsearch));
    dispatch(indicatorsBills(search));
  }, [status]);

  useEffect(() => {
    let tsearch=search;
    if(idAsociado == null){
      delete tsearch.idAsociado;
    }else{
      tsearch.idAsociado=idAsociado;
    }
    setsearch(tsearch);
    dispatch(listBills(page,tsearch));
    dispatch(indicatorsBills(search));
  }, [idAsociado]);

  useEffect(() => {
    let tsearch=search;
    if(cobrador == null){
      delete tsearch.debCollector;
    }else{
      tsearch.debCollector=cobrador;
    }
    setsearch(tsearch);
    dispatch(listBills(page,tsearch));
    dispatch(indicatorsBills(search));
  }, [cobrador]);

  useEffect(() => {
    dispatch(listBills(page,search))
    dispatch(indicatorsBills(search))
  }, [page]);

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
    if (action==1) {
      //REGISTRAR
      var fData = {
        "idCuenta": idCuenta,
      }
      dispatch(anularCuenta(fData))
      //REGISTRAR
      setsendConfirm(false);
      setidCuenta(null);
      dispatch(listBills(page,search));
      dispatch(indicatorsBills(search));
    }
  }, [sendConfirm]);

  useEffect(() => {
    if (sendPay) {
      //REGISTRAR
      var fData = {
        "idCuenta": idCuenta,
        "monto": monto,
        "fechaPago": fecha,
      }
      dispatch(pagarCuenta(fData))
      //REGISTRAR
      setsendPay(false);
      setidCuenta(null);
      dispatch(listBills(page,search));
      dispatch(indicatorsBills(search));
    }
  }, [sendPay]);

  return (
    <>
      <CuentasHeader 
      pendientes={billIndicators?.pendientes}
      cobrado={billIndicators?.cobrado}
      emitidos={billIndicators?.emitidos}
      anulado={billIndicators?.anulado}
      />
      <PayModal 
      showPay={showPay} 
      toggleModal={toggleModalPay}  
      fecha={fecha}
      setfecha={setfecha}
      monto={monto}
      setmonto={setmonto}
      setsendPay={setsendPay}
      />
      {/* Page content */}
      <Container className="mt--7" fluid>
      <ConfirmDialog
        question={action==1 ? "¿Seguro de anular cuenta y pagos asociados?" : "¿Seguro de pagar cuenta?"}
        showConfirm={showConfirm} toggleModal={toggleModal} setConfirm={setsendConfirm} />
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
                            defaultValue="lucky.jesse"
                            id="fitlerSince"
                            placeholder="fitlerSince"
                            type="date"
                            value={since}
                            onChange={(inputValue, actionMeta) => {
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
                            Hasta
                      </label>
                          <Input
                            className="form-control-alternative"
                            id="filterUntil"
                            placeholder="filterUntil"
                            type="date"
                            value={until}
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
                            Estado
                      </label>
                          <Select
                            placeholder="Seleccione..."
                            className="select-style"
                            name="sexo"
                            onChange={(inputValue, actionMeta) => {
                              setstatus(inputValue.value);
                            }}
                            options={[{ value: 1, label: "Por cancelar" }, { value: 2, label: "Cancelada" }, { value: 3, label: "Anulada" }]} />
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
                          <SearchAsociado setVal={setidAsociado} />
                        </FormGroup>
                      </Col>
                      <Col lg="4"  >
                        <FormGroup className="mb-0 pb-4">
                          <label
                            className="form-control-label"
                            htmlFor="filterMonth"
                          >
                            Cobrador
                      </label>
                          <SearchCobrador setVal={setcobrador} />
                        </FormGroup>
                      </Col>
                      <Col lg="1" className="text-right my-auto ml-auto">
                        <Button color="success"  type="button">
                          <img src={require("../../assets/img/theme/excel_export.png").default} style={{height:"20px"}} /> 
                        </Button>
                      </Col>
                    </Row>

                  </Col>

                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Fecha emision</th>
                    <th scope="col">Serie-Número</th>
                    <th scope="col">Asociado</th>
                    <th scope="col">Total</th>
                    <th scope="col">Estado</th>
                    <th scope="col">Cobrador</th>
                    <th scope="col">Anulación</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {
                    billList?.data?.map((cuenta,key)=>
                    
                  <tr key={key}>
                  <td scope="row">
                    {cuenta.fechaEmision}
                  </td>
                  <td>
                    {`${cuenta.serieNumero}`}
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
                      {cuenta.estado == 1 ? "Por cancelar" : cuenta.estado == 2 ? "Cancelada" : "Anulada"}
                    </Badge>
                  </td>
                  <td>
                    {cuenta.descripcion}
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
                            dispatch(getBillDetail({"idCuenta":cuenta.idCuenta}));
                            toggleModalDetail();
                          }}
                        >
                           <i className="text-blue fa fa-eye" aria-hidden="true"></i> Detalle
                        </DropdownItem>
                        {
                          cuenta.estado==1 ?
                          <>
                          <DropdownItem
                          className="d-flex"
                            onClick={(e) => {setidCuenta(cuenta.idCuenta); toggleModalPay();}}
                          >
                             <i className="fa fa-credit-card text-success" aria-hidden="true"></i> Cancelar
                          </DropdownItem>
                          <DropdownItem
                          className="d-flex"
                            onClick={(e) => {setaction(1);  setidCuenta(cuenta.idCuenta); toggleModal();}}
                          >
                             <i className="text-danger fa fa-ban" aria-hidden="true"></i> Anular
                          </DropdownItem>
                          </>
                          :
                          cuenta.estado==2 ?
                          <>
                          <DropdownItem
                          className="d-flex"
                            onClick={(e) => {setaction(1); setidCuenta(cuenta.idCuenta); toggleModal();}}
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
                    totalItems={billList?.meta?.total ? billList?.meta?.total : 0}
                    pageSize={10}
                    onSelect={(selectedPage)=>setPage(selectedPage)}
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
