import React, { useState, useEffect } from "react";

// reactstrap components
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";
import Select from 'react-select';
import ContainerPublic from './ContainerPublic';
// core components
import SearchPromotor from "components/Selects/SearchPromotor.js";
import SearchComiteGremial from "components/Selects/SearchComiteGremial.js";
import ConfirmDialog from '../../components/Modals/ConfirmDialog';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  newAfiliation,
  searchRuc,
  searchDni,
  resetSearchRuc,
  resetSearchDni
} from "../../redux/actions/Asociado";

const Afiliacion = () => {
  const dispatch = useDispatch();
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

  const { rucSearched, dniSearched } = useSelector(({ asociado }) => asociado);
  const [searchedDoc, setsearchedDoc] = useState(1); //1 Persona dni 2 Persona ruc
  const [loading, setloading] = useState({
    rucEmpresa: false,
    rep: false,
    adi: false,
    persona: false,
  });
  const [searchCompany, setsearchCompany] = useState(null);
  const [searchRepresentante, setsearchRepresentante] = useState(null);
  const [searchAdicional, setsearchAdicional] = useState(null);
  const [searchPersona, setsearchPersona] = useState(null);

  useEffect(() => {
    switch (searchedDoc) {
      case 1: //RUC EMPRESA
        setsearchCompany(JSON.parse(JSON.stringify(rucSearched)));
        setloading({ ...loading, rucEmpresa: false });
        break;
      case 2: //DNI REP
        setsearchRepresentante(JSON.parse(JSON.stringify(dniSearched)));
        setloading({ ...loading, rep: false });
        break;
      case 3: //RUC REP
        setsearchRepresentante(JSON.parse(JSON.stringify(rucSearched)));
        setloading({ ...loading, rep: false });
        break;
      case 4: //DNI ADICIONAL
        setsearchAdicional(JSON.parse(JSON.stringify(dniSearched)));
        setloading({ ...loading, adi: false });
        break;
      case 5: //RUC ADICIONAL
        setsearchAdicional(JSON.parse(JSON.stringify(rucSearched)));
        setloading({ ...loading, adi: false });
        break;
      case 6: //DNI PERSONA
        setsearchPersona(JSON.parse(JSON.stringify(dniSearched)));
        setloading({ ...loading, persona: false });
        break;
      case 7: //RUC PERSONA
        setsearchPersona(JSON.parse(JSON.stringify(rucSearched)));
        setloading({ ...loading, persona: false });
        break;
      default:
        break;
    }
  }, [rucSearched, dniSearched]); // eslint-disable-line react-hooks/exhaustive-deps

  const toggleModal = () => {
    setShowConfirm(!showConfirm);
  };

  const onSubmit = (data) => {
    toggleModal();
    setFormData(data);
  };

  useEffect(() => {
    return () => {
      dispatch(resetSearchRuc());
      dispatch(resetSearchDni());
    }
  }, [dispatch]);

  const handleConfirm = () => {
    //REGISTRAR
    formData.comitegremial = comiteGremial.value;
    formData.tipoasociado = typeAssociated;
    formData.idPromotor = promotorSearched.value;
    formData.promotornombre = newPromotorName;
    formData.tipodocumento_representante = tipodocumentorepresentante;
    formData.tipodocumento_adicional = tipodocumentoadicional;
    formData.tipodocumento_persona = tipodocumentopersona;
    formData.sexo = sexo;
    dispatch(newAfiliation(formData))
    //REGISTRAR
    document.getElementById("form-save-associated").reset();
    setFormData(null);
  }

  return (
    <ContainerPublic title="Afiliación de nuevo asociado">
      <ConfirmDialog
        question="¿Seguro de registrar afiliación?"
        showConfirm={showConfirm} toggleModal={toggleModal} handleConfirm={handleConfirm} />
      <Col className="order-xl-1" xl="12">
        <Card className="bg-secondary shadow">
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
                          <SearchPromotor setVal={setPromotorSearched} setNew={setnewPromotorName}  curVal={promotorSearched}/>
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
                          <SearchComiteGremial setVal={setcomiteGremial} curVal={comiteGremial}/>
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
                            name="direccionsocial"
                            type="text"
                            innerRef={register({ required: false })}
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
                                    id="ruc"
                                    innerRef={register({ required: typeAssociated === 1 })}
                                  />
                                  <Button className="btn-icon" size="sm" color="primary" type="button"
                                    onClick={() => {
                                      setloading({ ...loading, rucEmpresa: true });
                                      setsearchedDoc(1);
                                      dispatch(searchRuc(document.getElementById('ruc').value));
                                    }}>
                                    <span>
                                      {
                                        loading.rucEmpresa ?
                                          <i className="fa fa-spinner fa-spin fa-fw" aria-hidden="true" />
                                          :
                                          <i className="fa fa-search" />
                                      }
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
                                  type="text"
                                  name="razonsocial"
                                  innerRef={register({ required: typeAssociated === 1 })}
                                  defaultValue={searchCompany ? searchCompany?.nombre_o_razon_social : ''}
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
                                  defaultValue={searchCompany ? searchCompany?.direccion : ''}
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
                                  type="date"
                                  name="fundacion"
                                  innerRef={register({ required: typeAssociated === 1 })}
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
                                  type="text"
                                  name="actividad"
                                  innerRef={register({ required: typeAssociated === 1 })}
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
                                    innerRef={register({ required: false })}
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
                                    innerRef={register({ required: false })}
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
                                <Select
                                  placeholder="Seleccione..."
                                  className="select-style"
                                  name="typeAsociado"
                                  onChange={(inputValue, actionMeta) => {
                                    settipodocumentorepresentante(inputValue.value);
                                  }}
                                  options={[{ value: 1, label: "DNI" }, { value: 6, label: "RUC" }, { value: 4, label: "Carnet de extranjería" }, { value: 7, label: "Pasaporte" }]} />
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
                                    type="text"
                                    name="documento_representante"
                                    id="documento_representante"
                                    innerRef={register({ required: typeAssociated === 1 })}
                                  />
                                  {
                                    (tipodocumentorepresentante === 1) &&
                                    <Button className="btn-icon" size="sm" color="primary" type="button"
                                      onClick={() => {
                                        setloading({ ...loading, rep: true });
                                        if (tipodocumentorepresentante === 1) {
                                          setsearchedDoc(2);
                                          dispatch(searchDni(document.getElementById('documento_representante').value));
                                        } else {
                                          setsearchedDoc(3);
                                          dispatch(searchRuc(document.getElementById('documento_representante').value));
                                        }
                                      }}
                                    >
                                      <span>
                                        {
                                          loading.rep ?
                                            <i className="fa fa-spinner fa-spin fa-fw" aria-hidden="true" />
                                            :
                                            <i className="fa fa-search" />
                                        }
                                      </span>
                                    </Button>
                                  }
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
                                      defaultValue={searchRepresentante && searchRepresentante.nombres}
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
                                      defaultValue={searchRepresentante && searchRepresentante.apellido_paterno}
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
                                      defaultValue={searchRepresentante && searchRepresentante.apellido_materno}
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
                                  defaultValue={searchRepresentante && searchRepresentante.fecha_nacimiento}
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
                                    innerRef={register({ required: false })}
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
                                    innerRef={register({ required: false })}
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
                                  options={[{ value: 1, label: "DNI" }, { value: 6, label: "RUC" }, { value: 4, label: "Carnet de extranjería" }, { value: 7, label: "Pasaporte" }]} />
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
                                    type="text"
                                    name="documento_adicional"
                                    id="documento_adicional"
                                    innerRef={register({ required: false })}
                                  />
                                  {
                                    (tipodocumentoadicional === 1) &&
                                    <Button className="btn-icon" size="sm" color="primary" type="button"
                                      onClick={() => {
                                        setloading({ ...loading, adi: true });
                                        if (tipodocumentoadicional === 1) {
                                          setsearchedDoc(4);
                                          dispatch(searchDni(document.getElementById('documento_adicional').value));
                                        } else {
                                          setsearchedDoc(5);
                                          dispatch(searchRuc(document.getElementById('documento_adicional').value));
                                        }
                                      }}
                                    >
                                      <span>
                                        {
                                          loading.adi ?
                                            <i className="fa fa-spinner fa-spin fa-fw" aria-hidden="true" />
                                            :
                                            <i className="fa fa-search" />
                                        }
                                      </span>
                                    </Button>
                                  }
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
                                      defaultValue={searchAdicional && searchAdicional.nombres}
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
                                      defaultValue={searchAdicional && searchAdicional.apellido_paterno}
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
                                      defaultValue={searchAdicional && searchAdicional.apellido_materno}
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
                                  name="fechanacimiento_adicional"
                                  innerRef={register({ required: false })}
                                  defaultValue={searchAdicional && searchAdicional.fecha_nacimiento}
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
                                    innerRef={register({ required: false })}
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
                                    innerRef={register({ required: false })}
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
                                  options={[{ value: 1, label: "DNI" }, { value: 6, label: "RUC" }, { value: 4, label: "Carnet de extranjería" }, { value: 7, label: "Pasaporte" }]} />
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
                                    type="text"
                                    name="documento_persona"
                                    id="documento_persona"
                                    innerRef={register({ required: typeAssociated === 2 })}
                                  />
                                  {
                                    (tipodocumentopersona === 1) &&
                                    <Button className="btn-icon" size="sm" color="primary" type="button"
                                      onClick={() => {
                                        setloading({ ...loading, persona: true });
                                        if (tipodocumentopersona === 1) {
                                          setsearchedDoc(6);
                                          dispatch(searchDni(document.getElementById('documento_persona').value));
                                        } else {
                                          setsearchedDoc(7);
                                          dispatch(searchRuc(document.getElementById('documento_persona').value));
                                        }
                                      }}
                                    >
                                      <span>
                                        {
                                          loading.persona ?
                                            <i className="fa fa-spinner fa-spin fa-fw" aria-hidden="true" />
                                            :
                                            <i className="fa fa-search" />
                                        }
                                      </span>
                                    </Button>
                                  }
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
                                      defaultValue={searchPersona && searchPersona.nombres}
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
                                      defaultValue={searchPersona && searchPersona.apellido_paterno}
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
                                      defaultValue={searchPersona && searchPersona.apellido_materno}
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
                                  options={[{ value: 0, label: "Hombre" }, { value: 1, label: "Mujer" }]} />
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
                      Registrar
                      </Button>
                  </div>
              }
            </Form>
          </CardBody>
        </Card>
      </Col>
    </ContainerPublic>
  );
};

export default Afiliacion;
