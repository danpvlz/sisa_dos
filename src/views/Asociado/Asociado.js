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

const Tables = () => {
  const asociados = require('../../data/asociado.json');
  const history = useHistory();
  const handleNewAsociado = useCallback(() => history.push('/admin/nuevo-asociado'), [history]);
  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0 bg-secondary">
                <Row >
                  <Col lg="12" className="border-0 d-flex justify-content-between">
                    <h3 className="mb-0">Asociados</h3>
                    <Button
                      className="btn-new-xl btn-icon d-none d-md-block"
                      color="primary"
                      onClick={handleNewAsociado}
                    >
                      <span className="btn-inner--icon">

                        <i className="fa fa-plus" />
                      </span>
                      <span className="btn-inner--text">Nuevo asociado</span>
                    </Button>
                    <Button
                      className="btn-new-small icon icon-shape bg-primary text-white rounded-circle shadow d-sm-none"
                      onClick={handleNewAsociado}
                    >
                      <i className="fas fa-plus" />
                    </Button>
                  </Col>
                  <Col lg="12 ">
                    <hr className="my-4 " />
                    <Row className="bg-secondary">
                      <Col lg="5"  >
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
                      <Col lg="5"  >
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
                              console.log(inputValue.value);
                            }}
                            options={[{ value: 1, label: "ACTIVO" }, { value: 2, label: "RETIRO" }]} />
                        </FormGroup >
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
                    <th scope="col">Actividad</th>
                    <th scope="col">Comité gremial</th>
                    <th scope="col">Importe</th>
                    <th scope="col">Cobrador</th>
                    <th scope="col">Teléfonos</th>
                    <th scope="col">Correos</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {
                    asociados?.map((asociado,key)=>
                    
                  <tr key={key}>
                  <td scope="row">
                    {asociado.asociado}
                  </td>
                  <td>
                    {asociado.tipo == 1 ? "Empresa" : "Persona"}
                  </td>
                  <td>
                    <Badge color="" className="badge-dot mr-4">
                      <i className={asociado.estado == 1 ? "bg-success" : "bg-warning"} />
                      {asociado.estado == 1 ? "Activo" : "Retiro"}
                    </Badge>
                  </td>
                  <td>
                    {asociado.actividad}
                  </td>
                  <td>
                    {asociado.comite}
                  </td>
                  <td>
                    {asociado.importe}
                  </td>
                  <td>
                    {asociado.cobrador}
                  </td>
                  <td>
                    {asociado.telf}
                  </td>
                  <td>
                    {asociado.correos}
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
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          Action
                        </DropdownItem>
                        <DropdownItem
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          Another action
                        </DropdownItem>
                        <DropdownItem
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          Something else here
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

export default Tables;
