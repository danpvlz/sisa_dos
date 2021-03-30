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
import ConfirmDialog from '../../components/ConfirmDialog';
import { useForm } from "react-hook-form";

//import { listAssistance } from '../../redux/actions/Asistencia';
// core components

const MarcarAsistencia = () => {
  const { register, handleSubmit } = useForm();
  const [dateNow, setDateNow] = useState(new Date().toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }));
  const [type, setType] = useState(1);

  const [showConfirm, setShowConfirm] = useState(false);
  const [showJustify, setShowJustify] = useState(false);
  const [sendAssistance, setSendAssistance] = useState(false);
  const [sendJustification, setSendJustification] = useState(false);

  const [formData, setFormData] = useState(null);

  const getDateNow = () => {
    let now = new Date();
    setDateNow(now.toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }))
  }

  const toggleModal = () => {
    //listAssistance()
    setShowConfirm(!showConfirm);
  };

  const toggleModalJustify = () => {
    setShowJustify(!showJustify);
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
      <div className="header py-8  d-flex align-items-center">
        <span className="mask bg-gradient-info opacity-8" />
      </div>
      {/* Page content */}
      <Container className="mt--8" fluid>
        <Row>
          <Col className="offset-xl-2" xl="8">
            <Card className="card-profile shadow bg-secondary">
              <CardBody >
                <Form id="form-check-assistance" onSubmit={handleSubmit(onSubmit)}>
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

                </Form>
                <hr></hr>
                <Row className="mt-3">
                  <Col className="text-center mb-4" lg="3">
                    <div>
                      <span>
                        Entrada
                          <small className="d-flex justify-content-center font-weight-bold">Normal</small>
                      </span>
                      <div className="form-control-alternative text-center assistance-input text-center">

                        {"8:00:00am"}
                      </div>
                    </div>
                  </Col>
                  <Col className="text-center mb-4" lg="3">
                    <div>
                      <span>
                        Salida
                        <small className="d-flex justify-content-center font-weight-bold">Falta</small>
                      </span>
                      <div className="form-control-alternative text-center assistance-input text-center">
                        {"3:30:00pm"}
                      </div>
                      <Button onClick={toggleModalJustify} className="mt-2" block color="warning" size="sm" type="button">
                        Justificar
                      </Button>
                    </div>
                  </Col>
                  <Col className="text-center mb-4" lg="3">
                    <div>
                      <span>
                        Entrada
                          <small className="d-flex justify-content-center font-weight-bold ">Tardanza</small>
                      </span>
                      <div className="form-control-alternative text-center assistance-input text-center">
                        {"3:40:00pm"}
                      </div>
                    </div>
                  </Col>
                  <Col className="text-center mb-4" lg="3">
                    <div>
                      <span>
                        Salida
                          <small className="d-flex justify-content-center font-weight-bold">Compensó</small>
                      </span>
                      <div className="form-control-alternative text-center assistance-input text-center">
                        {"8:00:00pm"}
                      </div>
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
      <ConfirmDialog 
      question="¿Seguro de registrar asistencia?"
      showConfirm={showConfirm} toggleModal={toggleModal} setConfirm={setSendAssistance} />
      <Justify showJustify={showJustify} toggleModal={toggleModalJustify} setSendJustification={setSendJustification} />
    </>
  );
};

const Justify = ({ showJustify, toggleModal, setSendJustification }) => {
  const saveJustification = () => {
    setSendJustification(true); toggleModal();
  }
  return (
    <Modal
      className="modal-dialog-centered"
      isOpen={showJustify}
      toggle={toggleModal}
    >
      <div className="modal-body pb-0">
      <Input type="textarea" placeholder="Especifica el motivo por el que no pudiste marcar asistencia." rows={3} />
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
        <Button className="btn-primary" color="primary" type="button" onClick={saveJustification}>
          Guardar
                </Button>
      </div>
    </Modal>);
}

export default MarcarAsistencia;