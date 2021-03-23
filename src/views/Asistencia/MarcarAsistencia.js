import React, { useState, useEffect } from "react";

// reactstrap components
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
  Modal,
} from "reactstrap";
import Select from 'react-select';
import { useForm } from "react-hook-form";

import { connect } from "react-redux";
import { listAssistance } from '../../redux/actions/Asistencia';
// core components

const MarcarAsistencia = () => {
  const { register, handleSubmit } = useForm();
  const [dateNow, setDateNow] = useState(new Date().toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }));
  const [type, setType] = useState(1);

  const [showConfirm, setShowConfirm] = useState(false);
  const [sendAssistance, setSendAssistance] = useState(false);

  const [formData, setFormData] = useState(null);

  const getDateNow = () => {
    let now = new Date();
    setDateNow(now.toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }))
  }

  const toggleModal = () => {
    listAssistance()
    setShowConfirm(!showConfirm);
  };

  useEffect(() => {
    let timer = setInterval(() => {
      getDateNow()
    }, 1000);

    return () => clearInterval(timer)
  }, [])

  const onSubmit = (data) => {
    toggleModal()
    data.type = type;
    setFormData(data)
  };

  useEffect(() => {
    if (sendAssistance) {
      console.log("REGISTRADO");
      //REGISTRAR
      console.log(formData)
      //REGISTRAR
      setSendAssistance(false);
      document.getElementById("form-check-assistance").reset();
    } else {
      setFormData(null);
    }
  }, [sendAssistance])

  return (
    <>
      <div className="header pb-8 pt-5 pt-lg-8 pt-md-8  d-flex align-items-center">
        <span className="mask bg-gradient-info opacity-8" />
      </div>
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="offset-xl-2" xl="8">
            <Card className="card-profile shadow bg-secondary">
              <Form id="form-check-assistance" onSubmit={handleSubmit(onSubmit)}>
                <CardBody >
                  <Row >
                    <Col lg="6">
                      <div className="clock-container">
                        <div>
                          <small>{new Date().toLocaleDateString()}</small>
                          <span>{dateNow}</span>
                        </div>
                      </div>
                    </Col>

                    <Col lg="6">
                      <Row>
                        <Col lg="12">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-tipoAsistencia"
                            >
                              Tipo
                          </label>
                            <Select
                              placeholder="Seleccione..."
                              className="select-style"
                              id="input-tipoAsistencia"
                              name="tipoAsistencia"
                              defaultValue={{ value: 1, label: "Entrada" }}
                              onChange={(inputValue, actionMeta) => {
                                setType(inputValue.value);
                              }}
                              options={[{ value: 1, label: "Entrada" }, { value: 2, label: "Salida" }]} />
                          </FormGroup>
                        </Col>
                        <Col lg="12">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-observacion"
                            >
                              Observacion
                          </label>
                            <Input
                              className="form-control-alternative"
                              id="input-observacion"
                              name="observacion"
                              type="textarea"
                              innerRef={register({ required: false })}
                            />
                          </FormGroup><div className="text-center mt-3">
                            <Button className="my-4" color="primary" type="submit">
                              Registrar
                            </Button>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                  </Row >
                  <hr></hr>
                  <Row className="mt-3">
                    <Col className="text-center" lg="3">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-firstEntry"
                        >
                          Entrada
                          </label>
                        <Input
                          className="form-control-alternative text-center"
                          defaultValue="8:00:00am"
                          id="input-firstEntry"
                          type="text"
                          disabled
                        />
                      </FormGroup>
                    </Col>
                    <Col className="text-center" lg="3">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-firstOut"
                        >
                          Salida
                          </label>
                        <Input
                          className="form-control-alternative text-center"
                          defaultValue="1:00:00pm"
                          id="input-firstOut"
                          type="text"
                          disabled
                        />
                      </FormGroup>
                    </Col>
                    <Col className="text-center" lg="3">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-firstEntry"
                        >
                          Entrada
                          </label>
                        <Input
                          className="form-control-alternative text-center"
                          defaultValue="3:30:00pm"
                          id="input-firstEntry"
                          type="text"
                          disabled
                        />
                      </FormGroup>
                    </Col>
                    <Col className="text-center" lg="3">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-firstOut"
                        >
                          Salida
                          </label>
                        <Input
                          className="form-control-alternative text-center"
                          defaultValue="7:00:00pm"
                          id="input-firstOut"
                          type="text"
                          disabled
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </CardBody>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
      <ConfirmDialog showConfirm={showConfirm} toggleModal={toggleModal} setSendAssistance={setSendAssistance} />
    </>
  );
};

const ConfirmDialog = ({ showConfirm, toggleModal, setSendAssistance }) => {
  const saveAssistance = () => {
    setSendAssistance(true); toggleModal();
  }
  return (
    <Modal
      className="modal-dialog-centered"
      isOpen={showConfirm}
      toggle={toggleModal}
    >
      <div className="modal-body pb-0">
        <div className="pt-3 text-center">
          <h4 className="text-primary" style={{fontSize:'1.2rem'}}>Confirmar registro</h4>
          <p style={{fontSize:'1.2rem'}}>¿Seguro de registrar asistencia?</p>
        </div>
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
        <Button className="btn-primary" color="primary" type="button" onClick={saveAssistance}>
          Confirmar
                </Button>
      </div>
    </Modal>);
}

export default connect(null, { listAssistance })(MarcarAsistencia)