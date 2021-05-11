import React, { useState, useEffect } from "react";
import classnames from "classnames";
import Chart from "chart.js";
import { Line, Bar, Pie } from "react-chartjs-2";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
} from "reactstrap";

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
} from "variables/charts.js";

import { useDispatch, useSelector } from "react-redux";
import { loadDashboard } from "../../redux/actions/Caja";
import Loading from "../../components/Loaders/LoadingSmall";

const Index = (props) => {
  const dispatch = useDispatch();
  const { cajaDashboard } = useSelector(({ caja }) => caja);
  const { loading } = useSelector(({ commonData }) => commonData);
  const [currentmonth, setcurrentmonth] = useState(['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'][new Date().getMonth()])

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
                      Información general serie 108
                    </h6>
                    <h2 className="text-white mb-0">Ingresos {new Date().getFullYear()}</h2>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                {/* Chart */}
                <div className="chart">
                  {
                    cajaDashboard?.line ? 
                    <Line
                      data={{
                        labels: cajaDashboard?.line?.map(a => ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", 'Sep', 'Oct', 'Nov', 'Dic'][a.mes - 1]),
                        datasets: [
                          {
                            label: "Performance",
                            data: cajaDashboard?.line?.map(a => a.monto),
                          },
                        ],
                      }}
                      options={chartExample1.options}
                      getDatasetAtEvent={(e) => console.log(e)}
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
                      Distribución
                    </h6>
                    <h2 className="mb-0">Ingresos {new Date().getFullYear()} por área</h2>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                {/* Chart */}
                <div className="chart">
                  {
                    cajaDashboard?.bars ? 
                  <Pie
                    data={{
                      labels: cajaDashboard?.bars?.map(a => a.area),
                      datasets: [{
                        data: cajaDashboard?.bars?.map(a => Math.round(a.monto/cajaDashboard?.bars.reduce((a, b) => a + b.monto, 0)*100)),
                        borderWidth: 1,
                        backgroundColor: ['#04009a', '#77acf1', '#1cc5dc', '#02475e', '#7b6079'],
                      }]
                    }}
                    options={{
                      responsive: true,
                      plugins: {
                        legend: {
                          position: 'top',
                        },
                      },
                      tooltips: {
                        callbacks: {
                          label: function(tooltipItem, data) {
                            var dataset = data.datasets[tooltipItem.datasetIndex];
                            var currentValue = dataset.data[tooltipItem.index];
                      
                            return currentValue + "%";
                          },
                          title: function(tooltipItem, data) {
                            return data.labels[tooltipItem[0].index];
                          }
                        }
                      } 
                    }}
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
          <Col className="mb-5 mb-xl-0" xl="8">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Resumen {currentmonth}</h3>
                  </div>
                </Row>
              </CardHeader>
              {
                !loading && cajaDashboard.tableCurrent ?
                  <>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Área</th>
                    <th scope="col" className="text-right">Emitido</th>
                    <th scope="col" className="text-right">Cobrado</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    cajaDashboard?.tableCurrent?.map((current, key) =>
                      <tr key={key}>
                        <th scope="row">{current.area}</th>
                        <th className="text-right">{'S/. ' + current.monto.toLocaleString('en-US', {
                          minimumFractionDigits: 0
                        })}</th>
                        <th className="text-right">{'S/. ' + cajaDashboard?.currentPaidMonthBars[key]?.monto.toLocaleString('en-US', {
                          minimumFractionDigits: 0
                        })}</th>
                      </tr>)
                  }
                </tbody>
              </Table>
              </>              
                  :
                <Loading />
              }
            </Card>
          </Col>
          <Col xl="4">
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
                  <Bar
                    data={{
                      labels: cajaDashboard?.currentPaidMonthBars?.sort((a, b) => a.monto > b.monto ? - 1 : Number(a.monto < b.monto)).map(a => a.area),
                      datasets: [{
                        data: cajaDashboard?.currentPaidMonthBars?.sort((a, b) => a.monto > b.monto ? - 1 : Number(a.monto < b.monto)).map(a => a.monto),
                      }]
                    }}
                    options={chartExample1.options}
                  />
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
