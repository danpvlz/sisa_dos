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

import AsistenciaHeader from "components/Headers/Asistencia.js";
import SearchColaborador from "components/Selects/SearchColaborador.js";

const Asistencia = () => {
  const asistencias = require('../../data/asistencia.json');
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
      <AsistenciaHeader />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0 bg-secondary">
                <Row className="bg-secondary">
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
                        Colaborador
                      </label>
                      <SearchColaborador />
                    </FormGroup>
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
                        No marcó
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
                        asistencias?.map((asistencia, key) =>
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
                                type="button" style={{ marginRight: '.5rem', fontSize: '.8rem' }} color={parseInt(asistencia.estado) == 1 ? "success" : parseInt(asistencia.estado) == 2 ? "danger" : "warning"}>
                                {asistencia.entrada}
                              </Badge>
                              <UncontrolledTooltip
                                delay={0}
                                placement="top"
                                target={`tooltip_in_${key}`}
                              >
                                {parseInt(asistencia.estado) == 1 ? "Normal" : parseInt(asistencia.estado) == 2 ? "No marcó" : "Tardanza"}
                              </UncontrolledTooltip>
                            </td>
                            <td> {/*VERDE: SALIDA NORMAL, AZUL:COMPENSÓ HORAS */}
                              <Badge
                                id={`tooltip_out_${key}`}
                                data-placement="top"
                                type="button" style={{ marginRight: '.5rem', fontSize: '.8rem' }} color={parseInt(asistencia.estado) == 1 ? "success" : parseInt(asistencia.estado) == 2 ? "danger" : "default"}>
                                {asistencia.salida}
                              </Badge>
                              <UncontrolledTooltip
                                delay={0}
                                placement="top"
                                target={`tooltip_out_${key}`}
                              >
                                {parseInt(asistencia.estado) == 1 ? "Normal" : parseInt(asistencia.estado) == 2 ? "No marcó" : "Compensó"}
                              </UncontrolledTooltip>
                            </td>
                            <td>
                              <Badge
                                id={`tooltip_in_${key}`}
                                data-placement="top"
                                type="button" style={{ marginRight: '.5rem', fontSize: '.8rem' }} color={parseInt(asistencia.estado) == 1 ? "success" : parseInt(asistencia.estado) == 2 ? "danger" : "warning"}>
                                {asistencia.entrada}
                              </Badge>
                              <UncontrolledTooltip
                                delay={0}
                                placement="top"
                                target={`tooltip_in_${key}`}
                              >
                                {parseInt(asistencia.estado) == 1 ? "Normal" : parseInt(asistencia.estado) == 2 ? "No marcó" : "Tardanza"}
                              </UncontrolledTooltip>
                            </td>
                            <td> {/*VERDE: SALIDA NORMAL, AZUL:COMPENSÓ HORAS */}
                              <Badge
                                id={`tooltip_out_${key}`}
                                data-placement="top"
                                type="button" style={{ marginRight: '.5rem', fontSize: '.8rem' }} color={parseInt(asistencia.estado) == 1 ? "success" : parseInt(asistencia.estado) == 2 ? "danger" : "default"}>
                                {asistencia.salida}
                              </Badge>
                              <UncontrolledTooltip
                                delay={0}
                                placement="top"
                                target={`tooltip_out_${key}`}
                              >
                                {parseInt(asistencia.estado) == 1 ? "Normal" : parseInt(asistencia.estado) == 2 ? "No marcó" : "Compensó"}
                              </UncontrolledTooltip>
                            </td>
                            <td className="text-center">
                              {asistencia.tardanza}
                            </td>
                            <td className="text-center">
                              {asistencia.tardanza}
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
                        No marcó
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
                        asistencias?.map((asistencia, key) =>
                          <tr key={key}>
                            <td>
                              {"2021-10-05"}
                            </td>
                            <td>
                              {"Martes"}
                            </td>
                            <td>
                              {"Mañana"}
                            </td>
                            <td>
                              {"Entrada"}
                            </td>
                            <td>
                              <Badge style={{ fontSize: '.8rem' }} color="success">
                                {asistencia.entrada}
                              </Badge>
                            </td>
                            <td className="text-center">
                              {"-"}
                            </td>
                            <td className="text-center">
                              {"-"}
                            </td>
                            <td className="text-center">
                              {"-"}
                            </td>
                            <td className="text-center">
                              {"-"}
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

const DetalleAsistencia = ({ showDetail, toggleModal }) => {
  const asistencias = require('../../data/asistencia.json');
  return (
    <Modal
      className="modal-dialog-centered"
      isOpen={showDetail}
      toggle={toggleModal}
      size="lg"
    >
      <div className="modal-header bg-secondary">
        <h3 className="modal-title" id="modalDetalleAsistencia">
          Asistencias
        </h3>
        <button
          aria-label="Close"
          className="close"
          data-dismiss="modal"
          type="button"
          onClick={toggleModal}
        >
          <span aria-hidden={true}>×</span>
        </button>
      </div>
      <div className="modal-body">
        <Row>
          <Col className="mb-3">
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
                  MARÍA ALEJANDRA PASCO HERRERA
                 </span>
              </Media>
            </Media>
          </Col>
          <Col className="align-items-center" style={{ display: 'flex', justifyContent: 'flex-end', marginRight: '1rem' }}><span style={{fontSize:'.9rem'}}><i className="ni ni-calendar-grid-58"></i> MARZO</span></Col>
        </Row>
        <Table className="align-items-center table-flush" responsive>
          <thead className="thead-light">
            <tr>
              <th scope="col">Fecha</th>
              <th scope="col">Día</th>
              <th scope="col">Turno</th>
              <th scope="col">Hora</th>
              <th scope="col">Estado</th>
              <th scope="col">Observación</th>
              <th scope="col">Justificación</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {
              asistencias?.map((asistencia, key) =>
                <tr key={key}>
                  <td>
                    {"2021-10-05"}
                  </td>
                  <td>
                    {"Martes"}
                  </td>
                  <td>
                    {"Mañana"}
                  </td>
                  <td>
                    {"3:09pm"}
                  </td>
                  <td>
                    {asistencia.observaciones.length > 0 ?
                      <Badge color="" className="badge-dot mr-4">
                        <i className="bg-danger" /> Tardanza
                  </Badge>
                      :
                      <Badge color="" className="badge-dot mr-4">
                        <i className="bg-success" /> Normal
                  </Badge>
                    }
                  </td>
                  <td className="text-center">
                    {"-"}
                  </td>
                  <td className="text-center">
                    {"-"}
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

      </div>
      <div className="modal-footer">
        <Button
          color="primary"
          data-dismiss="modal"
          type="button"
          onClick={toggleModal}
        >
          Cerrar
        </Button>
      </div>
    </Modal>
  )
}


export default Asistencia;
