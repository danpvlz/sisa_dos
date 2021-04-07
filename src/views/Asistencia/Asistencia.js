import React, { useEffect, useState } from "react";
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
import PaginationComponent from "react-reactstrap-pagination";


import AsistenciaHeader from "components/Headers/AsistenciaHeader.js";
import SearchColaborador from "components/Selects/SearchColaborador.js";
import { useDispatch, useSelector } from "react-redux";
import { indicatorsAll,listAssistanceByWorker,listAssistance,listDetail } from "../../redux/actions/Asistencia";

const Asistencia = () => {
  const dispatch = useDispatch();
  const { assistanceListAll, assistanceList, assistanceListByWorker, assistanceIndicatorsAll } = useSelector(({ asistencia }) => asistencia);
  const [pageByWorker, setpageaByWorker] = useState(1);
  const [pageall, setpageall] = useState(1);
  const [page, setPage] = useState(1);
  const [search, setsearch] = useState({});
  const [month, setmonth] = useState(null);
  const [idColaborador, setidColaborador] = useState(null);
  const asistencias = require('../../data/asistencia.json');
  const history = useHistory();
  const [showDetail, setShowDetail] = useState(false);

  useEffect(() => {
    dispatch(listAssistanceByWorker(pageByWorker,search))
  }, [pageByWorker]);

  useEffect(() => {
    dispatch(listAssistance(pageall,search))
  }, [pageall]);

  useEffect(() => {
    dispatch(listDetail(page,search))
  }, [page]);

  useEffect(() => {
    let tsearch=search;
    if(month == null){
      delete tsearch.month;
    }else{
      tsearch.month=month;
    }
    setsearch(tsearch);
    dispatch(indicatorsAll(search));
    dispatch(listAssistanceByWorker(pageByWorker,search));
    dispatch(listAssistance(pageall,tsearch));
    dispatch(listDetail(page,tsearch));
  }, [month]);

  useEffect(() => {
    let tsearch=search;
    if(idColaborador == null){
      delete tsearch.idColaborador;
    }else{
      tsearch.idColaborador=idColaborador;
    }
    setsearch(tsearch);
    dispatch(indicatorsAll(search));
    dispatch(listAssistanceByWorker(pageByWorker,search));
    dispatch(listAssistance(pageall,tsearch));
    dispatch(listDetail(page,tsearch));
  }, [idColaborador]);

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
        tardanzas={assistanceIndicatorsAll?.tardanzas}
        faltas={assistanceIndicatorsAll?.faltas}
        hRealizadas={assistanceIndicatorsAll?.hRealizadas}
        hCompensar={assistanceIndicatorsAll?.hCompensar}
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
                        id="filterMonth"
                        placeholder="filterMonth"
                        type="month"
                        onChange={(e) => {
                          setmonth(e.target.value == "" ? null : e.target.value)
                        }}
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
                      <SearchColaborador setVal={setidColaborador} />
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
                        <th className="text-center" scope="col">Faltas</th>
                        <th className="text-center" scope="col">Debe</th>
                        <th className="text-center" scope="col">Compensar</th>
                        <th className="text-center" scope="col">Vacaciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        assistanceListByWorker?.data?.map((asistencia, key) =>
                          <tr key={key}>
                            <th scope="row">
                              <Media className="align-items-center">
                                <img
                                  className="avatar rounded-circle mr-3"
                                  alt="..."
                                  src={
                                    asistencia.foto == null || asistencia.foto == "" ?
                                    require("../../assets/img/theme/default.png")
                                      .default
                                    :
                                    process.env.REACT_APP_BASE + 'storage/colaborador/'+asistencia.foto}
                                />
                                <Media>
                                  <span className="mb-0 text-sm">
                                    {asistencia.colaborador}
                                  </span>
                                </Media>
                              </Media>

                            </th>
                            <td className="text-center">
                              {asistencia.faltas}
                            </td>
                            <td className="text-center">
                              {asistencia.debe*-1}min
                            </td>
                            <td className="text-center">
                              {asistencia.compensar}min
                            </td>
                            <td className="text-center">
                              {asistencia.vacaciones/60}h
                            </td>
                            <td className="d-none">
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
                    <nav aria-label="..." className="pagination justify-content-end mb-0">
                      <PaginationComponent
                        listClassName="justify-content-end mb-0"
                        firstPageText="<<"
                        lastPageText=">>"
                        previousPageText="<"
                        nextPageText=">"
                        totalItems={assistanceListByWorker?.meta?.total}
                        pageSize={10}
                        onSelect={(selectedPage)=>setpageaByWorker(selectedPage)}
                      />
                    
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
                        <th scope="col">Falta</th>
                        <th scope="col">Salió temprano</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        assistanceListAll?.data?.map((asistencia, key) =>
                          <tr key={key}>
                            <th scope="row">
                              <Media className="align-items-center">
                                <img
                                  className="avatar rounded-circle mr-3"
                                  alt="..."
                                  src={
                                    asistencia.foto == null || asistencia.foto == "" ?
                                    require("../../assets/img/theme/default.png")
                                      .default
                                    :
                                    process.env.REACT_APP_BASE + 'storage/colaborador/'+asistencia.foto}
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
                                id={`tooltip_in_fe_${key}`}
                                data-placement="top"
                                className={parseInt(JSON.parse(asistencia.asistencia)[0]?.estado) == 4 ? "bg-yellow text-default" : ""}
                                type="button" style={{ marginRight: '.5rem', fontSize: '.8rem' }} color={parseInt(JSON.parse(asistencia.asistencia)[0]?.estado) == 1 ? "success" : parseInt(JSON.parse(asistencia.asistencia)[0]?.estado) == 2 ? "warning" : parseInt(JSON.parse(asistencia.asistencia)[0]?.estado) == 3 ? "danger" : parseInt(JSON.parse(asistencia.asistencia)[0]?.estado) == 4 ? "yellow" : parseInt(JSON.parse(asistencia.asistencia)[0]?.estado) == 5 ? "default" : "info"}>
                                {JSON.parse(asistencia.asistencia)[0]?.hora}
                              </Badge>
                              <UncontrolledTooltip
                                delay={0}
                                placement="top"
                                target={`tooltip_in_fe_${key}`}
                              >
                                {parseInt(JSON.parse(asistencia.asistencia)[0]?.estado) == 1 ? "Normal" : parseInt(JSON.parse(asistencia.asistencia)[0]?.estado) == 2 ? "Tardanza" : parseInt(JSON.parse(asistencia.asistencia)[0]?.estado) == 3 ? "Falta" : parseInt(JSON.parse(asistencia.asistencia)[0]?.estado) == 4 ? "Salió temprano" : parseInt(JSON.parse(asistencia.asistencia)[0]?.estado) == 5 ? "Compensó" : "Vacaciones"}
                              </UncontrolledTooltip>
                            </td>
                            <td> 
                              <Badge
                                id={`tooltip_in_fs_${key}`}
                                data-placement="top"
                                className={parseInt(JSON.parse(asistencia.asistencia)[1]?.estado) == 4 ? "bg-yellow text-default" : ""}
                                type="button" style={{ marginRight: '.5rem', fontSize: '.8rem' }} color={parseInt(JSON.parse(asistencia.asistencia)[1]?.estado) == 1 ? "success" : parseInt(JSON.parse(asistencia.asistencia)[1]?.estado) == 2 ? "warning" : parseInt(JSON.parse(asistencia.asistencia)[1]?.estado) == 3 ? "danger" : parseInt(JSON.parse(asistencia.asistencia)[1]?.estado) == 4 ? "default" : parseInt(JSON.parse(asistencia.asistencia)[1]?.estado) == 5 ? "default" : "info"}>
                                {JSON.parse(asistencia.asistencia)[1]?.hora}
                              </Badge>
                              <UncontrolledTooltip
                                delay={0}
                                placement="top"
                                target={`tooltip_in_fs_${key}`}
                              >
                                {parseInt(JSON.parse(asistencia.asistencia)[1]?.estado) == 1 ? "Normal" : parseInt(JSON.parse(asistencia.asistencia)[1]?.estado) == 2 ? "Tardanza" : parseInt(JSON.parse(asistencia.asistencia)[1]?.estado) == 3 ? "Falta" : parseInt(JSON.parse(asistencia.asistencia)[1]?.estado) == 4 ? "Salió temprano" : parseInt(JSON.parse(asistencia.asistencia)[1]?.estado) == 5 ? "Compensó" : "Vacaciones"}
                              </UncontrolledTooltip>
                            </td>
                            <td>
                              <Badge
                                id={`tooltip_in_se_${key}`}
                                data-placement="top"
                                className={parseInt(JSON.parse(asistencia.asistencia)[2]?.estado) == 4 ? "bg-yellow text-default" : ""}
                                type="button" style={{ marginRight: '.5rem', fontSize: '.8rem' }} color={parseInt(JSON.parse(asistencia.asistencia)[2]?.estado) == 1 ? "success" : parseInt(JSON.parse(asistencia.asistencia)[2]?.estado) == 2 ? "warning" : parseInt(JSON.parse(asistencia.asistencia)[2]?.estado) == 3 ? "danger" : parseInt(JSON.parse(asistencia.asistencia)[2]?.estado) == 4 ? "default" : parseInt(JSON.parse(asistencia.asistencia)[2]?.estado) == 5 ? "default" : "info"}>
                                {JSON.parse(asistencia.asistencia)[2]?.hora}
                              </Badge>
                              <UncontrolledTooltip
                                delay={0}
                                placement="top"
                                target={`tooltip_in_se_${key}`}
                              >
                                {parseInt(JSON.parse(asistencia.asistencia)[2]?.estado) == 1 ? "Normal" : parseInt(JSON.parse(asistencia.asistencia)[2]?.estado) == 2 ? "Tardanza" : parseInt(JSON.parse(asistencia.asistencia)[2]?.estado) == 3 ? "Falta" : parseInt(JSON.parse(asistencia.asistencia)[2]?.estado) == 4 ? "Salió temprano" : parseInt(JSON.parse(asistencia.asistencia)[2]?.estado) == 5 ? "Compensó" : "Vacaciones"}
                              </UncontrolledTooltip>
                            </td>
                            <td> 
                              <Badge
                                id={`tooltip_in_se_${key}`}
                                data-placement="top"
                                className={parseInt(JSON.parse(asistencia.asistencia)[3]?.estado) == 4 ? "bg-yellow text-default" : ""}
                                type="button" style={{ marginRight: '.5rem', fontSize: '.8rem' }} color={parseInt(JSON.parse(asistencia.asistencia)[3]?.estado) == 1 ? "success" : parseInt(JSON.parse(asistencia.asistencia)[3]?.estado) == 2 ? "warning" : parseInt(JSON.parse(asistencia.asistencia)[3]?.estado) == 3 ? "danger" : parseInt(JSON.parse(asistencia.asistencia)[3]?.estado) == 4 ? "default" : parseInt(JSON.parse(asistencia.asistencia)[3]?.estado) == 5 ? "default" : "info"}>
                                {JSON.parse(asistencia.asistencia)[3]?.hora}
                              </Badge>
                              <UncontrolledTooltip
                                delay={0}
                                placement="top"
                                target={`tooltip_in_se_${key}`}
                              >
                                {parseInt(JSON.parse(asistencia.asistencia)[3]?.estado) == 1 ? "Normal" : parseInt(JSON.parse(asistencia.asistencia)[3]?.estado) == 2 ? "Tardanza" : parseInt(JSON.parse(asistencia.asistencia)[3]?.estado) == 3 ? "Falta" : parseInt(JSON.parse(asistencia.asistencia)[3]?.estado) == 4 ? "Salió temprano" : parseInt(JSON.parse(asistencia.asistencia)[3]?.estado) == 5 ? "Compensó" : "Vacaciones"}
                              </UncontrolledTooltip>
                            </td>
                            <td className="text-center">
                              {asistencia.tardanza == 0 ? "-" : asistencia.tardanza < 0 ? (asistencia.tardanza*-1)>60 && (asistencia.tardanza*-1)/60+"h"  : asistencia.tardanza*-1+"min"}
                            </td>
                            <td className="text-center">
                              {asistencia.compensado == 0 ? "-" : asistencia.compensado < 0 ? (asistencia.compensado*-1)>60 && (asistencia.compensado*-1)/60+"h"  : asistencia.compensado*-1+"min"}
                            </td>
                            <td className="text-center">
                              {asistencia.falta == 0 ? "-" : asistencia.falta < 0 ? (asistencia.falta*-1)>60 ? (asistencia.falta*-1)/60+"h"  : asistencia.falta*-1+"min" : asistencia.falta*-1+"min"}
                            </td>
                            <td className="text-center">
                              {asistencia.temp == 0 ? "-" : asistencia.temp < 0 ? (asistencia.temp*-1)>60 ? (asistencia.temp*-1)/60+"h"  : asistencia.temp*-1+"min" : asistencia.falta*-1+"min"}
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
                        totalItems={assistanceListAll?.meta?.total}
                        pageSize={10}
                        onSelect={(selectedPage)=>setpageall(selectedPage)}
                      />
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
                        <th scope="col">Tipo</th>
                        <th scope="col">Hora</th>
                        <th scope="col">Tardanza</th>
                        <th scope="col">Compensado</th>
                        <th scope="col">Salió temprano</th>
                        <th scope="col">Observación</th>
                        <th scope="col">Justificación</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        assistanceList?.data?.map((asistencia, key) =>
                          <tr key={key}>
                            <th scope="row">
                              <Media className="align-items-center">
                                <img
                                  className="avatar rounded-circle mr-3"
                                  alt="..."
                                  src={
                                    asistencia.foto == null || asistencia.foto == "" ?
                                    require("../../assets/img/theme/default.png")
                                      .default
                                    :
                                    process.env.REACT_APP_BASE + 'storage/colaborador/'+asistencia.foto}
                                />
                                <Media>
                                  <span className="mb-0 text-sm">
                                    {`${asistencia?.nombres} ${asistencia?.apellidoPaterno} ${asistencia?.apellidoMaterno}`}
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
                              {asistencia.tipo == 1 ? "Entrada" : "Salida"}
                            </td>
                            <td>
                              <Badge
                                id={`tooltip_in_${key}`}
                                data-placement="top"
                                className={parseInt(asistencia.estado) == 4 ? "bg-yellow text-default" : ""}
                                type="button" style={{ marginRight: '.5rem', fontSize: '.8rem' }} color={parseInt(asistencia.estado) == 1 ? "success" : parseInt(asistencia.estado) == 2 ? "warning" : parseInt(asistencia.estado) == 3 ? "danger" : parseInt(asistencia.estado) == 4 ? "yellow" : "default"}>
                                {asistencia.hora}
                              </Badge>
                              <UncontrolledTooltip
                                delay={0}
                                placement="top"
                                target={`tooltip_in_${key}`}
                              >
                                {parseInt(asistencia.estado) == 1 ? "Normal" : parseInt(asistencia.estado) == 2 ? "Tardanza" : parseInt(asistencia.estado) == 3 ? "Falta" : parseInt(asistencia.estado) == 4 ? "Salió temprano" : "Compensó"}
                              </UncontrolledTooltip>
                            </td>
                            <td className="text-center">
                              {parseInt(asistencia.estado) == 2 ?  asistencia.calc*-1>60 ? asistencia.calc*-1/60+"h" : asistencia.calc*-1+"min" : "-"}
                            </td>
                            <td className="text-center">
                              {parseInt(asistencia.estado) == 5 ?  asistencia.calc>60 ? asistencia.calc/60+"h" : asistencia.calc+"min" : "-"}
                            </td>
                            <td className="text-center">
                              {parseInt(asistencia.estado) == 4 ?  asistencia.calc*-1>60 ? asistencia.calc*-1/60+"h" : asistencia.calc*-1+"min" : "-"}
                            </td>
                            <td className="text-center">
                              {asistencia.observacion==null ? "-" : asistencia.observacion}
                            </td>
                            <td className="text-center">
                              {asistencia.justificacion==null ? "-" : asistencia.justificacion}
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
                    totalItems={assistanceList?.meta?.total}
                    pageSize={10}
                    onSelect={(selectedPage)=>setpageall(selectedPage)}
                  />
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