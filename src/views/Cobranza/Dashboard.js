import React, { useState, useEffect } from "react";
import classnames from "classnames";
import Chart from "chart.js";
import { Line, Bar, HorizontalBar,Pie } from "react-chartjs-2";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
} from "reactstrap";
import BySector from "components/Tables/BySector";

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
  chartExample3,
  chartExample4
} from "variables/charts.js";

import { useDispatch, useSelector } from "react-redux";
import { loadDashboard, listbysector } from "../../redux/actions/Cuenta";
const months=['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
const Index = (props) => {
  const dispatch = useDispatch();
  const { billDashboard, billListBySector } = useSelector(({ cuenta }) => cuenta);
  const [currentmonth, setcurrentmonth] = useState(months[new Date().getMonth()])

  const [since, setsince] = useState(`${new Date().getFullYear()}-${new Date().getMonth()+1<10 ? '0'+(new Date().getMonth()+1) : new Date().getMonth()+1}-01`);
  const [until, setuntil] = useState(`${new Date().getFullYear()}-${new Date().getMonth()+1<10 ? '0'+(new Date().getMonth()+1) : new Date().getMonth()+1}-${new Date(new Date().getFullYear(), new Date().getMonth()+1, 0).getDate()}`);
  
  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  useEffect(() => {
    dispatch(loadDashboard());
  }, [])

  return (
    <>
      <div className="header pb-8 pt-5 pt-lg-8 pt-md-8  d-flex align-items-center">
        <span className="mask bg-gradient-info opacity-8" />
      </div>
      {/* Page content */}
      <Container className="mt--9" fluid>
        <Row>
          <Col className="mb-5 mb-xl-0" xl="8">
            <Card className="bg-gradient-default shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-light ls-1 mb-1">
                      Información general serie 109
                    </h6>
                    <h2 className="text-white mb-0">Ingresos {new Date().getFullYear()}</h2>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                {/* Chart */}
                <div className="chart">
                  {
                    billDashboard?.line ? 
                    <Line
                      data={{
                        labels: billDashboard?.line?.map(a => ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", 'Sep', 'Oct', 'Nov', 'Dic'][a.mes - 1]),
                        datasets: [
                          {
                            label: "Performance",
                            data: billDashboard?.line?.map(a => a.monto),
                            lineTension: 0.1,
                            pointBorderColor: "#fff",
                            pointBorderWidth: 1,
                            pointHoverRadius: 5,
                            pointHoverBorderWidth: 2,
                            pointRadius: 1,
                            pointHitRadius: 10,
                          },
                        ],
                      }}
                      options={{...chartExample1.options,
                        onClick: (evt, element) => {
                          if (element.length > 0) {
                            var ind = element[0]._index;
                            setcurrentmonth(months[ind])
                            setsince(
                              `${new Date().getFullYear()}-${ind+1<10 ? '0'+(ind+1) : ind+1}-01`
                            );
                            setuntil(
                              `${new Date().getFullYear()}-${ind+1<10 ? '0'+(ind+1) : ind+1}-${new Date(new Date().getFullYear(), ind+1, 0).getDate()}`
                            );
                            dispatch(loadDashboard({
                              mes: ind
                            }));
                          }
                        },}}
                    />
                    :
                    ""
                  }
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xl="4">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-muted ls-1 mb-1">
                      Distribución por cobrador
                    </h6>
                    <h2 className="mb-0">Emisiones {currentmonth}</h2>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                {/* Chart */}
                <div className="chart">
                  {
                    billListBySector?.cuentas ? 
                    <HorizontalBar
                      data={{
                        labels:  billListBySector?.cuentas?.map(a => a.descripcion),
                        datasets: [
                          {
                            label: 'Pendiente',
                            data:  billListBySector?.cuentas?.map(a => a.emitidos - a.cobradoMesActual),
                            backgroundColor: '#ffcc29',
                        },
                        {
                          label: 'Cobrado',
                        data:  billListBySector?.cuentas?.map(a => a.cobradoMesActual),
                        backgroundColor: '#2dce89',
                        }
                      ]
                      }}
                      options={chartExample4.options}
                    />
                  :
                  ""
                }
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col className="mb-5 mb-xl-0" xl="12">
            <BySector since={since} until={until} />
          </Col>
          <Col>
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-muted ls-1 mb-1">
                      Distribución
                    </h6>
                    <h2 className="mb-0">Ingresos de {currentmonth}</h2>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                {/* Chart */}
                <div className="chart">
                  {
                    billDashboard?.bars ? 
                    <Bar
                      data={{
                        labels: billDashboard?.bars?.map(a => a.comite),
                        datasets: [{
                          data: billDashboard?.bars?.map(a => a.monto),
                        }]
                      }}
                      options={chartExample1.options}
                    />
                  :
                  ""
                }
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Index;
