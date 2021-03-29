import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";

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
import ConfirmDialog from '../../components/ConfirmDialog';
import { updatePassword } from "../../redux/actions/Auth";
import { useDispatch } from "react-redux";
export default function ChangePassword({authUser}) {
    const dispatch = useDispatch();
    const { register, handleSubmit, watch, reset } = useForm();

    const [showConfirm, setShowConfirm] = useState(false);
    const [confirm, setComfirm] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formdata, setformdata] = useState(null);

    const onsubmitChangePassword = (data) => {
        toggleModal()
        setformdata(data)
    }
    
    useEffect(() => {
        if(confirm){
            dispatch(updatePassword(formdata));
        }
        setComfirm(false);
    }, [confirm])
  
    const toggleModal = () => {
      setShowConfirm(!showConfirm);
    };
    return (
    <>
    <ConfirmDialog
      question={`¿Seguro cambiar contraseña?`}
      showConfirm={showConfirm}
      toggleModal={toggleModal}
      setConfirm={setComfirm} />
    <Form onSubmit={handleSubmit(onsubmitChangePassword)} autoComplete="off">
        <CardBody>
          <h6 className="heading-small text-muted mb-4">
            Información de usuario
          </h6>
          <div className="pl-lg-4">
            <Row>
              <Col lg="4">
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
                    name="userName"
                    type="text"
                    disabled
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
                    style={{ position: 'relative', }}>
                    <Input
                    innerRef={register({ required: true })}
                      className="form-control-alternative"
                      id="input-password"
                      name="password"
                      defaultValue=""
                      type={showPassword ? "text" : "password"}
                      style={{ position: 'absolute', zIndex: 1, paddingRight: '4rem' }}
                    />
                    <Button
                      className=" shadow"
                      style={{ position: 'absolute', zIndex: 3, right: 0 }}
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <i className={showPassword ? "fas fa-eye" : "fa fa-eye-slash"} />
                    </Button>
                  </div>
                </FormGroup>
              </Col>
              <Col lg="2" className="m-auto">
                <div className="text-center mt-lg-0 mt-5">
                  <Button color="success" type="submit">
                    <i className="fa fa-save" aria-hidden="true"></i>
                  </Button>
                </div>
              </Col>
            </Row>
          </div>
        </CardBody>
      </Form>
    </>
    )
}
