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

const NuevoAsociado = () => {
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
                    <h3 className="mb-0">Nuevo asociado</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col lg="12">
                      <h6 className="heading-small text-muted mb-4">
                        Asociado
                  </h6>
                      <div className="pl-lg-4">
                        <Row>
                          <Col lg="4">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-address"
                              >
                                Promotor
                          </label>
                              <SearchPromotor searched={promotorSearched} setSearched={setPromotorSearched} />
                            </FormGroup>
                          </Col>
                          <Col lg="4">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-address"
                              >
                                Comité gremial*
                          </label>
                              <SearchComiteGremial searched={promotorSearched} setSearched={setPromotorSearched} />
                            </FormGroup>
                          </Col>
                          <Col lg="4">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-address"
                              >
                                Tipo de asociado*
                          </label>
                              <Select
                                placeholder="Seleccione..."
                                className="select-style"
                                name="typeAsociado"
                                onChange={(inputValue, actionMeta) => {
                                  setTypeAssociated(inputValue.value);
                                }}
                                options={[{ value: 1, label: "Empresa" }, { value: 2, label: "Persona" }]} />
                            </FormGroup>
                          </Col>
                          <Col lg="8">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-address"
                              >
                                Dirección social
                          </label>
                              <Input
                                className="form-control-alternative"
                                id="input-socialAddress"
                                name="socialAddress"
                                type="text"
                              />
                            </FormGroup>
                          </Col>
                          <Col lg="4">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-address"
                              >
                                Importe mensual*
                          </label>
                              <InputGroup className="input-group-alternative mb-4">
                                <InputGroupAddon addonType="prepend">
                                  <InputGroupText>
                                    S/.
                              </InputGroupText>
                                </InputGroupAddon>
                                <Input
                                  className="form-control-alternative"
                                  type="number"
                                />
                              </InputGroup>
                            </FormGroup>
                          </Col>
                        </Row>
                      </div>
                    </Col>
                    {
                      typeAssociated == 1 ?
                        <Company />
                        :
                        typeAssociated == 2 ?
                          <Person />
                          :
                          ""
                    }
                  </Row>

                  {
                    typeAssociated == null ?
                    ""
                    :
                    <div className="text-center mt-5">
                      <Button className="my-4 btn-block" color="primary" type="submit">
                        Registrar
                      </Button>
                    </div>
                  }
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
                <Button className="btn-icon d-none" size="sm" color="primary" type="button">
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
                <Button className="btn-icon d-none" size="sm" color="primary" type="button">
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

export default NuevoAsociado;
