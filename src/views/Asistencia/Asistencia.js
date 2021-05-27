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
  UncontrolledTooltip
} from "reactstrap";
// core components
import PaginationComponent from "react-reactstrap-pagination";


import AsistenciaHeader from "components/Headers/AsistenciaHeader.js";
import SearchColaborador from "components/Selects/SearchColaborador.js";
import { useDispatch, useSelector } from "react-redux";
import { calcTime,indicatorsAll, listAssistanceByWorker, listAssistance, listDetail } from "../../redux/actions/Asistencia";
import Loading from "../../components/Loaders/LoadingSmall";

const Asistencia = () => {
  const dispatch = useDispatch();
  const { assistanceListAll, assistanceList, assistanceListByWorker, assistanceIndicatorsAll } = useSelector(({ asistencia }) => asistencia);
  const { loading } = useSelector(({ commonData }) => commonData);
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
    dispatch(listAssistanceByWorker(pageByWorker, search))
  }, [pageByWorker]);

  useEffect(() => {
    dispatch(listAssistance(pageall, search))
  }, [pageall]);

  useEffect(() => {
    dispatch(listDetail(page, search))
  }, [page]);

  useEffect(() => {
    let tsearch = search;
    if (month == null) {
      delete tsearch.month;
    } else {
      tsearch.month = month;
    }
    setsearch(tsearch);
    dispatch(indicatorsAll(search));
    dispatch(listAssistanceByWorker(pageByWorker, search));
    dispatch(listAssistance(pageall, tsearch));
    dispatch(listDetail(page, tsearch));
  }, [month]);

  useEffect(() => {
    let tsearch = search;
    if (idColaborador == null) {
      delete tsearch.idColaborador;
    } else {
      tsearch.idColaborador = idColaborador;
    }
    setsearch(tsearch);
    dispatch(indicatorsAll(search));
    dispatch(listAssistanceByWorker(pageByWorker, search));
    dispatch(listAssistance(pageall, tsearch));
    dispatch(listDetail(page, tsearch));
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
        tardanzas={calcTime(assistanceIndicatorsAll?.tardanzas)}
        faltas={assistanceIndicatorsAll?.faltas}
        hRealizadas={calcTime(assistanceIndicatorsAll?.hRealizadas)}
        hCompensar={calcTime(assistanceIndicatorsAll?.hCompensar)}
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
              {
                !loading || assistanceListByWorker?.data ?
                  <>
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
                                            process.env.REACT_APP_BASE + 'storage/colaborador/' + asistencia.foto}
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
                                    {calcTime(asistencia.debe)}
                                  </td>
                                  <td className="text-center">
                                    {calcTime(asistencia.compensar)}
                                  </td>
                                  <td className="text-center">
                                    {calcTime(asistencia.vacaciones)}
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
                              totalItems={assistanceListByWorker?.meta?.total ? assistanceListByWorker?.meta?.total : 0}
                              pageSize={10}
                              onSelect={(selectedPage) => setpageaByWorker(selectedPage)}
                              defaultActivePage={pageByWorker}
                              
                            />

                          </nav>
                        </CardFooter>
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
                              H. extra
                      </Badge>
                            <Badge style={{ marginRight: '.5rem', fontSize: '.8rem' }} color="primary" className="text-default">
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
                              <th scope="col">H. extra</th>
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
                                            process.env.REACT_APP_BASE + 'storage/colaborador/' + asistencia.foto}
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
                                      {parseInt(JSON.parse(asistencia.asistencia)[0]?.estado) == 1 ? "Normal" : parseInt(JSON.parse(asistencia.asistencia)[0]?.estado) == 2 ? "Tardanza" : parseInt(JSON.parse(asistencia.asistencia)[0]?.estado) == 3 ? "Falta" : parseInt(JSON.parse(asistencia.asistencia)[0]?.estado) == 4 ? "Salió temprano" : parseInt(JSON.parse(asistencia.asistencia)[0]?.estado) == 5 ? "H. extra" : "Vacaciones"}
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
                                      {parseInt(JSON.parse(asistencia.asistencia)[1]?.estado) == 1 ? "Normal" : parseInt(JSON.parse(asistencia.asistencia)[1]?.estado) == 2 ? "Tardanza" : parseInt(JSON.parse(asistencia.asistencia)[1]?.estado) == 3 ? "Falta" : parseInt(JSON.parse(asistencia.asistencia)[1]?.estado) == 4 ? "Salió temprano" : parseInt(JSON.parse(asistencia.asistencia)[1]?.estado) == 5 ? "H. extra" : parseInt(JSON.parse(asistencia.asistencia)[1]?.estado) == 5 ? "Vacaciones" : ""}
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
                                      {parseInt(JSON.parse(asistencia.asistencia)[2]?.estado) == 1 ? "Normal" : parseInt(JSON.parse(asistencia.asistencia)[2]?.estado) == 2 ? "Tardanza" : parseInt(JSON.parse(asistencia.asistencia)[2]?.estado) == 3 ? "Falta" : parseInt(JSON.parse(asistencia.asistencia)[2]?.estado) == 4 ? "Salió temprano" : parseInt(JSON.parse(asistencia.asistencia)[2]?.estado) == 5 ? "H. extra" : parseInt(JSON.parse(asistencia.asistencia)[2]?.estado) == 6 ? "Vacaciones" : ""}
                                    </UncontrolledTooltip>
                                  </td>
                                  <td>
                                    <Badge
                                      id={`tooltip_in_ss_${key}`}
                                      data-placement="top"
                                      className={parseInt(JSON.parse(asistencia.asistencia)[3]?.estado) == 4 ? "bg-yellow text-default" : ""}
                                      type="button" style={{ marginRight: '.5rem', fontSize: '.8rem' }} color={parseInt(JSON.parse(asistencia.asistencia)[3]?.estado) == 1 ? "success" : parseInt(JSON.parse(asistencia.asistencia)[3]?.estado) == 2 ? "warning" : parseInt(JSON.parse(asistencia.asistencia)[3]?.estado) == 3 ? "danger" : parseInt(JSON.parse(asistencia.asistencia)[3]?.estado) == 4 ? "default" : parseInt(JSON.parse(asistencia.asistencia)[3]?.estado) == 5 ? "default" : "info"}>
                                      {JSON.parse(asistencia.asistencia)[3]?.hora}
                                    </Badge>
                                    <UncontrolledTooltip
                                      delay={0}
                                      placement="top"
                                      target={`tooltip_in_ss_${key}`}
                                    >
                                      {parseInt(JSON.parse(asistencia.asistencia)[3]?.estado) == 1 ? "Normal" : parseInt(JSON.parse(asistencia.asistencia)[3]?.estado) == 2 ? "Tardanza" : parseInt(JSON.parse(asistencia.asistencia)[3]?.estado) == 3 ? "Falta" : parseInt(JSON.parse(asistencia.asistencia)[3]?.estado) == 4 ? "Salió temprano" : parseInt(JSON.parse(asistencia.asistencia)[3]?.estado) == 5 ? "H. extra" : "Vacaciones"}
                                    </UncontrolledTooltip>
                                  </td>
                                  <td className="text-center">
                                    {
                                      calcTime(asistencia.tardanza)}
                                  </td>
                                  <td className="text-center">
                                    {
                                    "-" //h. extra 
                                    }
                                  </td>
                                  <td className="text-center">
                                    {calcTime(asistencia.compensado)}
                                  </td>
                                  <td className="text-center">
                                    {
                                      calcTime(asistencia.falta)}
                                  </td>
                                  <td className="text-center">
                                    {
                                      calcTime(asistencia.temp)}
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
                              totalItems={assistanceListAll?.meta?.total ? assistanceListAll?.meta?.total : 0}
                              pageSize={10}
                              onSelect={(selectedPage) => setpageall(selectedPage)}
                              defaultActivePage={pageall}
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
                            <Badge style={{ marginRight: '.5rem', fontSize: '.8rem' }} color="default" className="text-default">
                              H. extra
                      </Badge>
                            <Badge style={{ marginRight: '.5rem', fontSize: '.8rem' }} color="primary" className="text-default">
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
                              <th scope="col">Minutos</th>
                              <th scope="col" className="text-center">Observación</th>
                              <th scope="col" className="text-center">Justificación</th>
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
                                            process.env.REACT_APP_BASE + 'storage/colaborador/' + asistencia.foto}
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
                                      {parseInt(asistencia.estado) == 1 ? "Normal" : parseInt(asistencia.estado) == 2 ? "Tardanza" : parseInt(asistencia.estado) == 3 ? "Falta" : parseInt(asistencia.estado) == 4 ? "Salió temprano" : "H. extra"}
                                    </UncontrolledTooltip>
                                  </td>
                                  <td className="text-center">
                                    {calcTime(asistencia.calc)}
                                  </td>
                                  <td className="text-center table-w-line-break">
                                    {asistencia.observacion == null ? "-" : asistencia.observacion}
                                  </td>
                                  <td className="text-center table-w-line-break">
                                    {asistencia.justificacion == null ? "-" : asistencia.justificacion}
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
                              totalItems={assistanceList?.meta?.total ? assistanceList?.meta?.total : 0}
                              pageSize={10}
                              onSelect={(selectedPage) => setPage(selectedPage)}
                              defaultActivePage={page}
                            />
                          </nav>
                        </CardFooter>
                      </TabPane>
                    </TabContent>
                  </>
                  :
                  <Loading />
              }
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Asistencia;