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
  TabPane,
  Modal,
  UncontrolledTooltip
} from "reactstrap";
// core components

import AsistenciaHeader from "components/Headers/AsistenciaHeader.js";
import SearchColaborador from "components/Selects/SearchColaborador.js";

const Asistencia = () => {
  const asistencias = require('../../data/miasistencia.json');
  const history = useHistory();
  const [showDetail, setShowDetail] = useState(false);

  const toggleModal = () => {
    setShowDetail(!showDetail);
  };

  const [state, setState] = useState({ tabs: 1 });
  const toggleNavs = (e, state, index) => {
    e.preventDefault();
    setState({
      [state]: index
    });
  };
  return (
    <>
      <AsistenciaHeader 
        tardanzas={asistencias.tardanzas}
        faltas={asistencias.faltas}
        hRealizadas={asistencias.hRealizadas}
        hCompensar={asistencias.hCompensar}/>
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0 bg-secondary">
                <Row className="bg-secondary">
                  <Col lg="4"  >
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
                </Row>
                <div className="nav-wrapper">
                  <Nav
                    className="nav-fill flex-column flex-md-row"
                    id="tabs-icons-text"
                    pills
                    role="tablist"
                  >
                    <NavItem style={{ cursor: 'pointer' }}>
                      <NavLink
                        aria-selected={state.tabs === 1}
                        className={classnames("mb-sm-3 mb-md-0", {
                          active: state.tabs === 1
                        })}
                        onClick={e => toggleNavs(e, "tabs", 1)}
                        role="tab"
                      >
                        <i className="fa fa-clock mr-2" aria-hidden="true"></i>
                        Por día
                      </NavLink>
                    </NavItem>
                    <NavItem style={{ cursor: 'pointer' }}>
                      <NavLink
                        aria-selected={state.tabs === 2}
                        className={classnames("mb-sm-3 mb-md-0", {
                          active: state.tabs === 2
                        })}
                        onClick={e => toggleNavs(e, "tabs", 2)}
                        role="tab"
                      >
                        <i className="ni ni-calendar-grid-58 mr-2" aria-hidden="true"></i>
                        Detalle
                      </NavLink>
                    </NavItem>
                  </Nav>
                </div>
              </CardHeader>
              <TabContent activeTab={"tabs" + state.tabs} >
                <TabPane tabId="tabs1">
                  <div className="bg-secondary text-center pb-3">
                    <Col>
                      <Badge style={{ marginRight: '.5rem', fontSize: '.8rem' }} color="success">
                        Normal
                      </Badge>
                      <Badge style={{ marginRight: '.5rem', fontSize: '.8rem' }} color="warning">
                        Tardanza
                      </Badge>
                      <Badge style={{ marginRight: '.5rem', fontSize: '.8rem' }} color="danger">
                        Falta
                      </Badge>
                      <Badge style={{ marginRight: '.5rem', fontSize: '.8rem' }} color="default">
                        Compensó
                      </Badge>
                    </Col>
                  </div>
                  <Table className="align-items-center table-flush" responsive>
                    <thead className="thead-light">
                      <tr>
                        <th scope="col">Fecha</th>
                        <th scope="col">Día</th>
                        <th scope="col">Entrada</th>
                        <th scope="col">Salida</th>
                        <th scope="col">Entrada</th>
                        <th scope="col">Salida</th>
                        <th scope="col">Tardanza</th>
                        <th scope="col">Compensado</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        asistencias.porDia?.map((asistencia, key) =>
                          <tr key={key}>
                            <td>
                              {asistencia.fecha}
                            </td>
                            <td>
                              {['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'][new Date(asistencia.fecha).getDay()]}
                            </td>
                            <td>
                              <Badge
                                id={`tooltip_in_${key}`}
                                data-placement="top"
                                type="button" style={{ marginRight: '.5rem', fontSize: '.8rem' }} color={parseInt(asistencia.prim_entrada.estado) == 1 ? "success" : parseInt(asistencia.prim_entrada.estado) == 2 ? "danger" : "warning"}>
                                {asistencia.prim_entrada.hora}
                              </Badge>
                              <UncontrolledTooltip
                                delay={0}
                                placement="top"
                                target={`tooltip_in_${key}`}
                              >
                                {parseInt(asistencia.prim_entrada.estado) == 1 ? "Normal" : parseInt(asistencia.prim_entrada.estado) == 2 ? "Falta" : "Tardanza"}
                              </UncontrolledTooltip>
                            </td>
                            <td> {/*VERDE: SALIDA NORMAL, AZUL:COMPENSÓ HORAS */}
                              <Badge
                                id={`tooltip_out_${key}`}
                                data-placement="top"
                                type="button" style={{ marginRight: '.5rem', fontSize: '.8rem' }} color={parseInt(asistencia.prim_salida.estado) == 1 ? "success" : parseInt(asistencia.prim_salida.estado) == 2 ? "danger" : "default"}>
                                {asistencia.prim_salida.hora}
                              </Badge>
                              <UncontrolledTooltip
                                delay={0}
                                placement="top"
                                target={`tooltip_out_${key}`}
                              >
                                {parseInt(asistencia.prim_salida.estado) == 1 ? "Normal" : parseInt(asistencia.prim_salida.estado) == 2 ? "Falta" : "Compensó"}
                              </UncontrolledTooltip>
                            </td>
                            <td>
                              <Badge
                                id={`tooltip_in_${key}`}
                                data-placement="top"
                                type="button" style={{ marginRight: '.5rem', fontSize: '.8rem' }} color={parseInt(asistencia.seg_entrada.estado) == 1 ? "success" : parseInt(asistencia.seg_entrada.estado) == 2 ? "danger" : "warning"}>
                                {asistencia.seg_entrada.hora}
                              </Badge>
                              <UncontrolledTooltip
                                delay={0}
                                placement="top"
                                target={`tooltip_in_${key}`}
                              >
                                {parseInt(asistencia.seg_entrada.estado) == 1 ? "Normal" : parseInt(asistencia.seg_entrada.estado) == 2 ? "Falta" : "Tardanza"}
                              </UncontrolledTooltip>
                            </td>
                            <td> {/*VERDE: SALIDA NORMAL, AZUL:COMPENSÓ HORAS */}
                              <Badge
                                id={`tooltip_out_${key}`}
                                data-placement="top"
                                type="button" style={{ marginRight: '.5rem', fontSize: '.8rem' }} color={parseInt(asistencia.seg_salida.estado) == 1 ? "success" : parseInt(asistencia.seg_salida.estado) == 2 ? "danger" : "default"}>
                                {asistencia.seg_salida.hora}
                              </Badge>
                              <UncontrolledTooltip
                                delay={0}
                                placement="top"
                                target={`tooltip_out_${key}`}
                              >
                                {parseInt(asistencia.seg_salida.estado) == 1 ? "Normal" : parseInt(asistencia.seg_salida.estado) == 2 ? "Falta" : "Compensó"}
                              </UncontrolledTooltip>
                            </td>
                            <td className="text-center">
                              {asistencia.tardanza == 0 ? "-" : asistencia.tardanza+"min"}
                            </td>
                            <td className="text-center">
                              {asistencia.compensado == 0 ? "-" : asistencia.compensado+"min"}
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
                  <div className="bg-secondary text-center pb-3">
                    <Col>
                      <Badge style={{ marginRight: '.5rem', fontSize: '.8rem' }} color="success">
                        Normal
                      </Badge>
                      <Badge style={{ marginRight: '.5rem', fontSize: '.8rem' }} color="warning">
                        Tardanza
                      </Badge>
                      <Badge style={{ marginRight: '.5rem', fontSize: '.8rem' }} color="danger">
                        Falta
                      </Badge>
                      <Badge style={{ marginRight: '.5rem', fontSize: '.8rem' }} color="default">
                        Compensó
                      </Badge>
                    </Col>
                  </div>
                  <Table className="align-items-center table-flush" responsive>
                    <thead className="thead-light">
                      <tr>
                        <th scope="col">Fecha</th>
                        <th scope="col">Día</th>
                        <th scope="col">Turno</th>
                        <th scope="col">Tipo</th>
                        <th scope="col">Hora</th>
                        <th scope="col">Tardanza</th>
                        <th scope="col">Compensado</th>
                        <th scope="col">Observación</th>
                        <th scope="col">Justificación</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        asistencias.detalle?.map((asistencia, key) =>
                          <tr key={key}>
                            <td>
                              {asistencia.fecha}
                            </td>
                            <td>
                              {['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'][new Date(asistencia.fecha).getDay()]}
                            </td>
                            <td>
                              {asistencia.turno==1 ? "Primero" : "Segundo"}
                            </td>
                            <td>
                              {asistencia.tipo==1 ? "Entrada" : "Salida"}
                            </td>
                            <td>
                              <Badge
                                id={`tooltip_in_${key}`}
                                data-placement="top"
                                type="button" style={{ marginRight: '.5rem', fontSize: '.8rem' }} color={parseInt(asistencia.hora.estado) == 1 ? "success" : parseInt(asistencia.hora.estado) == 2 ? "danger" : "warning"}>
                                {asistencia.hora.hora}
                              </Badge>
                              <UncontrolledTooltip
                                delay={0}
                                placement="top"
                                target={`tooltip_in_${key}`}
                              >
                                {parseInt(asistencia.hora.estado) == 1 ? "Normal" : parseInt(asistencia.hora.estado) == 2 ? "Falta" : "Tardanza"}
                              </UncontrolledTooltip>
                            </td>
                            <td className="text-center">
                              {asistencia.tardanza == 0 ? "-" : asistencia.tardanza+"min"}
                            </td>
                            <td className="text-center">
                              {asistencia.compensado == 0 ? "-" : asistencia.compensado+"min"}
                            </td>
                            <td className="text-center">
                              {asistencia.observacion.length==0 ? "-" : asistencia.observacion}
                            </td>
                            <td className="text-center">
                              {asistencia.justificacion.length==0 ? "-" : asistencia.justificacion}
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
