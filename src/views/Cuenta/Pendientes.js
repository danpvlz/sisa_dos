import React, { useCallback } from "react";
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
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  UncontrolledTooltip,
  Button,
  Col,
  FormGroup,
  Input,
} from "reactstrap";
// core components
import Select from 'react-select';
import CuentasHeader from "components/Headers/CuentasHeader.js";
import SearchColaborador from "components/Selects/SearchColaborador.js";

const EstadoCuenta = () => {
  const cuentas = require('../../data/cuenta.json');
  const history = useHistory();
  const handleNew = useCallback(() => history.push('/admin/registro-emision'), [history]);
  return (
    <>
      <CuentasHeader />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0 bg-secondary">
                <Row >
                  <Col lg="12" className="border-0 d-flex justify-content-between">
                    <h3 className="mb-0">Cuentas</h3>
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
                            Fecha
                      </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue="lucky.jesse"
                            id="filterMonth"
                            placeholder="filterMonth"
                            type="date"
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
                          <SearchColaborador />
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
                          <SearchColaborador />
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
                    <th scope="col">Tipo</th>
                    <th scope="col">Serie</th>
                    <th scope="col">Número</th>
                    <th scope="col">Asociado</th>
                    <th scope="col">Subtotal</th>
                    <th scope="col">Total</th>
                    <th scope="col">IGV</th>
                    <th scope="col">Estado</th>
                    <th scope="col">Cobrador</th>
                    <th scope="col">Anulación</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {
                    cuentas?.map((cuenta,key)=>
                    
                  <tr key={key}>
                  <td scope="row">
                    {cuenta.fechaEmision}
                  </td>
                  <td>
                    {cuenta.tipo == 1 ? "Factura" : cuenta.tipo == 3 ? "Boleta" :cuenta.tipo == 7 ? "N. cred" : "N. deb"}
                  </td>
                  <td>
                    {cuenta.serie}
                  </td>
                  <td>
                    {cuenta.numero}
                  </td>
                  <td>
                    {cuenta.asociado}
                  </td>
                  <td className="text-center"> 
                    <small>S/.</small> {cuenta.subtotal}
                  </td>
                  <td className="text-center">
                  <small>S/.</small> {cuenta.total}
                  </td>
                  <td>
                    {cuenta.igv}
                  </td>
                  <td>
                    <Badge color="" className="badge-dot mr-4">
                      <i className={cuenta.estado == 1 ? "bg-info" : cuenta.estado == 2 ? "bg-success" : "bg-danger"} />
                      {cuenta.estado == 1 ? "Por cancelar" : cuenta.estado == 2 ? "Cancelada" : "Anulada"}
                    </Badge>
                  </td>
                  <td>
                    {cuenta.cobrador}
                  </td>
                  <td>
                    {cuenta.fAnul}
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
                          onClick={(e) => e.preventDefault()}
                        >
                           <i className="text-blue fa fa-eye" aria-hidden="true"></i> Detalle
                        </DropdownItem>
                        {
                          cuenta.estado==1 ?
                          <>
                          <DropdownItem
                          className="d-flex"
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                             <i className="fa fa-credit-card text-success" aria-hidden="true"></i> Cancelar
                          </DropdownItem>
                          <DropdownItem
                          className="d-flex"
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                             <i className="text-danger fa fa-ban" aria-hidden="true"></i> Anular
                          </DropdownItem>
                          </>
                          :
                          cuenta.estado==2 ?
                          <>
                          <DropdownItem
                          className="d-flex"
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
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
