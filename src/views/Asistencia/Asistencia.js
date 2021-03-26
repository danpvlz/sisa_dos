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
      <AsistenciaHeader
        tardanzas={asistencias.tardanzas}
        faltas={asistencias.faltas}
        hRealizadas={asistencias.hRealizadas}
        hCompensar={asistencias.hCompensar}
      />
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
                        <i className="fa fa-user mr-2" />
                        Por colaborador
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
                        <i className="fa fa-clock mr-2" aria-hidden="true"></i>
                        Por día
                      </NavLink>
                    </NavItem>
                    <NavItem style={{ cursor: 'pointer' }}>
                      <NavLink
                        aria-selected={state.tabs === 3}
                        className={classnames("mb-sm-3 mb-md-0", {
                          active: state.tabs === 3
                        })}
                        onClick={e => toggleNavs(e, "tabs", 3)}
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
                  <Table className="align-items-center table-flush" responsive>
                    <thead className="thead-light">
                      <tr>
                        <th scope="col">Colaborador</th>
                        <th className="text-center" scope="col">Debe</th>
                        <th className="text-center" scope="col">Compensar</th>
                        <th className="text-center" scope="col">Observaciones</th>
                        <th className="text-center" scope="col">Justificaciones</th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        asistencias.tab1?.map((asistencia, key) =>
                          <tr key={key}>
                            <th scope="row">
                              <Media className="align-items-center">
                                <img
                                  className="avatar rounded-circle mr-3"
                                  alt="..."
                                  src={asistencia.foto}
                                />
                                <Media>
                                  <span className="mb-0 text-sm">
                                    {asistencia.colaborador}
                                  </span>
                                </Media>
                              </Media>

                            </th>
                            <td className="text-center">
                              {asistencia.tardanzas}min
                            </td>
                            <td className="text-center">
                              {asistencia.tardanzas}min
                            </td>
                            <td className="text-center">
                              {asistencia.observaciones.length > 0 ?
                                <Badge color="" className="badge-dot mr-4">
                                  <i className="bg-yellow" /> Con observaciones
                            </Badge>
                                :
                                "-"
                              }
                            </td>
                            <td className="text-center">
                              {asistencia.justificaciones.length > 0 ?
                                <Badge color="" className="badge-dot mr-4">
                                  <i className="bg-yellow" /> Con justificaciones
                            </Badge>
                                :
                                "-"
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
                  <div className="bg-secondary text-center pb-3">
                    <Col className="not-selectble">
                      <Badge style={{ marginRight: '.5rem', fontSize: '.8rem' }} color="success">
                        Normal
                      </Badge>
                      <Badge style={{ marginRight: '.5rem', fontSize: '.8rem' }} color="warning">
                        Tardanza
                      </Badge>
                      <Badge style={{ marginRight: '.5rem', fontSize: '.8rem' }} color="danger">
                        Falta
                      </Badge>
                      <Badge style={{ marginRight: '.5rem', fontSize: '.8rem' }} className="bg-yellow text-default">
                        Salió temprano
                      </Badge>
                      <Badge style={{ marginRight: '.5rem', fontSize: '.8rem' }} color="default" className="text-default">
                        Compensó
                      </Badge>
                    </Col>
                  </div>
                  <Table className="align-items-center table-flush" responsive>
                    <thead className="thead-light">
                      <tr>
                        <th scope="col">Colaborador</th>
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
                        asistencias.tab2?.map((asistencia, key) =>
                          <tr key={key}>
                            <th scope="row">
                              <Media className="align-items-center">
                                <img
                                  className="avatar rounded-circle mr-3"
                                  alt="..."
                                  src={asistencia.foto}
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
                              {asistencia.tardanza}
                            </td>
                            <td className="text-center">
                              {asistencia.compensado}
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
                <TabPane tabId="tabs3">
                  <div className="bg-secondary text-center pb-3">
                    <Col className="not-selectble">
                      <Badge style={{ marginRight: '.5rem', fontSize: '.8rem' }} color="success" type="button">
                        Normal
                      </Badge>
                      <Badge style={{ marginRight: '.5rem', fontSize: '.8rem' }} color="warning" type="button">
                        Tardanza
                      </Badge>
                      <Badge style={{ marginRight: '.5rem', fontSize: '.8rem' }} color="danger" type="button">
                        Falta
                      </Badge>
                      <Badge style={{ marginRight: '.5rem', fontSize: '.8rem' }} className="bg-yellow text-default" type="button">
                        Salió temprano
                      </Badge>
                      <Badge style={{ marginRight: '.5rem', fontSize: '.8rem' }} color="default" className="text-default" type="button">
                        Compensó
                      </Badge>
                    </Col>
                  </div>
                  <Table className="align-items-center table-flush" responsive>
                    <thead className="thead-light">
                      <tr>
                        <th scope="col">Colaborador</th>
                        <th scope="col">Fecha</th>
                        <th scope="col">Día</th>
                        <th scope="col">Turno</th>
                        <th scope="col">Tipo</th>
                        <th scope="col">Hora</th>
                        <th scope="col">Observación</th>
                        <th scope="col">Justificación</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        asistencias.tab3?.map((asistencia, key) =>
                          <tr key={key}>
                            <th scope="row">
                              <Media className="align-items-center">
                                <img
                                  className="avatar rounded-circle mr-3"
                                  alt="..."
                                  src={asistencia.foto}
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
                              {asistencia.turno == 1 ? "Primero" : "Segundo"}
                            </td>
                            <td>
                              {asistencia.tipo == 1 ? "Entrada" : "Salida"}
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
                              {asistencia.observacion.length == 0 ? "-" : asistencia.observacion}
                            </td>
                            <td className="text-center">
                              {asistencia.justificacion.length == 0 ? "-" : asistencia.justificacion}
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
          <Col className="align-items-center" style={{ display: 'flex', justifyContent: 'flex-end', marginRight: '1rem' }}><span style={{ fontSize: '.9rem' }}><i className="ni ni-calendar-grid-58"></i> MARZO</span></Col>
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
              asistencias.detalleAsistencia?.map((asistencia, key) =>
                <tr key={key}>
                  <td>
                    {"2021-10-05"}
                  </td>
                  <td>
                    {['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'][new Date(asistencia.fecha).getDay()]}
                  </td>
                  <td>
                    {asistencia.turno == 1 ? "Primero" : "Segundo"}
                  </td>
                  <td>
                    {asistencia.turno}
                  </td>
                  <td>
                    {asistencia.estado == 1 ? "NORMAL" : asistencia.estado == 2 ? "TARDANZA" : asistencia.estado == 3 ? "Falta" : "COMPENSÓ"}
                  </td>
                  <td className="text-center">
                    {asistencia.observacion.length == 0 ? "-" : asistencia.observacion}
                  </td>
                  <td className="text-center">
                    {asistencia.justificacion.length == 0 ? "-" : asistencia.justificacion}
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