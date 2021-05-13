import React, { useState, useEffect } from 'react'
import {
  Button,
  FormGroup,
  Input,
  Row,
  Col,
  Modal,
  Form,
  InputGroupText,
  InputGroupAddon,
  InputGroup,
} from "reactstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchError, hideMessage } from '../../../redux/actions/Common';
import { store, update } from "../../../redux/actions/Participante";

const New = ({ show, toggleModal, setSearched }) => {
  const { register, handleSubmit, watch, reset } = useForm();
  const { participanteObject } = useSelector(({ participante }) => participante);
  const dispatch = useDispatch();
  const [formdata, setformdata] = useState({
    dni: "",
    nombres: "",
    paterno: "",
    materno: "",
    celular: "",
    correo: "",
    ruc: "",
    empresa: "",
    cargo: "",
  });

  const onSubmit = (data) => {
    if (formdata.dni == "") {
      dispatch(fetchError("Debe especificar el DNI."))
    } else {
      if (formdata.nombres == "") {
        dispatch(fetchError("Debe especificar el nombre."))
      } else {
        if (formdata.paterno == "") {
          dispatch(fetchError("Debe especificar el apellido paterno."))
        } else {
          if (formdata.materno == "") {
            dispatch(fetchError("Debe especificar el apellido materno."))
          } else {
            if (participanteObject?.idParticipante) {
              dispatch(update(formdata, participanteObject.idParticipante));
              setformdata(null);
              toggleModal();
            } else {
              dispatch(store(formdata));
              if(setSearched){
                setSearched(formdata.dni);
              }
              setformdata(null);
              toggleModal();
            }
          }
        }
      }
      dispatch(hideMessage());
    }
  };

  useEffect(() => {
    if (participanteObject) {
      setformdata({
        dni: participanteObject?.dni,
        nombres: participanteObject?.nombres,
        paterno: participanteObject?.apellidoPaterno,
        materno: participanteObject?.apellidoMaterno,
        celular: participanteObject?.celular,
        correo: participanteObject?.correo,
        ruc: participanteObject?.ruc,
        empresa: participanteObject?.empresa,
        cargo: participanteObject?.cargo,
      });
    }
  }, [participanteObject]);

  return (
    <Modal
      className="modal-dialog-centered"
      size="lg"
      isOpen={show}
      toggle={toggleModal}
    >
      <div className="modal-header ">
        <h3 className="modal-title">
          {participanteObject?.idParticipante ? "Editar participante" : "Nuevo participante"}
        </h3>
        <button
          aria-label="Close"
          className="close"
          data-dismiss="modal"
          type="button"
          onClick={toggleModal}
        >
          <span aria-hidden={true}>×</span>
        </button>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className="modal-body pb-0 bg-secondary">
          <Row>
            <Col className="col-12">
              <h6 className="heading-small text-muted mb-4 d-flex">
                Información personal
              </h6>
              <Row>
                <Col lg="3">
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-dni"
                    >DNI</label>
                    <InputGroup className="input-group-alternative mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-badge" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        className="form-control-alternative"
                        type="text"
                        name="dni"
                        onChange={(e) => {
                          setformdata({ ...formdata, dni: e.target.value });
                        }}
                        value={formdata?.dni}
                        innerRef={register({ required: true })}
                      />
                    </InputGroup>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col lg="4">
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-nombres"
                    >Nombres</label>
                    <InputGroup className="input-group-alternative mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-single-02" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        className="form-control-alternative"
                        type="text"
                        name="nombres"
                        onChange={(e) => {
                          setformdata({ ...formdata, nombres: e.target.value });
                        }}
                        value={formdata?.nombres}
                        innerRef={register({ required: true })}
                      />
                    </InputGroup>
                  </FormGroup>
                </Col>
                <Col lg="4">
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-paterno"
                    >Apellido paterno</label>
                    <InputGroup className="input-group-alternative mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-single-02" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        className="form-control-alternative"
                        type="text"
                        name="paterno"
                        onChange={(e) => {
                          setformdata({ ...formdata, paterno: e.target.value });
                        }}
                        value={formdata?.paterno}
                        innerRef={register({ required: true })}
                      />
                    </InputGroup>
                  </FormGroup>
                </Col>
                <Col lg="4">
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-materno"
                    >Apellido materno</label>
                    <InputGroup className="input-group-alternative mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-single-02" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        className="form-control-alternative"
                        type="text"
                        name="materno"
                        onChange={(e) => {
                          setformdata({ ...formdata, materno: e.target.value });
                        }}
                        value={formdata?.materno}
                        innerRef={register({ required: true })}
                      />
                    </InputGroup>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col lg="6">
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-correo"
                    >Correo</label>
                    <InputGroup className="input-group-alternative mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="fa fa-at" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        className="form-control-alternative"
                        type="text"
                        name="correo"
                        onChange={(e) => {
                          setformdata({ ...formdata, correo: e.target.value });
                        }}
                        value={formdata?.correo}
                        innerRef={register({ required: true })}
                      />
                    </InputGroup>
                  </FormGroup>
                </Col>
                <Col lg="6">
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-celular"
                    >Celular</label>
                    <InputGroup className="input-group-alternative mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="fa fa-phone" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        className="form-control-alternative"
                        type="text"
                        name="celular"
                        onChange={(e) => {
                          setformdata({ ...formdata, celular: e.target.value });
                        }}
                        value={formdata?.celular}
                        innerRef={register({ required: true })}
                      />
                    </InputGroup>
                  </FormGroup>
                </Col>
              </Row>
            </Col>
            <Col className="col-12">
              <h6 className="heading-small text-muted mb-4 d-flex">
                Empresa
              </h6>
              <Row>
                <Col lg="3">
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-ruc"
                    >RUC</label>
                    <InputGroup className="input-group-alternative mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-badge" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        className="form-control-alternative"
                        type="text"
                        name="ruc"
                        onChange={(e) => {
                          setformdata({ ...formdata, ruc: e.target.value });
                        }}
                        value={formdata?.ruc}
                        innerRef={register({ required: true })}
                      />
                    </InputGroup>
                  </FormGroup>
                </Col>
                <Col lg="9">
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-empresa"
                    >Empresa</label>
                    <InputGroup className="input-group-alternative mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-building" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        className="form-control-alternative"
                        type="text"
                        name="empresa"
                        onChange={(e) => {
                          setformdata({ ...formdata, empresa: e.target.value });
                        }}
                        value={formdata?.empresa}
                        innerRef={register({ required: true })}
                      />
                    </InputGroup>
                  </FormGroup>
                </Col>
                <Col lg="6">
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-cargo"
                    >Cargo</label>
                    <InputGroup className="input-group-alternative mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="fa fa-briefcase" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        className="form-control-alternative"
                        type="text"
                        name="cargo"
                        onChange={(e) => {
                          setformdata({ ...formdata, cargo: e.target.value });
                        }}
                        value={formdata?.cargo}
                        innerRef={register({ required: true })}
                      />
                    </InputGroup>
                  </FormGroup>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
        <div className="modal-footer">
          <Button
            className="mr-auto"
            color="link"
            data-dismiss="modal"
            type="button"
            onClick={toggleModal}
          >
            Cerrar
          </Button>
          <Button className="btn-primary" color="primary" type="submit">
            {participanteObject?.idParticipante ? "Actualizar" : "Registrar"}
          </Button>
        </div>
      </Form>
    </Modal>);
}


export default New;