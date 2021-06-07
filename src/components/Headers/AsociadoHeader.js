import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { indicators } from "../../redux/actions/Asociado";

// reactstrap components
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";

const Header = () => {
  const dispatch = useDispatch();
  const {associatedIndicators,associatedStatusActions} = useSelector(({ asociado }) => asociado);

  useEffect(() => {
      dispatch(indicators());
  }, [dispatch]);

  useEffect(() => {
    if (associatedStatusActions === 200) {
      dispatch(indicators());
    }
  }, [associatedStatusActions,dispatch]);

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
                          Asociados
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {
                            associatedIndicators?.associateds
                          }
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-primary text-white rounded-circle shadow">
                          <i className="fas fas fa-users" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-success mr-2 d-none">
                        <i className="fa fa-arrow-up" /> 10
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
                          Afiliaciones
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {
                            associatedIndicators?.afiliations
                          }
                          </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-success text-white rounded-circle shadow">
                          <i className="fas fa-percent" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-success mr-2 d-none">
                        <i className="fas fa-arrow-up" /> 12%
                      </span>{" "}
                      <span className="text-nowrap">El último mes</span>
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
                          Retiros
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{
                            associatedIndicators?.retreats
                          }</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                          <i className="fas fa-chart-pie" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-danger mr-2">
                        <i className="fas fa-arrow-down" /> {
                            associatedIndicators?.retreatsActualMonth
                          }
                      </span>{" "}
                      <span className="text-nowrap">El último mes</span>
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
                          En proceso
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{
                            associatedIndicators?.inProcess
                          }</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                          <i className="fas fa-clock" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-warning mr-2 d-none">
                        <i className="fas fa-arrow-down" /> 1.10%
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

export default Header;
