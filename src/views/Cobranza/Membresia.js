import React, { useCallback, useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';

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
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
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
import PaginationComponent from "react-reactstrap-pagination";
import SearchAsociado from "components/Selects/SearchAsociado.js";
import SearchCobrador from "components/Selects/SearchCobrador.js";
import PaymentsModal from "components/Modals/Payments.js";
import { useDispatch, useSelector } from "react-redux";
import { listMemberships, getBillDetail, exportMembership } from "../../redux/actions/Cuenta";

const EstadoCuenta = () => {
  const dispatch = useDispatch();
  const cuentas = require('../../data/cuenta.json');
  const { membershipList } = useSelector(({ cuenta }) => cuenta);
  const history = useHistory();
  const handleNew = useCallback(() => history.push('/admin/registro-emision'), [history]);
  const [showBillDetail, setshowBillDetail] = useState(false);

  const [page, setPage] = useState(1);
  const [search, setsearch] = useState({});
  const [status, setstatus] = useState(null);
  const [idAsociado, setidAsociado] = useState(null);
  const [cobrador, setcobrador] = useState(null);

  const toggleModalDetail = () => {
    setshowBillDetail(!showBillDetail);
  };

  useEffect(() => {
    dispatch(listMemberships(page,search));
  }, [page]);

  useEffect(() => {
    let tsearch=search;
    if(status == null){
      delete tsearch.status;
    }else{
      tsearch.status=status;
    }
    setsearch(tsearch);
    dispatch(listMemberships(page,search));
  }, [status]);

  useEffect(() => {
    let tsearch=search;
    if(idAsociado == null){
      delete tsearch.idAsociado;
    }else{
      tsearch.idAsociado=idAsociado;
    }
    setsearch(tsearch);
    dispatch(listMemberships(page,search));
  }, [idAsociado]);

  useEffect(() => {
    let tsearch=search;
    if(cobrador == null){
      delete tsearch.debCollector;
    }else{
      tsearch.debCollector=cobrador;
    }
    setsearch(tsearch);
    dispatch(listMemberships(page,search));
  }, [cobrador]);

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
                    <h3 className="mb-0">Membresía{process.env.REACT_NUBEFACT_TOKEN}</h3>
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
                      <Col lg="5"  >
                        <FormGroup className="mb-0 pb-4">
                          <label
                            className="form-control-label"
                            htmlFor="filterMonth"
                          >
                            Asociado
                      </label>
                          <SearchAsociado setVal={setidAsociado}/>
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
                        <Button color="success"  type="button" onClick={()=>dispatch(exportMembership(search))}>
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
                    <th scope="col">Asociado</th>
                    <th scope="col">Mes</th>
                    <th scope="col">Año</th>
                    <th scope="col">Estado</th>
                    <th scope="col">Cobrado</th>
                    <th scope="col">Pagado</th>
                    <th scope="col">Completado</th>
                    <th scope="col">Cobrador</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {
                    membershipList?.data?.map((cuenta,key)=>
                  <tr key={key}>
                  <td scope="row">
                    {cuenta.asociado}
                  </td>
                  <td>
                    {
                    cuenta.mes== 0 ?
                    cuenta.masdeuno
                    :
                    ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio','Agosto','Setiembre','Octubre','Noviembre','Diciembre'][cuenta.mes-1]
                    
                    }
                  </td>
                  <td>
                    {cuenta.year}
                  </td>
                  <td>
                    <Badge color="" className="badge-dot mr-4">
                      <i className={cuenta.estado == 1 ? "bg-info" : cuenta.estado == 2 ? "bg-success" : "bg-danger" } />
                      {cuenta.estado == 1 ? "Por cancelar" : cuenta.estado == 2 ? "Cancelada" : "Anulada"}
                    </Badge>
                  </td>
                  <td className="text-center">
                  <small>S/.</small> 
                    {cuenta.cobrado}
                  </td>
                  <td className="text-center">
                  <small>S/.</small> {cuenta.pagado}
                  </td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">{Math.round(cuenta.pagado/cuenta.cobrado*100)}%</span>
                        <div>
                          <Progress
                            max="100"
                            value={Math.round(cuenta.pagado/cuenta.cobrado*100)}
                            barClassName={Math.round(cuenta.pagado/cuenta.cobrado*100)>50 ? "bg-success" : "bg-warning"}
                          />
                        </div>
                      </div>
                    </td>
                  <td>
                    {cuenta.descripcion}
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
                          onClick={()=>
                          {
                            dispatch(getBillDetail({"idCuenta":cuenta.idCuenta}));
                            toggleModalDetail();
                          }}
                        >
                           <i className="text-blue fa fa-eye" aria-hidden="true"></i> Ver más
                        </DropdownItem>
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
                    totalItems={membershipList?.meta?.total ? membershipList?.meta?.total : 0}
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

export default EstadoCuenta;
