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
import React, {useState} from "react";

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

const Profile = () => {
  const [file, setFile]=useState(null);
  
  const hiddenFileInput = React.useRef(null);
  
  // Programatically click the hidden file input element
  // when the Button component is clicked
  const handleClick = event => {
    hiddenFileInput.current.click();
  };
  // Call a function (passed as a prop from the parent component)
  // to handle the user-selected file 
  const handleChange = event => {
    const fileUploaded = event.target.files[0];
    setFile(URL.createObjectURL(fileUploaded));
  };
  return (
    <>
      <div className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"> 
        <span className="mask bg-gradient-info opacity-8" />
      </div>
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="offset-xl-2" xl="8">
            <Card className="card-profile shadow bg-secondary">
              <Row className="justify-content-center mb-5">
                <Col className="order-lg-2" lg="3">
                  <input
                    type="file"
                    ref={hiddenFileInput}
                    onChange={handleChange}
                    style={{display: 'none'}} 
                  />
                  <div className="card-profile-image" style={{cursor:'pointer'}}>
                    <img
                      onClick={handleClick}
                        alt="..."
                        className="rounded-circle"
                        src={
                          file==null ?
                          require("../../assets/img/theme/default.png")
                            .default
                          :
                          file
                        }
                    />
                  </div>
                </Col>
              </Row>
              <CardBody className="mt-5">
                <Form>
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
                            className="form-control-alternative"
                            id="input-fullName"
                            type="text"
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
                            className="form-control-alternative"
                            id="input-firstName"
                            type="text"
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
                            className="form-control-alternative"
                            id="input-secondName"
                            type="text"
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
                            className="form-control-alternative"
                            id="input-birthday"
                            type="date"
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
                            className="form-control-alternative"
                            id="input-userName"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-password"
                          >
                            Contraseña
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-password"
                            type="password"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <div className="text-center mt-3">
                <Button className="my-4" color="success" type="button">
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

export default Profile;
