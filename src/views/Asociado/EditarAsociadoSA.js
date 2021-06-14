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
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";
import Select from 'react-select';
// core components
import SearchPromotor from "components/Selects/SearchPromotor.js";
import SearchComiteGremial from "components/Selects/SearchComiteGremial.js";
import ConfirmDialog from '../../components/Modals/ConfirmDialog';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { showEditAssociated, update } from "../../redux/actions/Asociado";

const EditarAsociadoSA = (props) => {
  const dispatch = useDispatch();
  const { associatedEditObject } = useSelector(({ asociado }) => asociado);
  const [promotorSearched, setPromotorSearched] = useState(null);
  const [newPromotorName, setnewPromotorName] = useState(null);
  const [comiteGremial, setcomiteGremial] = useState(null);
  const [typeAssociated, setTypeAssociated] = useState(null);
  const [tipodocumentorepresentante, settipodocumentorepresentante] = useState(null);
  const [tipodocumentoadicional, settipodocumentoadicional] = useState(null);
  const [tipodocumentopersona, settipodocumentopersona] = useState(null);
  const [sexo, setsexo] = useState(null);

  const { register, handleSubmit } = useForm();
  const [formData, setFormData] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);

  const history = useHistory();

  useEffect(() => {
    if (props?.match?.params?.id) {
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

  useEffect(() => {
    associatedEditObject.promotor && setPromotorSearched(associatedEditObject.promotor.idPromotor);
    return () => {
      setPromotorSearched(null);
    }
  }, [associatedEditObject.promotor]);

  useEffect(() => {
    associatedEditObject.comite && setcomiteGremial(associatedEditObject.comite.idComite);
    return () => {
      setcomiteGremial(null);
    }
  }, [associatedEditObject.comite]);

  useEffect(() => {
    associatedEditObject.adicional && settipodocumentoadicional(associatedEditObject.adicional.tipoDoc);
    return () => {
      settipodocumentoadicional(null);
    }
  }, [associatedEditObject.adicional]);

  useEffect(() => {
    associatedEditObject.representante && settipodocumentorepresentante(associatedEditObject.representante.tipoDoc);
    return () => {
      settipodocumentorepresentante(null);
    }
  }, [associatedEditObject.representante]);

  useEffect(() => {
    associatedEditObject.persona && settipodocumentopersona(associatedEditObject.persona.tipoDocumento);
    associatedEditObject.persona && setsexo(associatedEditObject.persona.sexo);

    return () => {
      settipodocumentopersona(null);
      setsexo(null);
    }
  }, [associatedEditObject.persona]);

  const toggleModal = () => {
    setShowConfirm(!showConfirm);
  };

  const onSubmit = (data) => {
    toggleModal();
    setFormData(data);
  };

  const handleConfirm = () => {
    //REGISTRAR
    formData.comitegremial = comiteGremial;
    formData.tipoasociado = typeAssociated;
    formData.idPromotor = promotorSearched;
    formData.idSector = associatedEditObject.sector.idSector;
    formData.promotornombre = newPromotorName;
    formData.tipodocumento_representante = tipodocumentorepresentante;
    formData.tipodocumento_adicional = tipodocumentoadicional;
    formData.tipodocumento_persona = tipodocumentopersona;
    formData.sexo = sexo;
    dispatch(update(associatedEditObject.asociado.idAsociado, formData));
    history.push('/admin/asociado-sa');
    //REGISTRAR
    document.getElementById("form-save-associated").reset();
    setFormData(null);
  }

  return (
    <>
      <div className="header pb-8 pt-5 pt-lg-8 pt-md-8  d-flex align-items-center">
        <span className="mask bg-gradient-info opacity-8" />
      </div>
      {/* Page content */}
      <Container className="mt--7" fluid>
        <ConfirmDialog
          question="¿Seguro de actualizar datos del asociado?"
          showConfirm={showConfirm} toggleModal={toggleModal} handleConfirm={handleConfirm} />
        <Row>
          <Col className="order-xl-1" xl="12">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="12">
                    <h3 className="mb-0">Editar asociado</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form id="form-save-associated" onSubmit={handleSubmit(onSubmit)}>
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
                              {
                                associatedEditObject.promotor ?
                                  <SearchPromotor setVal={setPromotorSearched} setNew={setnewPromotorName} defaultVal={{ value: associatedEditObject.promotor.idPromotor, label: associatedEditObject.promotor.nombresCompletos }} />
                                  :
                                  ""
                              }
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
                              {
                                associatedEditObject.comite ?
                                  <SearchComiteGremial setVal={setcomiteGremial} defaultVal={{ value: associatedEditObject.comite.idComite, label: associatedEditObject.comite.nombre }} />
                                  :
                                  ""
                              }
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
                              {
                                associatedEditObject.asociado ?
                                  <Select
                                    placeholder="Seleccione..."
                                    className="select-style"
                                    name="typeAsociado"
                                    onChange={(inputValue, actionMeta) => {
                                      setTypeAssociated(inputValue.value);
                                    }}
                                    options={[{ value: 1, label: "Empresa" }, { value: 2, label: "Persona" }]}
                                    defaultValue={{ value: associatedEditObject.asociado.tipoAsociado, label: associatedEditObject.asociado.tipoAsociado === 1 ? "Empresa" : associatedEditObject.asociado.tipoAsociado === 2 ? "Persona" : null }}
                                  />
                                  :
                                  ""
                              }
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
                                name="direccionsocial"
                                type="text"
                                innerRef={register({ required: false })}
                                defaultValue={associatedEditObject?.asociado?.direccionSocial}
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
                                  name="importemensual"
                                  innerRef={register({ required: true })}
                                  defaultValue={associatedEditObject?.asociado?.importeMensual}
                                />
                              </InputGroup>
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
                              <br />
                              <Input
                                value={
                                  associatedEditObject?.sector?.descripcion
                                }
                                disabled
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
                                        innerRef={register({ required: typeAssociated === 1 })}
                                        defaultValue={associatedEditObject?.empresa?.ruc}
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
                                      innerRef={register({ required: typeAssociated === 1 })}
                                      defaultValue={associatedEditObject?.empresa?.razonSocial}
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
                                      innerRef={register({ required: typeAssociated === 1 })}
                                      defaultValue={associatedEditObject?.empresa?.direccion}
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
                                      innerRef={register({ required: false })}
                                      defaultValue={associatedEditObject?.empresa?.fundacion}
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
                                      innerRef={register({ required: typeAssociated === 1 })}
                                      defaultValue={associatedEditObject?.empresa?.actividad}
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
                                      innerRef={register({ required: false })}
                                      defaultValue={associatedEditObject?.empresa?.actividadSecundaria}
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
                                        type="text"
                                        name="telefono_asociado"
                                        innerRef={register({ required: false })}
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
                                        name="correo_asociado"
                                        innerRef={register({ required: false })}
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
                                    {
                                      associatedEditObject.representante ?
                                        <Select
                                          placeholder="Seleccione..."
                                          className="select-style"
                                          name="typeAsociado"
                                          onChange={(inputValue, actionMeta) => {
                                            settipodocumentorepresentante(inputValue.value);
                                          }}
                                          options={[{ value: 1, label: "DNI" }, { value: 6, label: "RUC" }, { value: 4, label: "Carnet de extranjería" }, { value: 7, label: "Pasaporte" }]}
                                          defaultValue={{ value: associatedEditObject.representante.tipoDoc, label: associatedEditObject.representante.tipoDoc === 1 ? "DNI" : associatedEditObject.representante.tipoDoc === 6 ? "RUC" : associatedEditObject.representante.tipoDoc === 6 ? "Carnet de extranjería" : associatedEditObject.representante.tipoDoc === 4 ? "Pasaporte" : "" }}
                                        />
                                        :
                                        ""
                                    }
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
                                        innerRef={register({ required: typeAssociated === 1 })}
                                        defaultValue={associatedEditObject?.representante?.documento}
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
                                          innerRef={register({ required: typeAssociated === 1 })}
                                          defaultValue={associatedEditObject?.representante?.nombres}
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
                                          innerRef={register({ required: typeAssociated === 1 })}
                                          defaultValue={associatedEditObject?.representante?.apellidoPaterno}
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
                                          innerRef={register({ required: typeAssociated === 1 })}
                                          defaultValue={associatedEditObject?.representante?.apellidoMaterno}
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
                                      innerRef={register({ required: false })}
                                      defaultValue={associatedEditObject?.representante?.fechaNacimiento}
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
                                      innerRef={register({ required: typeAssociated === 1 })}
                                      defaultValue={associatedEditObject?.representante?.cargo}
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
                                        type="text"
                                        name="telefono_representante"
                                        innerRef={register({ required: false })}
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
                                        name="correo_representante"
                                        innerRef={register({ required: false })}
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
                                    <Select
                                      placeholder="Seleccione..."
                                      className="select-style"
                                      name="typeAsociado"
                                      onChange={(inputValue, actionMeta) => {
                                        settipodocumentoadicional(inputValue.value);
                                      }}
                                      options={[{ value: 1, label: "DNI" }, { value: 2, label: "RUC" }, { value: 3, label: "Carnet de extranjería" }]}
                                      defaultValue={{ value: associatedEditObject?.adicional?.tipoDoc, label: associatedEditObject?.adicional?.tipoDoc === 1 ? "DNI" : associatedEditObject?.adicional?.tipoDoc === 6 ? "RUC" : associatedEditObject?.adicional?.tipoDoc === 6 ? "Carnet de extranjería" : associatedEditObject?.adicional?.tipoDoc === 4 ? "Pasaporte" : "" }}
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
                                        innerRef={register({ required: false })}
                                        defaultValue={associatedEditObject?.adicional?.documento}
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
                                          innerRef={register({ required: false })}
                                          defaultValue={associatedEditObject?.adicional?.nombres}
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
                                          innerRef={register({ required: false })}
                                          defaultValue={associatedEditObject?.adicional?.apellidoPaterno}
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
                                          innerRef={register({ required: false })}
                                          defaultValue={associatedEditObject?.adicional?.apellidoMaterno}
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
                                      innerRef={register({ required: false })}
                                      defaultValue={associatedEditObject?.adicional?.fechaNacimiento}
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
                                      innerRef={register({ required: false })}
                                      defaultValue={associatedEditObject?.adicional?.cargo}
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
                                        type="text"
                                        name="telefono_adicional"
                                        innerRef={register({ required: false })}
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
                                        name="correo_adicional"
                                        innerRef={register({ required: false })}
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
                                    <Select
                                      placeholder="Seleccione..."
                                      className="select-style"
                                      name="typeAsociado"
                                      onChange={(inputValue, actionMeta) => {
                                        settipodocumentopersona(inputValue.value);
                                      }}
                                      options={[{ value: 1, label: "DNI" }, { value: 6, label: "RUC" }, { value: 4, label: "Carnet de extranjería" }, { value: 7, label: "Pasaporte" }]}
                                      defaultValue={{ value: associatedEditObject?.persona?.tipoDocumento, label: associatedEditObject?.persona?.tipoDocumento === 1 ? "DNI" : associatedEditObject?.persona?.tipoDocumento === 6 ? "RUC" : associatedEditObject?.persona?.tipoDocumento === 6 ? "Carnet de extranjería" : associatedEditObject?.persona?.tipoDocumento === 4 ? "Pasaporte" : "" }}
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
                                        innerRef={register({ required: typeAssociated === 2 })}
                                        defaultValue={associatedEditObject?.persona?.documento}
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
                                          type="text"
                                          name="nombres_persona"
                                          innerRef={register({ required: typeAssociated === 2 })}
                                          defaultValue={associatedEditObject?.persona?.nombres ? associatedEditObject?.persona?.nombres : associatedEditObject?.persona?.nombresCompletos}
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
                                          innerRef={register({ required: typeAssociated === 2 })}
                                          defaultValue={associatedEditObject?.persona?.apellidoPaterno}
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
                                          innerRef={register({ required: typeAssociated === 2 })}
                                          defaultValue={associatedEditObject?.persona?.apellidoMaterno}
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
                                        setsexo(inputValue.value);
                                      }}
                                      options={[{ value: 0, label: "Hombre" }, { value: 1, label: "Mujer" }]}
                                      defaultValue={{ value: associatedEditObject?.persona?.sexo, label: associatedEditObject?.persona?.sexo === 1 ? "Mujer" : "Hombre" }}
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
                                      innerRef={register({ required: typeAssociated === 2 })}
                                      defaultValue={associatedEditObject?.persona?.fechaNacimiento}
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
                                      innerRef={register({ required: typeAssociated === 2 })}
                                      defaultValue={associatedEditObject?.persona?.direccion}
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
                                      innerRef={register({ required: typeAssociated === 2 })}
                                      defaultValue={associatedEditObject?.persona?.actividad}
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
                                      innerRef={register({ required: false })}
                                      defaultValue={associatedEditObject?.persona?.actividadSecundaria}
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
                                        type="text"
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

                  {
                    typeAssociated == null ?
                      ""
                      :
                      <div className="text-center mt-5">
                        <Button className="my-4 btn-block" color="primary" type="submit">
                          Actualizar
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

export default EditarAsociadoSA;
