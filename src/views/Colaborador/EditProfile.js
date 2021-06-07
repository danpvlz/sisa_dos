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
} from "reactstrap";
import ChangePassword from './ChangePassword';
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import ConfirmDialog from '../../components/Modals/ConfirmDialog';
import { useDispatch } from "react-redux";

import { update } from "../../redux/actions/Colaborador";
import { getUser } from "../../redux/actions/Auth";

const EditProfile = () => {
  const dispatch = useDispatch();
  const { authUser } = useSelector(({ auth }) => auth);
  const { register, handleSubmit } = useForm();
  const [file, setFile] = useState(process.env.REACT_APP_BASE + 'storage/colaborador/'+authUser.foto);
  const [fileSend, setfileSend] = useState(null);
  const [confirm, setComfirm] = useState(false);
  const [formdata, setformdata] = useState(null);

  const [showConfirm, setShowConfirm] = useState(false);
  
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
    data.photo =fileSend;
    setformdata(data)
    toggleModal()
    /*hiddenFileInput.current.value = null;
    setFile(null);
    reset();*/
  };
  
  useEffect(() => {
      if(confirm){
          dispatch(update(authUser.idColaborador,formdata));
          dispatch(getUser())
      }
      setComfirm(false);
  }, [confirm,authUser,formdata,dispatch])

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
        question={`¿Seguro de actualizar datos?`}
        showConfirm={showConfirm}
        toggleModal={toggleModal}
        setConfirm={setComfirm} />
        <Row>
          <Col className="offset-xl-2" xl="8">
            <Card className="card-profile shadow bg-secondary">
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Row className="justify-content-center">
                  <Col className="mb-4" lg="3">
                    <input
                      type="file"
                      ref={hiddenFileInput}
                      name="photo"
                      onChange={handleChange}
                      style={{ display: 'none' }}
                    />
                    <div className="card-profile-image" style={{ cursor: 'pointer' }}>
                      <img
                        onClick={handleOpenFileSearch}
                        alt="..."
                        className="rounded-circle"
                        src={
                          file == null || file === "" ?
                            require("../../assets/img/theme/default.png")
                              .default
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
                            defaultValue={authUser.nombres}
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
                            defaultValue={authUser.paterno}
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
                            defaultValue={authUser.materno}
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
                            defaultValue={authUser.fNac}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <div className="text-center mt-3">
                    <Button className="my-4" color="success" type="submit">
                      Actualizar
                    </Button>
                  </div>
                  <hr className="my-4" />
                </CardBody>
              </Form>
              <ChangePassword authUser={authUser} />
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default EditProfile;
