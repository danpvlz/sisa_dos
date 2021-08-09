import React, { useEffect, useState } from "react";
// reactstrap components
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Col,
} from "reactstrap";

import { useForm } from "react-hook-form";

import { useDispatch } from "react-redux";
import { userSignIn } from "../../redux/actions/Auth";
import Recaptcha from "react-recaptcha";

const Login = (props) => {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [allowSubmit, setallowSubmit] = useState(false);
  
  /*CAPTCHA*/
  let captchaDemo;
  const verifyCallback = function (response) {
    setallowSubmit(true);
  };

  var callback = () => {
    if (captchaDemo) {
        captchaDemo.reset();
        captchaDemo.execute();
    }
  };

  useEffect(() => {
    if (captchaDemo) {
      captchaDemo.reset();
      captchaDemo.execute();
    }
    // eslint-disable-next-line
  },[])
   
  /*CAPTCHA*/

  const onSubmit  = (values) => {
    if(allowSubmit){
      dispatch(userSignIn(values));
    }
  };

  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <Form id="someForm" role="form" onSubmit={handleSubmit(onSubmit)} autoComplete="on">
              <Recaptcha
                ref={e => captchaDemo = e}
                size="invisible"
                render="explicit"
                sitekey={process.env.REACT_APP_CAPTCHA_KEY}
                onloadCallback={callback}
                verifyCallback={verifyCallback}
              />
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-single-02" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Usuario"
                    type="text"
                    name="userName"
                    autoComplete="on"
                    required
                    innerRef={register({ required: true })} 
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Contraseña"
                    type="password"
                    name="password"
                    autoComplete="on"
                    required
                    innerRef={register({ required: true })} 
                  />
                </InputGroup>
              </FormGroup>
              <div className="custom-control custom-control-alternative custom-checkbox">
                <input
                  className="custom-control-input"
                  id="customCheckLogin"
                  type="checkbox"
                  name="remember"
                  ref={register}
                />
                <label
                  className="custom-control-label"
                  htmlFor="customCheckLogin"
                >
                  <span className="text-muted">Recuérdame</span>
                </label>
              </div>
              <div className="text-center">
                <Button className="my-4" color="primary" disabled={!allowSubmit} type="submit" >
                  Ingresar
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default Login;
