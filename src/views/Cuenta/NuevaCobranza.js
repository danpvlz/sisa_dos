import React, { useState } from "react";

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
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";
import Select from 'react-select';
// core components
import SearchPromotor from "components/Selects/SearchPromotor.js";
import SearchComiteGremial from "components/Selects/SearchComiteGremial.js";

const NuevaEmision = () => {
  const [promotorSearched, setPromotorSearched] = useState(undefined);
  const [typeAssociated, setTypeAssociated] = useState(null);
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
                <Row className="align-items-center">
                  <Col xs="12">
                    <h3 className="mb-0">Nueva emisión</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col lg="12">
                      <h6 className="heading-small text-muted mb-4">
                        Cuenta
                      </h6>
                      <div className="pl-lg-4">
                        <Row>
                          <Col lg="6">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-address"
                              >
                                Asociado
                          </label>
                              <SearchPromotor searched={promotorSearched} setSearched={setPromotorSearched} />
                            </FormGroup>
                          </Col>
                          <Col lg="3">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-address"
                              >
                                Tipo de documento
                          </label>
                              <Select
                                placeholder="Seleccione..."
                                className="select-style"
                                name="typeAsociado"
                                onChange={(inputValue, actionMeta) => {
                                  setTypeAssociated(inputValue.value);
                                }}
                                options={[{ value: 1, label: "Factura" }, { value: 2, label: "Boleta" }]} />
                            </FormGroup>
                          </Col>
                          <Col lg="3">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-address"
                              >
                                Fecha emisión
                          </label>
                              <Input
                                className="form-control-alternative"
                                id="input-socialAddress"
                                name="socialAddress"
                                type="date"
                              />
                            </FormGroup>
                          </Col>
                          <Col lg="3">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-address"
                              >
                                ¿Pagado?
                          </label>
                              <Select
                                placeholder="Seleccione..."
                                className="select-style"
                                name="typeAsociado"
                                onChange={(inputValue, actionMeta) => {
                                  setTypeAssociated(inputValue.value);
                                }}
                                options={[{ value: 1, label: "Sí" }, { value: 3, label: "No" }]} />
                            </FormGroup>
                          </Col>
                          <Col lg="3">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-address"
                              >
                                Fecha pago
                          </label>
                              <Input
                                className="form-control-alternative"
                                id="input-socialAddress"
                                name="socialAddress"
                                type="date"
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                      </div>

                      <hr className="my-4 " />
                    </Col>
                    <Col lg="12 ">
                      <h6 className="heading-small text-muted mb-4">
                        Detalle
                      </h6>
                      <div className="pl-lg-4">
                        <Row>
                          <Col lg="5">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-address"
                              >
                                Concepto
                          </label>
                              <SearchPromotor searched={promotorSearched} setSearched={setPromotorSearched} />
                            </FormGroup>
                          </Col>
                          <Col lg="2">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-address"
                              >
                                Cantidad
                          </label>
                              <Input
                                className="form-control-alternative text-center"
                                id="input-socialAddress"
                                name="socialAddress"
                                type="number"
                                min="0"
                              />
                            </FormGroup>
                          </Col>
                          <Col lg="5">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-address"
                              >
                                Meses
                          </label>

                              <Select
                                className="select-style select-multiple-height"
                                isMulti
                                name="months"
                                options={[{ 'value': 1, 'label': 'Enero' },
                                { 'value': 2, 'label': 'Febrero' },
                                { 'value': 3, 'label': 'Marzo' },
                                { 'value': 4, 'label': 'Abril' },
                                { 'value': 5, 'label': 'Mayo' },
                                { 'value': 6, 'label': 'Junio' },
                                { 'value': 7, 'label': 'Julio' },
                                { 'value': 8, 'label': 'Agosto' },
                                { 'value': 9, 'label': 'Setiembre' },
                                { 'value': 10, 'label': 'Octubre' },
                                { 'value': 11, 'label': 'Noviembre' },
                                { 'value': 12, 'label': 'Diciembre' },
                                ]}
                                classNamePrefix="select"
                              />
                            </FormGroup>
                          </Col>
                          <Col>
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-address"
                              >
                                Observación
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
                  <div className="text-center mt-5">
                    <Button className="my-4 btn-block" color="primary" type="submit">
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

const Person = () => {
  return (<>
    <Col lg="12">
      <hr className="my-4 " />
      <h6 className="heading-small text-muted mb-4">
        Persona
      </h6>
      <div className="pl-lg-4">
        <Row>
          <Col lg="3">
            <FormGroup>
              <label
                className="form-control-label"
                htmlFor="input-address"
              >
                Tipo de documento*
              </label>
              <Select
                placeholder="Seleccione..."
                className="select-style"
                name="typeAsociado"
                onChange={(inputValue, actionMeta) => {
                  console.log(inputValue.value);
                }}
                options={[{ value: 1, label: "DNI" }, { value: 2, label: "RUC" }, { value: 3, label: "Carnet de extranjería" }]} />
            </FormGroup>
          </Col>
          <Col lg="3">
            <FormGroup>
              <label
                className="form-control-label"
                htmlFor="input-country"
              >
                Documento*
              </label>
              <div className="d-flex">
                <Input
                  className="form-control-alternative"
                  id="input-postal-code"
                  type="tel"
                />
                <Button className="btn-icon" size="sm" color="primary" type="button">
                  <span>
                    <i className="fa fa-search" />
                  </span>
                </Button>
              </div>
            </FormGroup>
          </Col>
          <Col lg="12">
            <Row >
              <Col lg="4">
                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="input-country"
                  >
                    Nombres*
                  </label>
                  <Input
                    className="form-control-alternative"
                    id="input-country"
                    type="text"
                  />
                </FormGroup>
              </Col>
              <Col lg="4">
                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="input-country"
                  >
                    Apellido paterno*
                  </label>
                  <Input
                    className="form-control-alternative"
                    id="input-postal-code"
                    type="text"
                  />
                </FormGroup>
              </Col>
              <Col lg="4">
                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="input-country"
                  >
                    Apellido materno*
                  </label>
                  <Input
                    className="form-control-alternative"
                    id="input-postal-code"
                    type="text"
                  />
                </FormGroup>
              </Col>
            </Row>
          </Col>
          <Col lg="3">
            <FormGroup>
              <label
                className="form-control-label"
                htmlFor="input-address"
              >
                Sexo*
              </label>
              <Select
                placeholder="Seleccione..."
                className="select-style"
                name="sexo"
                onChange={(inputValue, actionMeta) => {
                  console.log(inputValue.value);
                }}
                options={[{ value: 1, label: "Hombre" }, { value: 2, label: "Mujer" }]} />
            </FormGroup>
          </Col>
          <Col lg="3">
            <FormGroup>
              <label
                className="form-control-label"
                htmlFor="input-country"
              >
                Fecha de nacimiento*
              </label>
              <Input
                className="form-control-alternative"
                id="input-postal-code"
                type="date"
              />
            </FormGroup>
          </Col>
          <Col lg="6">
            <FormGroup>
              <label
                className="form-control-label"
                htmlFor="input-country"
              >
                Dirección fiscal*
              </label>
              <Input
                className="form-control-alternative"
                id="input-postal-code"
                type="text"
              />
            </FormGroup>
          </Col>
          <Col lg="6">
            <FormGroup>
              <label
                className="form-control-label"
                htmlFor="input-country"
              >
                Actividad/Profesión*
              </label>
              <Input
                className="form-control-alternative"
                id="input-postal-code"
                type="text"
              />
            </FormGroup>
          </Col>
          <Col lg="3">
            <FormGroup>
              <label
                className="form-control-label"
                htmlFor="input-country"
              >
                Teléfono
                </label>
              <div className="d-flex">
                <Input
                  className="form-control-alternative"
                  id="input-postal-code"
                  type="tel"
                />
                <Button className="btn-icon" size="sm" color="primary" type="button">
                  <span>
                    <i className="fa fa-plus" />
                  </span>
                </Button>
              </div>
            </FormGroup>
          </Col>
          <Col lg="3">
            <FormGroup>
              <label
                className="form-control-label"
                htmlFor="input-country"
              >
                Correo
                          </label>
              <div className="d-flex">
                <Input
                  className="form-control-alternative"
                  id="input-postal-code"
                  type="email"
                />
                <Button className="btn-icon" size="sm" color="primary" type="button">
                  <span>
                    <i className="fa fa-plus" />
                  </span>
                </Button>
              </div>
            </FormGroup>
          </Col>
        </Row>
      </div>
    </Col>
  </>);
}

const Company = () => {
  return (<>
    <Col lg="12">
      <hr className="my-4 " />
      <h6 className="heading-small text-muted mb-4">
        Empresa
      </h6>
      <div className="pl-lg-4">
        <Row>
          <Col lg="3">
            <FormGroup>
              <label
                className="form-control-label"
                htmlFor="input-ruc"
              >
                RUC*
              </label>
              <div className="d-flex">
                <Input
                  className="form-control-alternative"
                  id="input-ruc"
                  type="text"
                />
                <Button className="btn-icon btn-2" color="primary" type="button">
                  <span className="btn-inner--icon">
                    <i className="fa fa-search" />
                  </span>
                </Button>
              </div>
            </FormGroup>
          </Col>
          <Col lg="4">
            <FormGroup>
              <label
                className="form-control-label"
                htmlFor="input-city"
              >
                Razón social*
              </label>
              <Input
                className="form-control-alternative"
                id="input-city"
                type="text"
              />
            </FormGroup>
          </Col>
          <Col lg="5">
            <FormGroup>
              <label
                className="form-control-label"
                htmlFor="input-country"
              >
                Dirección fiscal*
              </label>
              <Input
                className="form-control-alternative"
                id="input-country"
                type="text"
              />
            </FormGroup>
          </Col>
          <Col lg="3">
            <FormGroup>
              <label
                className="form-control-label"
                htmlFor="input-country"
              >
                Fundación*
              </label>
              <Input
                className="form-control-alternative"
                id="input-postal-code"
                type="date"
              />
            </FormGroup>
          </Col>
          <Col lg="6">
            <FormGroup>
              <label
                className="form-control-label"
                htmlFor="input-country"
              >
                Actividad*
              </label>
              <Input
                className="form-control-alternative"
                id="input-postal-code"
                type="text"
              />
            </FormGroup>
          </Col>
          <Col lg="3">
            <FormGroup>
              <label
                className="form-control-label"
                htmlFor="input-country"
              >
                Teléfono
              </label>
              <div className="d-flex">
                <Input
                  className="form-control-alternative"
                  id="input-postal-code"
                  type="tel"
                />
                <Button className="btn-icon" size="sm" color="primary" type="button">
                  <span>
                    <i className="fa fa-plus" />
                  </span>
                </Button>
              </div>
            </FormGroup>
          </Col>
          <Col lg="3">
            <FormGroup>
              <label
                className="form-control-label"
                htmlFor="input-country"
              >
                Correo
              </label>
              <div className="d-flex">
                <Input
                  className="form-control-alternative"
                  id="input-postal-code"
                  type="email"
                />
                <Button className="btn-icon" size="sm" color="primary" type="button">
                  <span>
                    <i className="fa fa-plus" />
                  </span>
                </Button>
              </div>
            </FormGroup>
          </Col>
        </Row>
      </div>
    </Col>
    <Col lg="12">
      <hr className="my-4 " />
      <h6 className="heading-small text-muted mb-4">
        Representante
      </h6>
      <div className="pl-lg-4">
        <Row>
          <Col lg="3">
            <FormGroup>
              <label
                className="form-control-label"
                htmlFor="input-address"
              >
                Tipo de documento*
              </label>
              <Select
                placeholder="Seleccione..."
                className="select-style"
                name="typeAsociado"
                onChange={(inputValue, actionMeta) => {
                  console.log(inputValue.value);
                }}
                options={[{ value: 1, label: "DNI" }, { value: 2, label: "RUC" }, { value: 3, label: "Carnet de extranjería" }]} />
            </FormGroup>
          </Col>
          <Col lg="3">
            <FormGroup>
              <label
                className="form-control-label"
                htmlFor="input-country"
              >
                Documento*
              </label>
              <div className="d-flex">
                <Input
                  className="form-control-alternative"
                  id="input-postal-code"
                  type="tel"
                />
                <Button className="btn-icon" size="sm" color="primary" type="button">
                  <span>
                    <i className="fa fa-search" />
                  </span>
                </Button>
              </div>
            </FormGroup>
          </Col>
          <Col lg="12">
            <Row >
              <Col lg="4">
                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="input-country"
                  >
                    Nombres*
                  </label>
                  <Input
                    className="form-control-alternative"
                    id="input-country"
                    type="text"
                  />
                </FormGroup>
              </Col>
              <Col lg="4">
                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="input-country"
                  >
                    Apellido paterno*
                  </label>
                  <Input
                    className="form-control-alternative"
                    id="input-postal-code"
                    type="text"
                  />
                </FormGroup>
              </Col>
              <Col lg="4">
                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="input-country"
                  >
                    Apellido materno*
                    </label>
                  <Input
                    className="form-control-alternative"
                    id="input-postal-code"
                    type="text"
                  />
                </FormGroup>
              </Col>
            </Row>

          </Col>
          <Col lg="4">
            <FormGroup>
              <label
                className="form-control-label"
                htmlFor="input-country"
              >
                Cargo*
              </label>
              <Input
                className="form-control-alternative"
                id="input-postal-code"
                type="text"
              />
            </FormGroup>
          </Col>
          <Col lg="3">
            <FormGroup>
              <label
                className="form-control-label"
                htmlFor="input-country"
              >
                Teléfono
                              </label>
              <div className="d-flex">
                <Input
                  className="form-control-alternative"
                  id="input-postal-code"
                  type="tel"
                />
                <Button className="btn-icon" size="sm" color="primary" type="button">
                  <span>
                    <i className="fa fa-plus" />
                  </span>
                </Button>
              </div>
            </FormGroup>
          </Col>
          <Col lg="3">
            <FormGroup>
              <label
                className="form-control-label"
                htmlFor="input-country"
              >
                Correo
                          </label>
              <div className="d-flex">
                <Input
                  className="form-control-alternative"
                  id="input-postal-code"
                  type="email"
                />
                <Button className="btn-icon" size="sm" color="primary" type="button">
                  <span>
                    <i className="fa fa-plus" />
                  </span>
                </Button>
              </div>
            </FormGroup>
          </Col>
        </Row>
      </div>
    </Col>

  </>);
}

export default NuevaEmision;
