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
  Modal
} from "reactstrap";
// core components

import AsistenciaHeader from "components/Headers/Asistencia.js";
import SearchColaborador from "components/Selects/SearchColaborador.js";

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]

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
                        <i className="ni ni-calendar-grid-58 mr-2" />
                        Asistencia
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
                        <i className="fa fa-bars mr-2" aria-hidden="true"></i>
                        Detalle
                      </NavLink>
                    </NavItem>
                  </Nav>
                </div>
              </CardHeader>
              <TabContent activeTab={"tabs" + state.tabs} >
                <TabPane tabId="tabs1">
                  <Table className="align-items-center table-flush" responsive>
                    <thead className="thead-light">
                      <tr>
                        <th scope="col">Colaborador</th>
                        <th scope="col">Tardanzas</th>
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
                              20min
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
                                onClick={toggleModal}
                              >
                                <i className="fas fa-eye" style={{ color: "#1279ee" }} />
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
                  <DetalleAsistencia showDetail={showDetail} toggleModal={toggleModal} />
                </TabPane>
                <TabPane tabId="tabs2">
                  <Table className="align-items-center table-flush" responsive>
                    <thead className="thead-light">
                      <tr>
                        <th scope="col">Colaborador</th>
                        <th scope="col">Fecha</th>
                        <th scope="col">Día</th>
                        <th scope="col">Turno</th>
                        <th scope="col">Entrada</th>
                        <th scope="col">Salida</th>
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
                              {['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'][new Date(asistencia.fecha).getDay()]}
                            </td>
                            <td>
                              {asistencia.turno == 1 ? "Mañana" : "Tarde"}
                            </td>
                            <td>
                              {parseInt(asistencia.estado) == 1 ?
                                <Badge style={{ fontSize: '.8rem' }} color="success">
                                  {asistencia.entrada}
                                </Badge>
                                :
                                parseInt(asistencia.estado) == 2 ?
                                  <Badge style={{ fontSize: '.8rem' }} color="danger">
                                    {asistencia.entrada}
                                  </Badge>
                                  :
                                  <Badge style={{ fontSize: '.8rem' }} color="warning">
                                    {asistencia.entrada}
                                  </Badge>
                              }
                            </td>
                            <td> {/*VERDE: SALIDA NORMAL, AZUL:COMPENSÓ HORAS */}
                              {parseInt(asistencia.estado) == 1 ?
                                <Badge style={{ fontSize: '.8rem' }} color="success">
                                  {asistencia.salida}
                                </Badge>
                                :
                                <Badge style={{ fontSize: '.8rem' }} color="default">
                                  {asistencia.salida}
                                </Badge>
                              }
                            </td>
                            <td className="text-center">
                              {asistencia.tardanza}
                            </td>
                            <td className="text-center">
                              {asistencia.tardanza}
                            </td>
                            <td className="text-center">
                              {asistencia.observaciones.length > 0 ? asistencia.observaciones.map(obs => obs) : "-"}
                            </td>
                            <td className="text-center">
                              {asistencia.observaciones.length > 0 ? asistencia.observaciones.map(obs => obs) : "-"}
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
          <Col className="align-items-center" style={{display:'flex',justifyContent: 'flex-end',marginRight:'1rem'}}><span>MARZO</span></Col>
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
                        <i className="bg-danger" /> Trdanza
                  </Badge>
                      :
                      <Badge color="" className="badge-dot mr-4">
                        <i className="bg-success" /> Normal
                  </Badge>
                    }
                  </td>
                  <td>
                    {"-"}
                  </td>
                  <td>
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
