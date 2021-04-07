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
import SearchAsociado from "components/Selects/SearchAsociado.js";
import SearchCobrador from "components/Selects/SearchCobrador.js";
import PaymentsModal from "components/Payments.js";
import { useDispatch, useSelector } from "react-redux";
import { listMemberships, getBillDetail } from "../../redux/actions/Cuenta";

const EstadoCuenta = () => {
  const dispatch = useDispatch();
  const cuentas = require('../../data/cuenta.json');
  const { membershipList } = useSelector(({ cuenta }) => cuenta);
  const history = useHistory();
  const handleNew = useCallback(() => history.push('/admin/registro-emision'), [history]);
  const [showDetail, setShowDetail] = useState(false);

  const [page, setPage] = useState(1);
  const [search, setsearch] = useState({});

  const toggleModal = () => {
    setShowDetail(!showDetail);
  };

  useEffect(() => {
    dispatch(listMemberships(page,search));
  }, [page])

  return (
    <>
    <div className="header pb-8 pt-9 d-flex align-items-center">
      <span className="mask bg-gradient-info opacity-8" />
    </div>
      {/* Page content */}
      <Container className="mt--9" fluid>
        <PaymentsModal 
        showDetail={showDetail} toggleModal={toggleModal}
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
                    <Col lg="3"  >
                        <FormGroup className="mb-0 pb-4">
                          <label
                            className="form-control-label"
                            htmlFor="filterMonth"
                          >
                            Mes
                      </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue="lucky.jesse"
                            id="filterMonth"
                            placeholder="filterMonth"
                            type="month"
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
                          <SearchAsociado />
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
                          <SearchCobrador />
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
                    <th scope="col">Asociado</th>
                    <th scope="col">Mes</th>
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
                    
                    {['Enero', 'Febrero', 'Marzo', 'Abril', 'Maayo', 'Junio', 'Julio','Agosto','Setiembre','Octubre','Noviembre','Diciembre'][cuenta.mes-1]}
                  </td>
                  <td>
                    <Badge color="" className="badge-dot mr-4">
                      <i className={cuenta.estado == 1 ? "bg-info" : cuenta.estado == 2 ? "bg-info" : "bg-danger" } />
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
                          href="#pablo"
                          onClick={()=>
                          {
                            toggleModal();
                            dispatch(getBillDetail({"idCuenta":cuenta.idCuenta}));
                          }}
                        >
                           <i className="text-blue fa fa-eye" aria-hidden="true"></i> Ver pagos
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
                <nav aria-label="...">
                  <Pagination
                    className="pagination justify-content-end mb-0"
                    listClassName="justify-content-end mb-0"
                  >
                    <PaginationItem className="disabled">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        tabIndex="-1"
                      >
                        <i className="fas fa-angle-left" />
                        <span className="sr-only">Previous</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className="active">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        2 <span className="sr-only">(current)</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        3
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="fas fa-angle-right" />
                        <span className="sr-only">Next</span>
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
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
