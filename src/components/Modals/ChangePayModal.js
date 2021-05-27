import React, { useState, useEffect } from 'react'
import {
  Button,
  FormGroup,
  Input,
  Row,
  Col,
  Modal,
  Form,
} from "reactstrap";
import Select from 'react-select';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { update } from "../../redux/actions/Cuenta";

const ChangePayModal = ({ showPay, toggleModal, setsendPay, setbancopago, opciones }) => {
  const { register, handleSubmit, watch, reset } = useForm();
  const dispatch = useDispatch();
  const { pagos } = useSelector(({ cuenta }) => cuenta.comprobanteObject);
  const [error, seterror] = useState({
    fecha: false,
    monto: false,
    numOperacion: false,
    montoPaid: false,
  });
  const [formData, setformData] = useState({
    fecha: "",
    monto: "",
    banco: "",
    numoperacion: "",
    numsofdoc: "",
    montoPaid: "",
  });
  useEffect(() => {
    if (pagos) {
      setformData({
        fecha: pagos[pagos.length - 1]?.fecha,
        monto: pagos[pagos.length - 1]?.monto,
        banco: pagos[pagos.length - 1]?.banco,
        numoperacion: pagos[pagos.length - 1]?.numoperacion,
        numsofdoc: pagos[pagos.length - 1]?.numsofdoc,
        montoPaid: pagos[pagos.length - 1]?.montoPaid,
      });
    }
    return () => {
      setformData({
        fecha: "",
        monto: "",
        banco: "",
        numoperacion: "",
        numsofdoc: "",
        montoPaid: "",
      });
    }
  }, [pagos]);

  const onSubmit = (data) => {
    if (formData.fecha == "") {
      seterror({ ...error, fecha: true });
    } else {
      if (formData.monto == "") {
        seterror({ ...error, monto: true });
      } else {
        if (formData.montoPaid == "" || formData.montoPaid == null) {
          seterror({ ...error, montoPaid: true });
        } else {
          if (formData.numoperacion == "" && formData.numsofdoc == "") {
            seterror({ ...error, numOperacion: true });
          } else {
            if (formData.numoperacion == null && formData.numsofdoc == null) {
              seterror({ ...error, numOperacion: true });
            } else {
              if (pagos) {
                dispatch(update(formData, pagos[pagos.length - 1]?.idPago));
                setformData({
                  fecha: "",
                  monto: "",
                  banco: "",
                  numoperacion: "",
                  numsofdoc: "",
                  montoPaid: "",
                });
                toggleModal();
              }
            }
          }
        }
      }
    }
  };

  return (
    <Modal
      className="modal-dialog-centered"
      isOpen={showPay}
      toggle={toggleModal}
    >
      <div className="modal-header bg-secondary mb--4">
        <h3 className="modal-title">
          Modificar pago
        </h3>
        <button
          aria-label="Close"
          className="close"
          data-dismiss="modal"
          type="button"
          onClick={toggleModal}
        >
          <span aria-hidden={true}>×</span>
        </button>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className="modal-body pb-0">
          <Row>
            <Col lg="12" className="my-4">
              <Row className="mt-0">
                <Col lg="12" className="mt-0">
                  <h6 className="heading-small text-muted">
                    <i className="ni ni-money-coins mr-2 my-auto" /> Pago
                </h6>
                </Col>
                <Col lg="6">
                  <FormGroup className="mb-0">
                    <label
                      className="form-control-label"
                      htmlFor="filterMonth"
                    >
                      Fecha</label>
                    <Input
                      className="form-control-alternative"
                      placeholder="fechaPago"
                      type="date"
                      value={formData?.fecha}
                      max={new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60000)).toISOString().split('T')[0]}
                      onChange={(e) => {
                        setformData({ ...formData, fecha: e.target.value });
                        seterror({ ...error, fecha: false });
                      }}
                      innerRef={register({ required: true })}
                    />
                  </FormGroup >
                  {
                    error.fecha &&
                    <span className="text-danger text-center text-sm mx-auto mt-0"> Debe especificar la fecha. </span>
                  }
                </Col>
                <Col lg="6" >
                  <FormGroup className="mb-0">
                    <label
                      className="form-control-label"
                      htmlFor="filterMonth"
                    >
                      Monto</label>
                    <Input
                      className="form-control-alternative text-center"
                      name="monto"
                      placeholder="S/."
                      type="number"
                      value={formData?.monto}
                      onChange={(e) => {
                        setformData({ ...formData, monto: e.target.value })
                        seterror({ ...error, monto: false });
                      }}
                      innerRef={register({ required: true })}
                    />
                  </FormGroup >
                  {
                    error.monto &&
                    <span className="text-danger text-center text-sm mx-auto mt-0"> El monto debe ser mayor a cero. </span>
                  }
                </Col>
              </Row>
            </Col>
            <Col lg="12" className="my-4">
              <Row className="mt-0">
                <Col lg="12" className="mt-0">
                  <h6 className="heading-small text-muted">
                    <i className="ni ni-money-coins mr-2 my-auto" /> Transacción
                </h6>
                </Col>
                {
                  opciones ?
                    <Col lg="6">
                      <FormGroup className="mb-0">
                        <label
                          className="form-control-label"
                          htmlFor="filterMonth"
                        >
                          Medio de pago
                        </label>
                        <Select
                          placeholder="Seleccione..."
                          className="select-style"
                          name="opciones"
                          value={[{ value: 3, label: "Banco" }, { value: 4, label: "Contado" }].find(b => b.value == formData?.banco)}
                          onChange={(e) => {
                            setformData({ ...formData, banco: e.value })
                          }}
                          isClearable
                          options={[{ value: 3, label: "Banco" }, { value: 4, label: "Contado" }]}
                        />
                      </FormGroup >
                    </Col>
                    :
                    <Col lg="6">
                      <FormGroup className="mb-0">
                        <label
                          className="form-control-label"
                          htmlFor="filterMonth"
                        >
                          Banco
                        </label>
                        <Select
                          placeholder="Seleccione..."
                          className="select-style"
                          name="banco"
                          value={[{ value: 1, label: "BCP" }, { value: 2, label: "BBVA" }].find(b => b.value == formData?.banco)}
                          onChange={(e) => {
                            setformData({ ...formData, banco: e.value })
                          }}
                          isClearable
                          options={[{ value: 1, label: "BCP" }, { value: 2, label: "BBVA" }]} />
                      </FormGroup >
                    </Col>
                }
                <Col lg="6" >
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-address"
                    >
                      Monto del pago
                    </label>
                    <Input
                      className="form-control-alternative text-center"
                      name="montoPaid"
                      type="number"
                      min="0"
                      step="any"
                      placeholder="S/."
                      onChange={(e) => {
                        setformData({ ...formData, montoPaid: e.target.value })
                        seterror({ ...error, montoPaid: false });
                      }}
                      value={formData?.montoPaid}
                    />
                  </FormGroup>
                  {
                    error.montoPaid &&
                    <span className="text-danger text-center text-sm mx-auto mt-0"> Debe especificar el monto total de la transacción. </span>
                  }
                </Col>
                <Col lg="6" >
                  <FormGroup className="mb-0">
                    <label
                      className="form-control-label"
                      htmlFor="filterMonth"
                    >
                      Num. Operación</label>
                    <Input
                      className="form-control-alternative"
                      type="text"
                      value={formData?.numoperacion}
                      onChange={(e) => {
                        setformData({ ...formData, numoperacion: e.target.value });
                        seterror({ ...error, numOperacion: false });
                      }}
                      innerRef={register({ required: false })}
                    />
                  </FormGroup >
                </Col>
                <Col lg="6">
                  <FormGroup className="mb-0">
                    <label
                      className="form-control-label"
                      htmlFor="filterMonth"
                    >
                      Num. SOFDOC</label>
                    <Input
                      className="form-control-alternative"
                      type="text"
                      value={formData?.numsofdoc}
                      onChange={(e) => {
                        setformData({ ...formData, numsofdoc: e.target.value });
                        seterror({ ...error, numOperacion: false });
                      }}
                      innerRef={register({ required: false })}
                    />
                  </FormGroup >
                </Col>
                {
                  error.numOperacion &&
                  <Col lg="12" className="mt-0 text-center">
                    <span className="text-danger text-center text-sm mx-auto mt-0"> Debe indicar el número de comprobante o el num de SOFYDOC. </span>
                  </Col>
                }
              </Row>
            </Col>
          </Row>
        </div>
        <div className="modal-footer mt-4">
          <Button
            className="mr-auto"
            color="green"
            data-dismiss="modal"
            type="button"
            onClick={toggleModal}
          >
            Cerrar
          </Button>
          <Button className="btn-primary" color="success" type="submit">
            Actualizar
          </Button>
        </div>
      </Form>
    </Modal>);
}


export default ChangePayModal;