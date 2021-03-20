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
import React, { useState, useEffect } from "react";

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
import Select from 'react-select';
import { useForm } from "react-hook-form";
// core components

const MarcarAsistencia = () => {
  const { register, handleSubmit, watch, reset  } = useForm();
  const [file, setFile] = useState(null);
  const [showPassword, setShowPassword]=useState(false);
  const [dateNow,setDateNow]=useState(null);
  const getDateNow=()=>{
    let now=new Date();
    setDateNow(now.toLocaleString('en-US', {  hour: '2-digit', minute:'2-digit', second: '2-digit',hour12: true }))
    /*
    let hours = now.getHours();
    let minutes = format(now.getMinutes())
    let seconds = format(now.getSeconds())
    setDateNow(hours+':'+minutes+':'+seconds)*/
    
  }

  const format = (time)=>{
    return time<10 ? '0'+ time : time;
  }

  useEffect(() => {
    setInterval(() => {
      getDateNow()
    }, 1000);
  }, [])

  const hiddenFileInput = React.useRef(null);
  
  const handleOpenFileSearch = event => {
    hiddenFileInput.current.click();
  };
  
  const handleChange = event => {
    const fileUploaded = event.target.files[0];
    console.log(fileUploaded)
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
                            htmlFor="input-address"
                          >
                            Tipo
                          </label>
                          <Select 
                          placeholder="Seleccione..."
                          className="select-style"
                          name="typeAsociado"
                          onChange={(inputValue, actionMeta) => {
                              console.log(inputValue.value);
                          }}
                          options={[{value: 1, label:"Entrada"},{value: 2, label:"Salida"}]} />
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
                            innerRef={register({ required: true })} 
                            className="form-control-alternative"
                            id="input-observacion"
                            name="observacion"
                            type="textarea"
                          />
                        </FormGroup><div className="text-center mt-3">
                    <Button className="my-4" color="success" type="submit">
                      Registrar
                    </Button>
                  </div>
                      </Col>
                    </Row>
                  </Col>
                </Row >
                <Row>
                  <Col>
                  HOOOOOY
                  </Col>
                </Row>
                </CardBody>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default MarcarAsistencia;
