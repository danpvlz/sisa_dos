/*!

=========================================================
* Argon Dashboard React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useState } from "react";

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
import { useForm } from "react-hook-form";
// core components
import { useSelector } from "react-redux";

const EditProfile = () => {
  const { authUser } = useSelector(({ auth }) => auth);
  const { register, handleSubmit, watch, reset  } = useForm();
  const [file, setFile] = useState(authUser.foto);
  const [showPassword, setShowPassword]=useState(false);

  const hiddenFileInput = React.useRef(null);
  
  const handleOpenFileSearch = event => {
    hiddenFileInput.current.click();
  };
  
  const handleChange = event => {
    const fileUploaded = event.target.files[0];
    setFile(fileUploaded ? URL.createObjectURL(fileUploaded) : null);
  };

  const onSubmit  = (data) => {
    data.photo=hiddenFileInput.current.value;
    console.log(data);
    /*hiddenFileInput.current.value = null;
    setFile(null);
    reset();*/
  };
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
                    <div className="card-profile-image" style={{ cursor: 'pointer' }}>
                      <img
                        onClick={handleOpenFileSearch}
                        alt="..."
                        className="rounded-circle"
                        src={
                          file == null ?
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
                            defaultValue={authUser.usuario}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6" >
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-password"
                          >
                            Contraseña
                          </label>
                          <div 
                            style={{position:'relative',}}>
                          <Input
                            innerRef={register({ required: true })} 
                            className="form-control-alternative"
                            id="input-password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            style={{position:'absolute', zIndex:1, paddingRight:'4rem'}}
                          />
                          <Button
                            className=" shadow"
                            style={{position:'absolute', zIndex:3, right:0}}
                            onClick={()=>setShowPassword(!showPassword)}
                          >
                            <i className={showPassword ? "fas fa-eye" : "fa fa-eye-slash"}  />
                          </Button>
                          </div>
                        </FormGroup>
                      </Col>
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

export default EditProfile;
