import React from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";;

const RegistroLlamada = () => {
  return (
    <>
      <div className="header pb-8 pt-5 pt-lg-8 pt-md-8  d-flex align-items-center">
        <span className="mask bg-gradient-info opacity-8" />
      </div>
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-1" xl="12">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <div className="d-flex justify-content-between">
                          <Col lg="6">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-address"
                              >
                                Asociado
                              </label>
                              <Input
                                className="form-control-alternative"
                                id="input-postal-code"
                                type="text"
                                value={"PRODUCTOS LACTEOS NATURALES S.A.C."}
                                disabled
                              />
                            </FormGroup>
                          </Col>
                          <Col lg="2">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-address"
                              >
                                Sector
                              </label>
                              <Input
                                className="form-control-alternative"
                                id="input-postal-code"
                                type="text"
                                value={"2"}
                                disabled
                              />
                            </FormGroup>
                          </Col>
                          <Col lg="4">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-address"
                              >
                                Cobrador
                              </label>
                              <Input
                                className="form-control-alternative"
                                id="input-postal-code"
                                type="text"
                                value={"JAVIER MAZA"}
                                disabled
                              />
                            </FormGroup>
                          </Col>
                </div>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col lg="12">
                      <h6 className="heading-small text-muted mb-4">
                        Llamada
                  </h6>
                      <div className="pl-lg-4">
                        <Row>
                          <Col lg="4">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-address"
                              >
                                Fecha
                              </label>
                              <Input
                                className="form-control-alternative"
                                id="input-postal-code"
                                type="date"
                              />
                            </FormGroup>
                          </Col>
                          <Col lg="4">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-address"
                              >
                                Hora inicio
                              </label>
                              <Input
                                className="form-control-alternative"
                                id="input-postal-code"
                                type="time"
                              />
                            </FormGroup>
                          </Col>
                          <Col lg="4">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-address"
                              >
                                Hora fin
                              </label>
                              <Input
                                className="form-control-alternative"
                                id="input-postal-code"
                                type="time"
                              />
                            </FormGroup>
                          </Col>
                          <Col lg="12">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-address"
                              >
                                Detalle
                          </label>
                              <Input
                                className="form-control-alternative"
                                id="input-socialAddress"
                                name="socialAddress"
                                type="text"
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                      </div>
                    </Col>
                  </Row>
                  <div className="text-center ">
                    <Button className="my-4 " color="primary" type="submit">
                      Registrar
                      </Button>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default RegistroLlamada;
