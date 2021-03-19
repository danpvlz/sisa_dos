/*!

=========================================================
* Argon Dashboard React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useCallback, useState } from "react";
import { useHistory } from 'react-router-dom';
import classnames from "classnames";

// reactstrap components
import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  Col,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Table,
  Container,
  Row,
  Button,
  FormGroup,
  Input,
  NavItem,
  NavLink,
  Nav,
  TabContent,
  TabPane
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";

const Asistencia = () => {
  const colaboradores = require('../../data/colaborador.json');
  const asistencias = require('../../data/asistencia.json');
  const history = useHistory();
  const handleNew = useCallback(() => history.push('/admin/nuevo-colaborador'), [history]);
  const handleEdit = useCallback(() => history.push('/admin/editar-colaborador'), [history]);
  const [state, setState] = useState({ tabs: 1 });

  const toggleNavs = (e, state, index) => {
    e.preventDefault();
    setState({
      [state]: index
    });
  };
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
                <div  className=" d-flex bg-secondary">
                  <Col lg="6"  >
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
                  <Col lg="6"  >
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
                    </FormGroup>
                  </Col>
                </div>
                <div className="nav-wrapper">
                  <Nav
                    className="nav-fill flex-column flex-md-row"
                    id="tabs-icons-text"
                    pills
                    role="tablist"
                  >
                    <NavItem style={{cursor: 'pointer'}}>
                      <NavLink
                        aria-selected={state.tabs === 1}
                        className={classnames("mb-sm-3 mb-md-0", {
                          active: state.tabs === 1
                        })}
                        onClick={e => toggleNavs(e, "tabs", 1)}
                        role="tab"
                      >
                        <i className="ni ni-calendar-grid-58 mr-2" />
                        Asistencia
                      </NavLink>
                    </NavItem>
                    <NavItem style={{cursor: 'pointer'}}>
                      <NavLink
                        aria-selected={state.tabs === 2}
                        className={classnames("mb-sm-3 mb-md-0", {
                          active: state.tabs === 2
                        })}
                        onClick={e => toggleNavs(e, "tabs", 2)}
                        role="tab"
                      >
                        <i className="fa fa-bars mr-2" aria-hidden="true"></i>
                        Detalle
                      </NavLink>
                    </NavItem>
                  </Nav>
                </div>
              </CardHeader>
              <TabContent activeTab={"tabs" + state.tabs} > 
                <TabPane tabId="tabs1"  >
                  <Table className="align-items-center table-flush" responsive>
                    <thead className="thead-light">
                      <tr>
                        <th scope="col">Colaborador</th>
                        <th scope="col">Horas</th>
                        <th scope="col">Observaciones</th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        asistencias?.map((asistencia, key) =>
                          <tr key={key}>
                            <th scope="row">
                              <Media className="align-items-center">
                                <img
                                  className="avatar rounded-circle mr-3"
                                  alt="..."
                                  src={
                                    require("../../assets/img/theme/Gerencia-2-819x1024.png")
                                      .default
                                  }
                                />
                                <Media>
                                  <span className="mb-0 text-sm">
                                    {asistencia.colaborador}
                                  </span>
                                </Media>
                              </Media>

                            </th>
                            <td>
                              {asistencia.horas}
                            </td>
                            <td>
                              {asistencia.observaciones.length > 0 ?
                                <Badge color="" className="badge-dot mr-4">
                                  <i className="bg-danger" /> Con observaciones
                            </Badge>
                                :
                                <Badge color="" className="badge-dot mr-4">
                                  <i className="bg-success" /> Ninguna
                            </Badge>
                              }
                            </td>
                            <td>
                              <Button
                                className="icon icon-shape bg-secondary rounded-circle shadow "
                              >
                              <i className="fas fa-eye" style={{color: "#1279ee"}} />
                              </Button>
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
                </TabPane>
                <TabPane tabId="tabs2">
                  <Table className="align-items-center table-flush" responsive>
                    <thead className="thead-light">
                      <tr>
                        <th scope="col">Colaborador</th>
                        <th scope="col">Fecha</th>
                        <th scope="col">Turno</th>
                        <th scope="col">Entrada</th>
                        <th scope="col">Salida</th>
                        <th scope="col">Observación</th>
                        <th scope="col">Estado</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        asistencias?.map((asistencia, key) =>
                          <tr key={key}>
                            <th scope="row">
                              <Media className="align-items-center">
                                <img
                                  className="avatar rounded-circle mr-3"
                                  alt="..."
                                  src={
                                    require("../../assets/img/theme/Gerencia-2-819x1024.png")
                                      .default
                                  }
                                />
                                <Media>
                                  <span className="mb-0 text-sm">
                                    {asistencia.colaborador}
                                  </span>
                                </Media>
                              </Media>

                            </th>
                            <td>
                              {asistencia.fecha}
                            </td>
                            <td>
                              {asistencia.turno == 1 ? "Mañana" : "Tarde"}
                            </td>
                            <td>
                              {asistencia.entrada}
                            </td>
                            <td>
                              {asistencia.salida}
                            </td>
                            <td className="text-center">
                              {asistencia.observaciones.length> 0 ? asistencia.observaciones.map(obs=>obs) : "-"}
                            </td>
                            <td>
                              {parseInt(asistencia.estado) == 1 ?
                                <Badge color="" className="badge-dot mr-4">
                                  <i className="bg-success" />Normal
                            </Badge>
                                :
                                <Badge color="" className="badge-dot mr-4">
                                  <i className="bg-danger" />Tardanza
                            </Badge>
                              }
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
                </TabPane>
              </TabContent>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Asistencia;
