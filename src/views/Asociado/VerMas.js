import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';

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
} from "reactstrap";
// core components
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { showEditAssociated } from "../../redux/actions/Asociado";

const EditarAsociado = (props) => {
  const dispatch = useDispatch();
  const { associatedEditObject } = useSelector(({ asociado }) => asociado);
  const [typeAssociated, setTypeAssociated] = useState(null);
  const { register } = useForm();

  const history = useHistory();

  useEffect(() => {
    if(props?.match?.params?.id){
        dispatch(showEditAssociated(props.match.params.id));
    }else{
      history.push('/');
    }
  }, [props.match.params.id,history,dispatch]);

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
                              defaultValue={associatedEditObject.promotor?.nombresCompletos}
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
                              defaultValue={associatedEditObject.comite?.nombre}
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
                                associatedEditObject.asociado?.tipoAsociado === 1 ? "Empresa":associatedEditObject.asociado?.tipoAsociado === 2 ? "Persona":null
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
                              innerRef={register({ required: false })}
                              defaultValue={associatedEditObject?.asociado?.direccionSocial}
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
                              value={'S/.'+associatedEditObject.asociado?.importeMensual}
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
                                      defaultValue={associatedEditObject?.empresa?.ruc}
                                      innerRef={register({ required: false })}
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
                                    defaultValue={associatedEditObject?.empresa?.razonSocial}
                                    innerRef={register({ required: false })}
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
                                    defaultValue={associatedEditObject?.empresa?.direccion}
                                    innerRef={register({ required: false })}
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
                                    defaultValue={associatedEditObject?.empresa?.fundacion}
                                    innerRef={register({ required: false })}
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
                                    defaultValue={associatedEditObject?.empresa?.actividad}
                                    innerRef={register({ required: false })}
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
                                    defaultValue={associatedEditObject?.empresa?.actividadSecundaria}
                                    innerRef={register({ required: false })}
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
                                  <div className="d-flex">
                                    <Input
                                      className="form-control-alternative"
                                      type="tel"
                                      name="telefono_asociado"
                                      readOnly
                                      defaultValue={associatedEditObject?.empresa?.telefonos}
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
                                      type="email"
                                      name="correo_asociado"
                                      readOnly
                                      defaultValue={associatedEditObject?.empresa?.correos}
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
                                  defaultValue={associatedEditObject?.representante?.tipoDoc === 1?"DNI":associatedEditObject?.representante?.tipoDoc === 6?"RUC":associatedEditObject?.representante?.tipoDoc === 6?"Carnet de extranjería":associatedEditObject?.representante?.tipoDoc === 4?"Pasaporte":""}
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
                                      defaultValue={associatedEditObject?.representante?.documento}
                                      innerRef={register({ required: false })}
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
                                        defaultValue={associatedEditObject?.representante?.nombres}
                                        innerRef={register({ required: false })}
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
                                        defaultValue={associatedEditObject?.representante?.apellidoPaterno}
                                        innerRef={register({ required: false })}
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
                                        defaultValue={associatedEditObject?.representante?.apellidoMaterno}
                                        innerRef={register({ required: false })}
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
                                    defaultValue={associatedEditObject?.representante?.fechaNacimiento}
                                    innerRef={register({ required: false })}
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
                                    defaultValue={associatedEditObject?.representante?.cargo}
                                    innerRef={register({ required: false })}
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
                                  <div className="d-flex">
                                    <Input
                                      className="form-control-alternative"
                                      type="tel"
                                      name="telefono_representante"
                                      readOnly
                                      defaultValue={associatedEditObject?.representante?.telefonos}
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
                                      type="email"
                                      name="correo_representante"
                                      readOnly
                                      defaultValue={associatedEditObject?.representante?.email}
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
                                    associatedEditObject?.adicional?.tipoDoc === 1?"DNI":associatedEditObject?.adicional?.tipoDoc === 6?"RUC":associatedEditObject?.adicional?.tipoDoc === 6?"Carnet de extranjería":associatedEditObject?.adicional?.tipoDoc === 4?"Pasaporte":""
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
                                      defaultValue={associatedEditObject?.adicional?.documento}
                                      innerRef={register({ required: false })}
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
                                        defaultValue={associatedEditObject?.adicional?.nombres}
                                        innerRef={register({ required: false })}
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
                                        defaultValue={associatedEditObject?.adicional?.apellidoPaterno}
                                        innerRef={register({ required: false })}
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
                                        defaultValue={associatedEditObject?.adicional?.apellidoMaterno}
                                        innerRef={register({ required: false })}
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
                                    defaultValue={associatedEditObject?.adicional?.fechaNacimiento}
                                    innerRef={register({ required: false })}
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
                                    defaultValue={associatedEditObject?.adicional?.cargo}
                                    innerRef={register({ required: false })}
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
                                  <div className="d-flex">
                                    <Input
                                      className="form-control-alternative"
                                      type="tel"
                                      name="telefono_adicional"
                                      readOnly
                                      defaultValue={associatedEditObject?.adicional?.telefonos}
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
                                      type="email"
                                      name="correo_adicional"
                                      readOnly
                                      defaultValue={associatedEditObject?.adicional?.email}
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
                                  defaultValue={associatedEditObject?.persona?.tipoDocumento === 1?"DNI":associatedEditObject?.persona?.tipoDocumento === 6?"RUC":associatedEditObject?.persona?.tipoDocumento === 6?"Carnet de extranjería":associatedEditObject?.persona?.tipoDocumento === 4?"Pasaporte":""}
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
                                      defaultValue={associatedEditObject?.persona?.documento}
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
                                        defaultValue={associatedEditObject?.persona?.nombres}
                                        innerRef={register({ required: false })}
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
                                        defaultValue={associatedEditObject?.persona?.apellidoPaterno}
                                        innerRef={register({ required: false })}
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
                                        defaultValue={associatedEditObject?.persona?.apellidoMaterno}
                                        innerRef={register({ required: false })}
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
                                  defaultValue={associatedEditObject?.persona?.sexo === 1 ? "Mujer" : "Hombre" }
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
                                    defaultValue={associatedEditObject?.persona?.fechaNacimiento}
                                    innerRef={register({ required: false })}
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
                                    defaultValue={associatedEditObject?.persona?.direccion}
                                    innerRef={register({ required: false })}
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
                                    defaultValue={associatedEditObject?.persona?.actividad}
                                    innerRef={register({ required: false })}
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
                                    defaultValue={associatedEditObject?.persona?.actividadSecundaria}
                                    innerRef={register({ required: false })}
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
                                  <div className="d-flex">
                                    <Input
                                      className="form-control-alternative"
                                      type="tel"
                                      name="telefono_persona"
                                      innerRef={register({ required: false })}
                                      defaultValue={associatedEditObject?.persona?.telefonos}
                                    />
                                    <Button className="btn-icon d-none d-none" size="sm" color="primary" type="button">
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
                                      type="email"
                                      name="correo_persona"
                                      innerRef={register({ required: false })}
                                      defaultValue={associatedEditObject?.persona?.correos}
                                    />
                                    <Button className="btn-icon d-none d-none" size="sm" color="primary" type="button">
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
