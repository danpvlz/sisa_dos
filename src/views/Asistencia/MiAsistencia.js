import React, { useCallback, useState, useEffect } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { myAssistance, myAssistanceDetail, indicators } from "../../redux/actions/Asistencia";

const Asistencia = () => {
  const dispatch = useDispatch();
  const { myAssistanceList, myAssistanceDetailList, assistanceIndicators } = useSelector(({ asistencia }) => asistencia);
  const [page, setPage] = useState(1);
  const [pageDetail, setPageDetail] = useState(1);
  const [search, setsearch] = useState({});
  const [month, setmonth] = useState(null);
  const [showDetail, setShowDetail] = useState(false);

  useEffect(() => {
    let tsearch=search;
    if(month == null){
      delete tsearch.month;
    }else{
      tsearch.month=month;
    }
    setsearch(tsearch);
    dispatch(myAssistance(page,search));
    dispatch(myAssistanceDetail(page,search));
    dispatch(indicators(search));
  }, [month]);

  useEffect(() => {
    dispatch(myAssistance(page,search));
  }, [page]);

  useEffect(() => {
    dispatch(myAssistanceDetail(page,search));
  }, [pageDetail]);

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
        tardanzas={assistanceIndicators?.tardanzas}
        faltas={assistanceIndicators?.faltas}
        hRealizadas={assistanceIndicators?.hRealizadas}
        hCompensar={assistanceIndicators?.hCompensar}/>
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
                              {asistencia.tardanza == 0 ? "-" : asistencia.tardanza < 0 ? (asistencia.tardanza*-1)>60 && (asistencia.tardanza*-1)+"min"  : asistencia.tardanza*-1+"min"}
                            </td>
                            <td className="text-center">
                              {asistencia.compensado == 0 ? "-" : asistencia.compensado < 0 ? (asistencia.compensado*-1)>60 && (asistencia.compensado*-1)+"min"  : asistencia.compensado*-1+"min"}
                            </td>
                            <td className="text-center">
                              {asistencia.falta == 0 ? "-" : asistencia.falta < 0 ? (asistencia.falta*-1)>60 ? (asistencia.falta*-1)+"min"  : asistencia.falta*-1+"min" : asistencia.falta*-1+"min"}
                            </td>
                            <td className="text-center">
                              {asistencia.temp == 0 ? "-" : asistencia.temp < 0 ? (asistencia.temp*-1)>60 ? (asistencia.temp*-1)+"min"  : asistencia.temp*-1+"min" : asistencia.falta*-1+"min"}
                            </td>
                          </tr>
                        )
                      }
                    </tbody>
                  </Table>
              
              <CardFooter className="py-4">
                <nav aria-label="...">
                  {
                    myAssistanceList?.meta?.total > 0 &&
                    <Pagination
                      className="pagination justify-content-end mb-0"
                      listClassName="justify-content-end mb-0"
                    >
                      {
                        page > 1 &&
                        <PaginationItem className="disabled">
                          <PaginationLink
                            onClick={(e) => { e.preventDefault(); setPage(page - 1) }}
                            tabIndex="-1"
                          >
                            <i className="fas fa-angle-left" />
                            <span className="sr-only">Previous</span>
                          </PaginationLink>
                        </PaginationItem>
                      }
                      {
                        Array.from({ length:  myAssistanceList?.meta?.last_page>5 ? 5 :   myAssistanceList?.meta?.last_page}, (_, i) => i + 1).map((cpage, key) =>
                          <PaginationItem key={key} className={page === cpage ? "active" : "inactive"}>
                            <PaginationLink
                              onClick={(e) => { e.preventDefault(); setPage(cpage) }}
                            >
                              {cpage}
                            </PaginationLink>
                          </PaginationItem>)
                      }
                      {
                        page <  myAssistanceList?.meta?.last_page &&
                        <PaginationItem>
                          <PaginationLink
                            onClick={(e) => { e.preventDefault(); setPage(page + 1) }}
                          >
                            <i className="fas fa-angle-right" />
                            <span className="sr-only">Next</span>
                          </PaginationLink>
                        </PaginationItem>
                      }
                    </Pagination>
                  }
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
                              {asistencia.tipo==1 ? "Entrada" : "Salida"}
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
                              {parseInt(asistencia.estado) == 2 ?  asistencia.calc*-1>60 ? asistencia.calc*-1+"min" : asistencia.calc*-1+"min" : "-"}
                            </td>
                            <td className="text-center">
                              {parseInt(asistencia.estado) == 5 ?  asistencia.calc>60 ? asistencia.calc+"min" : asistencia.calc+"min" : "-"}
                            </td>
                            <td className="text-center">
                              {parseInt(asistencia.estado) == 3 ?  asistencia.calc*-1>60 ? asistencia.calc*-1+"min" : asistencia.calc*-1+"min" : "-"}
                            </td>
                            <td className="text-center">
                              {parseInt(asistencia.estado) == 4 ?  asistencia.calc*-1>60 ? asistencia.calc*-1+"min" : asistencia.calc*-1+"min" : "-"}
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
                <nav aria-label="...">
                  {
                    myAssistanceDetailList?.meta?.total > 0 &&
                    <Pagination
                      className="pagination justify-content-end mb-0"
                      listClassName="justify-content-end mb-0"
                    >
                      {
                        pageDetail > 1 &&
                        <PaginationItem className="disabled">
                          <PaginationLink
                            onClick={(e) => { e.preventDefault(); setPage(setPageDetail - 1) }}
                            tabIndex="-1"
                          >
                            <i className="fas fa-angle-left" />
                            <span className="sr-only">Previous</span>
                          </PaginationLink>
                        </PaginationItem>
                      }
                      {
                        Array.from({ length:  myAssistanceDetailList?.meta?.last_page>5 ? 5 :   myAssistanceDetailList?.meta?.last_page}, (_, i) => i + 1).map((cpage, key) =>
                          <PaginationItem key={key} className={pageDetail === cpage ? "active" : "inactive"}>
                            <PaginationLink
                              onClick={(e) => { e.preventDefault(); setPageDetail(cpage) }}
                            >
                              {cpage}
                            </PaginationLink>
                          </PaginationItem>)
                      }
                      {
                        pageDetail <  myAssistanceDetailList?.meta?.last_page &&
                        <PaginationItem>
                          <PaginationLink
                            onClick={(e) => { e.preventDefault(); setPageDetail(pageDetail + 1) }}
                          >
                            <i className="fas fa-angle-right" />
                            <span className="sr-only">Next</span>
                          </PaginationLink>
                        </PaginationItem>
                      }
                    </Pagination>
                  }
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
