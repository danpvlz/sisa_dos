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
import Header from "components/Headers/AsociadoHeader.js";
import SearchColaborador from "components/Selects/SearchColaborador.js";

const Llamadas = () => {
  const llamadas = require('../../data/llamadas.json');
  const history = useHistory();
  const handleNew = useCallback(() => history.push('/admin/registro-llamada'), [history]);
  return (
    <>
    <div className="header pb-8 pt-9 d-flex align-items-center"> 
      <span className="mask bg-gradient-info opacity-8" />
    </div>
      {/* Page content */}
      <Container className="mt--9" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0 bg-secondary">
                <Row >
                  <Col lg="12" className="border-0 d-flex justify-content-between">
                    <h3 className="mb-0">Llamadas</h3>
                    <Button
                      className="btn-new-xl btn-icon d-none d-md-block"
                      color="primary"
                      onClick={handleNew}
                    >
                      <span className="btn-inner--icon">

                        <i className="fa fa-plus" />
                      </span>
                      <span className="btn-inner--text">Nueva llamada</span>
                    </Button>
                    <Button
                      className="btn-new-small icon icon-shape bg-primary text-white rounded-circle shadow d-sm-none"
                      onClick={handleNew}
                    >
                      <i className="fas fa-plus" />
                    </Button>
                  </Col>
                  <Col lg="12 ">
                    <hr className="my-4" />
                    <Row className="bg-secondary">
                  <Col lg="2"  >
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
                        id="filterMonth"
                        placeholder="filterMonth"
                        type="date"
                      />
                    </FormGroup >
                  </Col>
                  <Col lg="2"  >
                    <FormGroup className="mb-0 pb-4">
                      <label
                        className="form-control-label"
                        htmlFor="filterMonth"
                      >
                        Hasta
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
                      <Col lg="2" className="text-right ml-auto">
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
                    <th scope="col">Tipo</th>
                    <th scope="col">Estado</th>
                    <th scope="col">Sector</th>
                    <th scope="col">Cobrador</th>
                    <th scope="col">Fecha</th>
                    <th scope="col">H. inicio</th>
                    <th scope="col">H. fin</th>
                    <th scope="col">Detalle</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    llamadas?.map((llamada,key)=>
                    
                  <tr key={key}>
                  <td scope="row">
                    {llamada.asociado}
                  </td>
                  <td>
                    {llamada.tipo == 1 ? "Empresa" : "Persona"}
                  </td>
                  <td>
                    <Badge color="" className="badge-dot mr-4">
                      <i className={llamada.estado == 1 ? "bg-success" : "bg-warning"} />
                      {llamada.estado == 1 ? "Activo" : "Retiro"}
                    </Badge>
                  </td>
                  <td>
                    {llamada.sector}
                  </td>
                  <td>
                    {llamada.cobrador}
                  </td>
                  <td>
                    {llamada.fecha}
                  </td>
                  <td>
                    {llamada.inicio}
                  </td>
                  <td>
                    {llamada.fin}
                  </td>
                  <td>
                    {llamada.detalle}
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

export default Llamadas;
