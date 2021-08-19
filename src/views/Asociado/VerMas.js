import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";
// core components
import { useDispatch, useSelector } from "react-redux";
import { showEditAssociated, resetEditAssociated } from "../../redux/actions/Asociado";

const EditarAsociado = (props) => {
  const dispatch = useDispatch();
  const { associatedEditObject } = useSelector(({ asociado }) => asociado);
  const [typeAssociated, setTypeAssociated] = useState(null);

  const history = useHistory();

  useEffect(() => {
    if (props?.match?.params?.id) {
      resetEditAssociated();
      dispatch(showEditAssociated(props.match.params.id));
    } else {
      history.push('/');
    }
  }, [props.match.params.id, history, dispatch]);

  useEffect(() => {
    associatedEditObject.asociado && setTypeAssociated(associatedEditObject.asociado.tipoAsociado);
    return () => {
      setTypeAssociated(null);
    }
  }, [associatedEditObject.asociado]);

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
                    <h3 className="mb-0">Más información</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form id="form-save-associated">
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
                              <Input
                                value={associatedEditObject.promotor?.nombresCompletos}
                                readOnly
                              />
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
                              <Input
                                value={associatedEditObject.comite?.nombre}
                                readOnly
                              />
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
                              <Input
                                value={
                                  associatedEditObject.asociado?.tipoAsociado === 1 ? "Empresa" : associatedEditObject.asociado?.tipoAsociado === 2 ? "Persona" : null
                                }
                                readOnly
                              />
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
                                name="direccionsocial"
                                value={associatedEditObject?.asociado?.direccionSocial}
                                readOnly
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
                              <Input
                                value={'S/.' + associatedEditObject.asociado?.importeMensual}
                                readOnly
                              />
                            </FormGroup>
                          </Col>
                          <Col lg="4">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-address"
                              >
                                Sector*
                              </label>
                              <Input
                                value={`${associatedEditObject?.sector?.descripcion} (${associatedEditObject?.sector?.codigo})`}
                                readOnly
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                      </div>
                    </Col>
                    {
                      typeAssociated === 1 ?
                        <>
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
                                        type="text"
                                        name="ruc"
                                        value={associatedEditObject?.empresa?.ruc}
                                        readOnly
                                      />
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
                                      type="text"
                                      name="razonsocial"
                                      value={associatedEditObject?.empresa?.razonSocial}
                                      readOnly
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
                                      type="text"
                                      name="direccionfiscal"
                                      value={associatedEditObject?.empresa?.direccion}
                                      readOnly
                                    />
                                  </FormGroup>
                                </Col>
                                <Col lg="3">
                                  <FormGroup>
                                    <label
                                      className="form-control-label"
                                      htmlFor="input-country"
                                    >
                                      Fundación
                                    </label>
                                    <Input
                                      className="form-control-alternative"
                                      type="date"
                                      name="fundacion"
                                      value={associatedEditObject?.empresa?.fundacion}
                                      readOnly
                                    />
                                  </FormGroup>
                                </Col>
                                <Col lg="4">
                                  <FormGroup>
                                    <label
                                      className="form-control-label"
                                      htmlFor="input-country"
                                    >
                                      Actividad*
                                    </label>
                                    <Input
                                      className="form-control-alternative"
                                      type="text"
                                      name="actividad"
                                      value={associatedEditObject?.empresa?.actividad}
                                      readOnly
                                    />
                                  </FormGroup>
                                </Col>
                                <Col lg="4">
                                  <FormGroup>
                                    <label
                                      className="form-control-label"
                                      htmlFor="input-country"
                                    >
                                      Actividad secundaria
                                    </label>
                                    <Input
                                      className="form-control-alternative"
                                      type="text"
                                      name="actividad_secundaria"
                                      value={associatedEditObject?.empresa?.actividadSecundaria}
                                      readOnly
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
                                    <Input
                                      className="form-control-alternative"
                                      type="tel"
                                      name="telefono_asociado"
                                      readOnly
                                      value={associatedEditObject?.empresa?.telefonos}
                                    />
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
                                    <Input
                                      className="form-control-alternative"
                                      type="email"
                                      name="correo_asociado"
                                      readOnly
                                      value={associatedEditObject?.empresa?.correos}
                                    />
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
                                    <Input readOnly
                                      value={associatedEditObject?.representante?.tipoDoc === 1 ? "DNI" : associatedEditObject?.representante?.tipoDoc === 6 ? "RUC" : associatedEditObject?.representante?.tipoDoc === 6 ? "Carnet de extranjería" : associatedEditObject?.representante?.tipoDoc === 4 ? "Pasaporte" : ""}
                                    />
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
                                        type="tel"
                                        name="documento_representante"
                                        value={associatedEditObject?.representante?.documento}
                                        readOnly
                                      />
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
                                          type="text"
                                          name="nombres_representante"
                                          value={associatedEditObject?.representante?.nombres}
                                          readOnly
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
                                          type="text"
                                          name="paterno_representante"
                                          value={associatedEditObject?.representante?.apellidoPaterno}
                                          readOnly
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
                                          type="text"
                                          name="materno_representante"
                                          value={associatedEditObject?.representante?.apellidoMaterno}
                                          readOnly
                                        />
                                      </FormGroup>
                                    </Col>
                                  </Row>

                                </Col>

                                <Col lg="3">
                                  <FormGroup>
                                    <label
                                      className="form-control-label"
                                      htmlFor="input-country"
                                    >
                                      Fecha de nacimiento
                                    </label>
                                    <Input
                                      className="form-control-alternative"
                                      type="date"
                                      name="fechanacimiento_representante"
                                      value={associatedEditObject?.representante?.fechaNacimiento}
                                      readOnly
                                    />
                                  </FormGroup>
                                </Col>
                                <Col lg="3">
                                  <FormGroup>
                                    <label
                                      className="form-control-label"
                                      htmlFor="input-country"
                                    >
                                      Cargo*
                                    </label>
                                    <Input
                                      className="form-control-alternative"
                                      type="text"
                                      name="cargo_representante"
                                      value={associatedEditObject?.representante?.cargo}
                                      readOnly
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
                                    <Input
                                      className="form-control-alternative"
                                      type="tel"
                                      name="telefono_representante"
                                      readOnly
                                      value={associatedEditObject?.representante?.telefonos}
                                    />
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
                                    <Input
                                      className="form-control-alternative"
                                      type="email"
                                      name="correo_representante"
                                      readOnly
                                      value={associatedEditObject?.representante?.email}
                                    />
                                  </FormGroup>
                                </Col>
                              </Row>
                            </div>
                          </Col>
                          <Col lg="12">
                            <hr className="my-4 " />
                            <h6 className="heading-small text-muted mb-4">
                              Contacto adicional <strong className="text-danger">(opcional)</strong>
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
                                    <Input
                                      readOnly
                                      value={
                                        associatedEditObject?.adicional?.tipoDoc === 1 ? "DNI" : associatedEditObject?.adicional?.tipoDoc === 6 ? "RUC" : associatedEditObject?.adicional?.tipoDoc === 6 ? "Carnet de extranjería" : associatedEditObject?.adicional?.tipoDoc === 4 ? "Pasaporte" : ""
                                      }
                                    />
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
                                        type="tel"
                                        name="documento_adicional"
                                        value={associatedEditObject?.adicional?.documento}
                                        readOnly
                                      />
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
                                          type="text"
                                          name="nombres_adicional"
                                          value={associatedEditObject?.adicional?.nombres}
                                          readOnly
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
                                          type="text"
                                          name="paterno_adicional"
                                          value={associatedEditObject?.adicional?.apellidoPaterno}
                                          readOnly
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
                                          type="text"
                                          name="materno_adicional"
                                          value={associatedEditObject?.adicional?.apellidoMaterno}
                                          readOnly
                                        />
                                      </FormGroup>
                                    </Col>
                                  </Row>

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
                                      type="date"
                                      name="fechanacimiento_adicional"
                                      value={associatedEditObject?.adicional?.fechaNacimiento}
                                      readOnly
                                    />
                                  </FormGroup>
                                </Col>
                                <Col lg="3">
                                  <FormGroup>
                                    <label
                                      className="form-control-label"
                                      htmlFor="input-country"
                                    >
                                      Cargo*
                                    </label>
                                    <Input
                                      className="form-control-alternative"
                                      type="text"
                                      name="cargo_adicional"
                                      value={associatedEditObject?.adicional?.cargo}
                                      readOnly
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
                                    <Input
                                      className="form-control-alternative"
                                      type="tel"
                                      name="telefono_adicional"
                                      readOnly
                                      value={associatedEditObject?.adicional?.telefonos}
                                    />
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
                                    <Input
                                      className="form-control-alternative"
                                      type="email"
                                      name="correo_adicional"
                                      readOnly
                                      value={associatedEditObject?.adicional?.email}
                                    />
                                  </FormGroup>
                                </Col>
                              </Row>
                            </div>
                          </Col>
                        </>
                        :
                        typeAssociated === 2 ?
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
                                    <Input readOnly
                                      value={associatedEditObject?.persona?.tipoDocumento === 1 ? "DNI" : associatedEditObject?.persona?.tipoDocumento === 6 ? "RUC" : associatedEditObject?.persona?.tipoDocumento === 6 ? "Carnet de extranjería" : associatedEditObject?.persona?.tipoDocumento === 4 ? "Pasaporte" : ""}
                                    />
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
                                        type="tel"
                                        name="documento_persona"
                                        value={associatedEditObject?.persona?.documento}
                                        readOnly
                                      />
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
                                          type="text"
                                          name="nombres_persona"
                                          value={associatedEditObject?.persona?.nombres}
                                          readOnly
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
                                          type="text"
                                          name="paterno_persona"
                                          value={associatedEditObject?.persona?.apellidoPaterno}
                                          readOnly
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
                                          type="text"
                                          name="materno_persona"
                                          value={associatedEditObject?.persona?.apellidoMaterno}
                                          readOnly
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
                                    <Input readOnly
                                      value={associatedEditObject?.persona?.sexo === 1 ? "Mujer" : "Hombre"}
                                    />
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
                                      type="date"
                                      name="fechanacimiento_persona"
                                      value={associatedEditObject?.persona?.fechaNacimiento}
                                      readOnly
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
                                      type="text"
                                      name="direccionfiscal_persona"
                                      value={associatedEditObject?.persona?.direccion}
                                      readOnly
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
                                      type="text"
                                      name="actividad_persona"
                                      value={associatedEditObject?.persona?.actividad}
                                      readOnly
                                    />
                                  </FormGroup>
                                </Col>
                                <Col lg="6">
                                  <FormGroup>
                                    <label
                                      className="form-control-label"
                                      htmlFor="input-country"
                                    >
                                      Actividad secundaria
                                    </label>
                                    <Input
                                      className="form-control-alternative"
                                      type="text"
                                      name="actividad_secundaria_persona"
                                      value={associatedEditObject?.persona?.actividadSecundaria}
                                      readOnly
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
                                    <Input
                                      className="form-control-alternative"
                                      type="tel"
                                      name="telefono_persona"
                                      value={associatedEditObject?.persona?.telefonos}
                                    />
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
                                    <Input
                                      className="form-control-alternative"
                                      type="email"
                                      name="correo_persona"
                                      value={associatedEditObject?.persona?.correos}
                                    />
                                  </FormGroup>
                                </Col>
                              </Row>
                            </div>
                          </Col>
                          :
                          ""
                    }
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default EditarAsociado;
