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
import React from "react";

// reactstrap components
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";

const AsistenciaHeader = ({ tardanzas, faltas, hRealizadas, hCompensar }) => {
  return (
    <>
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            {/* Card stats */}
            <Row>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Faltas
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {faltas}
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                          <i className="fa fa-calendar-times" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-danger mr-2 d-none">
                        <i className="fas fa-arrow-down" /> 3.48%
                      </span>{" "}
                      <span className="text-nowrap">Total</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Tardanzas
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {tardanzas*-1>60 ? tardanzas*-1%60==0 ? Math.round(tardanzas/60)*-1+"h " : (Math.round(tardanzas/60)*-1+"h " + tardanzas*-1%60+"min") : tardanzas*-1+"min"}
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-orange text-white rounded-circle shadow">
                          <i className="fa fa-clock" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-success mr-2 d-none">
                        <i className="fa fa-arrow-up" /> 3.48%
                      </span>{" "}
                      <span className="text-nowrap">Total</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          H. compensar
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {hCompensar>60 ? hCompensar%60 == 0 ? Math.round(hCompensar/60)+"h" :(Math.round(hCompensar/60)*-1+"h " + hCompensar%60+"min") : hCompensar+"min"}
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-success text-white rounded-circle shadow">
                          <i className="fa fa-address-book" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-success mr-2 d-none">
                        <i className="fas fa-arrow-up"/> 12%
                      </span>{" "}
                      <span className="text-nowrap">Total</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          H. totales
                        </CardTitle>
                        <span className="h2 font-weight-b
                        old mb-0">
                          {
                          hRealizadas>0 ?
                          hRealizadas>60 ? hRealizadas%60 == 0 ? Math.round(hRealizadas/60)+"h" :(Math.round(hRealizadas/60)*-1+"h " + hRealizadas%60+"min") : hRealizadas+"min"
                          :
                          hRealizadas*-1>60 ? hRealizadas*-1%60 == 0 ? Math.round(hRealizadas*-1/60)+"h" :(Math.round(hRealizadas*-1/60)*-1+"h " + hRealizadas*-1%60+"min") : hRealizadas*-1+"min"
                          }
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                          <i className="ni ni-check-bold" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-danger mr-2 d-none">
                        <i className="fas fa-arrow-down"/> 1.10%
                      </span>{" "}
                      <span className="text-nowrap">Total</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

export default AsistenciaHeader;
