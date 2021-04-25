import React, { useCallback, useState, useEffect } from "react";
import classnames from "classnames";
import PaginationComponent from "react-reactstrap-pagination";

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
import { useDispatch, useSelector } from "react-redux";
import { myAssistance, myAssistanceDetail, indicators, saveJustification } from "../../redux/actions/Asistencia";
import Justify from '../../components/Modals/JustifyModal';

const Asistencia = () => {
  const dispatch = useDispatch();
  const { myAssistanceList, myAssistanceDetailList, assistanceIndicators } = useSelector(({ asistencia }) => asistencia);
  const [page, setPage] = useState(1);
  const [pageDetail, setPageDetail] = useState(1);
  const [search, setsearch] = useState({});
  const [month, setmonth] = useState(null);
  const [showDetail, setShowDetail] = useState(false);

  const [maxdatejustification, setmaxdatejustification] = useState(new Date().toISOString().slice(0, 10));
  const [idAssistance, setidAssistance] = useState(0);
  const [showJustify, setShowJustify] = useState(false);
  const [justificacion, setjustificacion] = useState("")
  const [sendJustification, setSendJustification] = useState(false);

  useEffect(() => {
    let dd = new Date();
    dd.setDate(dd.getDate() - 3);
    setmaxdatejustification(dd.toISOString().slice(0, 10));
  }, [])

  useEffect(() => {
    let tsearch = search;
    if (month == null) {
      delete tsearch.month;
    } else {
      tsearch.month = month;
    }
    setsearch(tsearch);
    dispatch(myAssistance(page, search));
    dispatch(myAssistanceDetail(page, search));
    dispatch(indicators(search));
  }, [month]);

  useEffect(() => {
    dispatch(myAssistance(page, search));
  }, [page]);

  useEffect(() => {
    dispatch(myAssistanceDetail(pageDetail, search));
  }, [pageDetail]);

  const toggleModal = () => {
    setShowDetail(!showDetail);
  };

  const toggleModalJustify = () => {
    setShowJustify(!showJustify);
  };

  useEffect(() => {
    if (sendJustification) {
      //REGISTRAR
      var fData = {
        "idAsistencia": idAssistance,
        "justification": justificacion
      }
      dispatch(saveJustification(fData))
      //REGISTRAR
      setSendJustification(false);
      setidAssistance(0);
      setjustificacion("");
      dispatch(myAssistance(page, search));
      dispatch(myAssistanceDetail(page, search));
      dispatch(indicators(search));
    }
  }, [sendJustification])

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
        tardanzas={assistanceIndicators?.tardanzas}
        faltas={assistanceIndicators?.faltas}
        hRealizadas={assistanceIndicators?.hRealizadas}
        hCompensar={assistanceIndicators?.hCompensar} />
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
                        id="filterMonth"
                        placeholder="filterMonth"
                        type="month"
                        onChange={(e) => {
                          setmonth(e.target.value == "" ? null : e.target.value)
                        }}
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
                      <Badge style={{ marginRight: '.5rem', fontSize: '.8rem' }} className="bg-yellow text-default">
                        Salió temprano
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
                        <th scope="col">Falta</th>
                        <th scope="col">Salió temprano</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        myAssistanceList?.data?.map((asistencia, key) =>
                          <tr key={key}>
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
                                className={parseInt(JSON.parse(asistencia.asistencia)[0].estado) == 4 ? "bg-yellow text-default" : ""}
                                type="button" style={{ marginRight: '.5rem', fontSize: '.8rem' }} color={parseInt(JSON.parse(asistencia.asistencia)[0].estado) == 1 ? "success" : parseInt(JSON.parse(asistencia.asistencia)[0].estado) == 2 ? "warning" : parseInt(JSON.parse(asistencia.asistencia)[0].estado) == 3 ? "danger" : parseInt(JSON.parse(asistencia.asistencia)[0].estado) == 4 ? "yellow" : parseInt(JSON.parse(asistencia.asistencia)[0].estado) == 5 ? "default" : "info"}>
                                {JSON.parse(asistencia.asistencia)[0].hora}
                              </Badge>
                              <UncontrolledTooltip
                                delay={0}
                                placement="top"
                                target={`tooltip_in_fe_${key}`}
                              >
                                {parseInt(JSON.parse(asistencia.asistencia)[0].estado) == 1 ? "Normal" : parseInt(JSON.parse(asistencia.asistencia)[0].estado) == 2 ? "Tardanza" : parseInt(JSON.parse(asistencia.asistencia)[0].estado) == 3 ? "Falta" : parseInt(JSON.parse(asistencia.asistencia)[0].estado) == 4 ? "Salió temprano" : parseInt(JSON.parse(asistencia.asistencia)[0].estado) == 5 ? "Compensó" : "Vacaciones"}
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
                              {
                              asistencia.tardanza==0 ?
                              "-" :
                              Math.abs(asistencia.tardanza)>60 ? Math.round(Math.abs(asistencia.tardanza)/60)+"h " + Math.round(Math.abs(asistencia.tardanza)%60)+"min": Math.round(Math.abs(asistencia.tardanza))+"min"}
                            
                            </td>
                            <td className="text-center">
                              {
                              asistencia.compensado==0 ?
                              "-" :
                              Math.abs(asistencia.compensado)>60 ? Math.round(Math.abs(asistencia.compensado)/60)+"h " + Math.round(Math.abs(asistencia.compensado)%60)+"min": Math.round(Math.abs(asistencia.compensado))+"min"}
                            
                            </td>
                            <td className="text-center">
                              {
                              asistencia.falta==0 ?
                              "-" :
                              Math.abs(asistencia.falta)>60 ? Math.round(Math.abs(asistencia.falta)/60)+"h " + Math.round(Math.abs(asistencia.falta)%60)+"min": Math.round(Math.abs(asistencia.falta))+"min"}
                            </td>
                            <td className="text-center">
                              {
                              asistencia.temp==0 ?
                              "-" :
                              Math.abs(asistencia.temp)>60 ? Math.round(Math.abs(asistencia.temp)/60)+"h " + Math.round(Math.abs(asistencia.temp)%60)+"min": Math.round(Math.abs(asistencia.temp))+"min"}
                            
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
                        totalItems={myAssistanceList?.meta?.total ? myAssistanceList?.meta?.total : 0}
                        pageSize={10}
                        onSelect={(selectedPage) => setPage(selectedPage)}
                      />
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
                      <Badge style={{ marginRight: '.5rem', fontSize: '.8rem' }} className="bg-yellow text-default">
                        Salió temprano
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
                        <th scope="col">Tipo</th>
                        <th scope="col">Hora</th>
                        <th scope="col">Tardanza</th>
                        <th scope="col">Compensado</th>
                        <th scope="col">Falta</th>
                        <th scope="col">Salió temprano</th>
                        <th scope="col">Observación</th>
                        <th scope="col">Justificación</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        myAssistanceDetailList?.data?.map((asistencia, key) =>
                          <tr key={key}>
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
                                id={`tooltip_in_se_${key}`}
                                data-placement="top"
                                className={parseInt(asistencia.estado) == 4 ? "bg-yellow text-default" : ""}
                                type="button" style={{ marginRight: '.5rem', fontSize: '.8rem' }} color={parseInt(asistencia.estado) == 1 ? "success" : parseInt(asistencia.estado) == 2 ? "warning" : parseInt(asistencia.estado) == 3 ? "danger" : parseInt(asistencia.estado) == 4 ? "default" : parseInt(asistencia.estado) == 5 ? "default" : "info"}>
                                {asistencia.hora}
                              </Badge>
                              <UncontrolledTooltip
                                delay={0}
                                placement="top"
                                target={`tooltip_in_se_${key}`}
                              >
                                {parseInt(asistencia.estado) == 1 ? "Normal" : parseInt(asistencia.estado) == 2 ? "Tardanza" : parseInt(asistencia.estado) == 3 ? "Falta" : parseInt(asistencia.estado) == 4 ? "Salió temprano" : parseInt(asistencia.estado) == 5 ? "Compensó" : "Vacaciones"}
                              </UncontrolledTooltip>
                            </td>
                            <td className="text-center">
                              {parseInt(asistencia.estado) == 2 ?
                                asistencia.calc==0 ?
                                "-" :
                                Math.abs(asistencia.calc)>60 ? Math.round(Math.abs(asistencia.calc)/60)+"h " + Math.round(Math.abs(asistencia.calc)%60)+"min": Math.round(Math.abs(asistencia.calc))+"min"
                              :
                              "-"
                            }
                            </td>
                            <td className="text-center">
                              {parseInt(asistencia.estado) == 5 ?
                                asistencia.calc==0 ?
                                "-" :
                                Math.abs(asistencia.calc)>60 ? Math.round(Math.abs(asistencia.calc)/60)+"h " + Math.round(Math.abs(asistencia.calc)%60)+"min": Math.round(Math.abs(asistencia.calc))+"min"
                              :
                              "-"
                            }
                            </td>
                            <td className="text-center">
                              {parseInt(asistencia.estado) == 3 ?
                                asistencia.calc==0 ?
                                "-" :
                                Math.abs(asistencia.calc)>60 ? Math.round(Math.abs(asistencia.calc)/60)+"h " + Math.round(Math.abs(asistencia.calc)%60)+"min": Math.round(Math.abs(asistencia.calc))+"min"
                              :
                              "-"
                            }
                            </td>
                            <td className="text-center">
                              {parseInt(asistencia.estado) == 4 ?
                                asistencia.calc==0 ?
                                "-" :
                                Math.abs(asistencia.calc)>60 ? Math.round(Math.abs(asistencia.calc)/60)+"h " + Math.round(Math.abs(asistencia.calc)%60)+"min": Math.round(Math.abs(asistencia.calc))+"min"
                              :
                              "-"
                            }
                            </td>
                            <td className="text-center">
                              {asistencia.observacion == null ? "-" : asistencia.observacion}
                            </td>
                            <td className="text-center">
                              {asistencia.justificacion == null ?
                                asistencia.fecha >= maxdatejustification &&
                                  (
                                    (parseInt(asistencia.tipo) == 1 && (parseInt(asistencia.estado) == 2 || parseInt(asistencia.estado) == 3))
                                    ||
                                    (parseInt(asistencia.tipo) == 2 && parseInt(asistencia.estado) == 4)
                                  )
                                  ?
                                  <Button onClick={() => { setidAssistance(asistencia.idAsistencia); toggleModalJustify(); }} className="mt-2" block color="warning" size="sm" type="button">
                                    Justificar
                                  </Button>
                                  : "-"
                                : asistencia.justificacion}
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
                        totalItems={myAssistanceDetailList?.meta?.total ? myAssistanceDetailList?.meta?.total : 0}
                        pageSize={10}
                        onSelect={(selectedPage) => setPageDetail(selectedPage)}
                      />
                    </nav>
                  </CardFooter>
                </TabPane>
              </TabContent>
            </Card>
          </div>
        </Row>
      </Container>
      <Justify setjustificacion={setjustificacion} justificacion={justificacion} showJustify={showJustify} toggleModal={toggleModalJustify} setSendJustification={setSendJustification} />
    </>
  );
};

export default Asistencia;
