import React, {useState,useEffect} from "react";

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
import { useHistory } from 'react-router-dom';
import { useForm } from "react-hook-form";
import SearchAsociado from "components/Selects/SearchAsociado.js";
import { useDispatch, useSelector } from "react-redux";
import ConfirmDialog from '../../components/Modals/ConfirmDialog';
import {savePhoneCall} from '../../redux/actions/Llamada';
import {showAssociated,clearShowAssociated} from '../../redux/actions/Asociado';
const RegistroLlamada = () => {
  const dispatch = useDispatch();
  const { associatedObject } = useSelector(({ asociado }) => asociado);
  const history = useHistory();
  const [idAsociado, setIdAsociado] = useState(null);
  const { register, handleSubmit, watch, reset } = useForm();
  const [formdata, setformdata] = useState(null);
  const [confirm, setComfirm] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const onSubmit = (data) => {
    setformdata(data)
    toggleModal()
    /*hiddenFileInput.current.value = null;
    setFile(null);
    reset();*/
  };

  useEffect(() => {
    if(idAsociado!=null){
      dispatch(showAssociated(idAsociado));
    }
  }, [idAsociado]);

  useEffect(() => {
    if (confirm) {
      formdata.idAsociado=idAsociado;
      dispatch(savePhoneCall(formdata));
      history.push('/admin/llamadas');
    }
    setComfirm(false);
  }, [confirm]);

  const toggleModal = () => {
    setShowConfirm(!showConfirm);
  };

  return (
    <>
      <div className="header pb-8 pt-5 pt-lg-8 pt-md-8  d-flex align-items-center">
        <span className="mask bg-gradient-info opacity-8" />
      </div>
      {/* Page content */}
      <Container className="mt--7" fluid>
        <ConfirmDialog
          question={'¿Seguro de registrar llamada?'}
          showConfirm={showConfirm}
          toggleModal={toggleModal}
          setConfirm={setComfirm} />
        <Row>
          <Col className="order-xl-1" xl="12">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="justify-content-between">
                          <Col lg="6">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-address"
                              >
                                Asociado
                              </label>
                              <SearchAsociado  setVal={setIdAsociado}/>
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
                                value={idAsociado ? associatedObject[0]?.codigo : ""}
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
                                value={idAsociado ? associatedObject[0]?.descripcion : ""}
                                disabled
                              />
                            </FormGroup>
                          </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form onSubmit={handleSubmit(onSubmit)}>
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
                                id="input-date"
                                type="date"
                                name="fecha"
                                innerRef={register({ required: true })}
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
                                id="input-hini"
                                name="horaInicio"
                                innerRef={register({ required: true })}
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
                                id="input-hfin"
                                name="horaFin"
                                innerRef={register({ required: true })}
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
                                id="input-detail"
                                name="detalle"
                                innerRef={register({ required: true })}
                                type="text"
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                      </div>
                    </Col>
                  </Row>
                  <div className="text-center ">
                    <Button className="my-4 " color="primary" type="submit" disabled={idAsociado?false:true}>
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
