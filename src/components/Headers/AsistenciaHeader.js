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
            <Row className="mx-1">
              <Col lg="6" xl="3" className="mb-4 mb-xl-0 px-0 pr-2">
                <Card className="card-stats h-100">
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
              <Col lg="6" xl="3" className="mb-4 mb-xl-0 px-0 pr-2">
                <Card className="card-stats h-100">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Debe
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {tardanzas}
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
              <Col lg="6" xl="3" className="mb-4 mb-xl-0 px-0 pr-2">
                <Card className="card-stats h-100">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          H. extra
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {
                          hCompensar 
                          }
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
              <Col lg="6" xl="3" className="px-0">
                <Card className="card-stats h-100">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          {hRealizadas[0] !== "-" ? "Extra" : "Debe"}
                        </CardTitle>
                        <span className="h2 font-weight-b
                        old mb-0">
                          {
                          hRealizadas[0] !== "-" ? hRealizadas : hRealizadas.substring(1,hRealizadas.length)
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
