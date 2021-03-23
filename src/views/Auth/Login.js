import React, { useEffect, useCallback } from "react";
import { useHistory } from 'react-router-dom';

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";

import { useForm } from "react-hook-form";

import { useDispatch, useSelector } from "react-redux";
import { userSignIn } from "../../redux/actions/Auth";

const Login = (props) => {
  const dispatch = useDispatch();
  const token = useSelector(({ auth }) => auth.token);
  
  const { register, handleSubmit } = useForm();

  const history = useHistory();
  const handleOnClick = useCallback(() => history.push('/index'), [history]);

  useEffect(() => {
    if (token !== null) {
      props.history.push("/index");
    }
  }, [token, props.history]);

  const onSubmit  = (values) => {
    console.log(values);
    //dispatch(userSignIn(values));
  };

  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <Form role="form" onSubmit={handleSubmit(onSubmit)}>
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
                <Button className="my-4" color="primary" type="submit">
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
