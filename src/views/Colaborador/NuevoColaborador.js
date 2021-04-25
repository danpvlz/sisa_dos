import React, { useState, useEffect } from "react";

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
import { showWorker, resetShowWorker, update, resetPassword } from "../../redux/actions/Colaborador";
import { useDispatch, useSelector } from "react-redux";
import ConfirmDialog from '../../components/Modals/ConfirmDialog';

const NuevoColaborador = (props) => {
  const dispatch = useDispatch();
  const { workerObject } = useSelector(({ colaborador }) => colaborador);
  const { register, handleSubmit, watch, reset } = useForm();
  const [file, setFile] = useState(null);
  const [fileSend, setfileSend] = useState(null);
  const [formdata, setformdata] = useState(null);
  const [confirm, setComfirm] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [actionresetpassword, setactionresetpassword] = useState(false);

  const history = useHistory();

  const hiddenFileInput = React.useRef(null);

  const handleOpenFileSearch = event => {
    hiddenFileInput.current.click();
  };

  const handleChange = event => {
    const fileUploaded = event.target.files[0];
    setfileSend(fileUploaded)
    setFile(fileUploaded ? URL.createObjectURL(fileUploaded) : null);
  };

  const onSubmit = (data) => {
    data.photo = fileSend;
    setformdata(data)
    toggleModal()
    /*hiddenFileInput.current.value = null;
    setFile(null);
    reset();*/
  };

  useEffect(() => {
    if (props.location.state?.workerSelected) {
      workerObject.length == 0 &&
        dispatch(showWorker(props.location.state.workerSelected));
    }
    return () => {
      dispatch(resetShowWorker());
    }
  }, [])

  useEffect(() => {
    if (confirm) {
      if(actionresetpassword){
        dispatch(resetPassword(props.location.state.workerSelected));
      }else{
        dispatch(update(props.location.state.workerSelected, formdata));
        history.push('/admin/colaborador');
      }
    }
    setComfirm(false);
  }, [confirm])

  const toggleModal = () => {
    setShowConfirm(!showConfirm);
  };

  const handleChangePassword = () => {
    setactionresetpassword(true);
    toggleModal();
  }
  return (
    <>
      <div className="header pb-8 pt-5 pt-lg-8 pt-md-8  d-flex align-items-center">
        <span className="mask bg-gradient-info opacity-8" />
      </div>
      {/* Page content */}
      <Container className="mt--7" fluid>
        <ConfirmDialog
          question={actionresetpassword ? '¿Seguro de resetear contraseña?' : `¿Seguro de actualizar datos?`}
          showConfirm={showConfirm}
          toggleModal={toggleModal}
          setConfirm={setComfirm} />
        <Row>
          <Col className="offset-xl-2" xl="8">
            <Card className="card-profile shadow bg-secondary">
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Row className="justify-content-center mb-5">
                  <Col className="mb-4" lg="3">
                    <input
                      type="file"
                      ref={hiddenFileInput}
                      name="photo"
                      onChange={handleChange}
                      style={{ display: 'none' }}
                    />
                    <div className="card-profile-image mb-4" style={{ cursor: 'pointer' }}>
                      <img
                        onClick={handleOpenFileSearch}
                        alt="..."
                        className="rounded-circle"
                        src={
                          file == null ?
                            workerObject?.foto == "" || workerObject?.foto == null ? require("../../assets/img/theme/default.png")
                              .default : process.env.REACT_APP_BASE + 'storage/colaborador/' + workerObject?.foto

                            :
                            file
                        }
                      />
                    </div>
                  </Col>
                </Row>
                <CardBody className="mt-6">
                  <h6 className="heading-small text-muted mb-4">
                    Información personal
                    </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-fullName"
                          >
                            Nombres
                            </label>
                          <Input
                            innerRef={register({ required: true })}
                            className="form-control-alternative"
                            id="input-fullName"
                            name="fullName"
                            type="text"
                            defaultValue={workerObject?.nombres}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-firstName"
                          >
                            Apellido paterno
                            </label>
                          <Input
                            innerRef={register({ required: true })}
                            className="form-control-alternative"
                            id="input-firstName"
                            name="firstName"
                            type="text"
                            defaultValue={workerObject?.paterno}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-secondName"
                          >
                            Apellido materno
                            </label>
                          <Input
                            innerRef={register({ required: true })}
                            className="form-control-alternative"
                            id="input-secondName"
                            name="secondName"
                            type="text"
                            defaultValue={workerObject?.materno}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-birthday"
                          >
                            Fecha de nacimiento
                            </label>
                          <Input
                            innerRef={register({ required: true })}
                            className="form-control-alternative"
                            id="input-birthday"
                            name="birthday"
                            type="date"
                            defaultValue={workerObject?.fNac}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  {/* Address */}
                  <h6 className="heading-small text-muted mb-4">
                    Información de usuario
                    </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-userName"
                          >
                            Usuario
                            </label>
                          <Input
                            innerRef={register({ required: true })}
                            className="form-control-alternative"
                            id="input-userName"
                            name="userName"
                            type="text"
                            defaultValue={workerObject?.usuario}
                          />
                        </FormGroup>
                      </Col>
                      {
                        workerObject.length != 0 ?
                          <Col lg="6" >
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-password"
                              >
                                Contraseña
                              </label>
                              <div className="text-center">
                                <Button className="btn-block" color="danger" type="button" onClick={handleChangePassword} >
                                  Resetear contraseña
                              </Button>
                              </div>

                            </FormGroup>
                          </Col> : ''
                      }
                    </Row>
                  </div>
                  <div className="text-center mt-3">
                    <Button className="my-4" color="success" type="submit">
                      Registrar
                      </Button>
                  </div>
                </CardBody>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>

    </>
  );
};

export default NuevoColaborador;
