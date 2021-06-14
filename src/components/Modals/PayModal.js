import React, { useState } from 'react'
import {
  Button,
  FormGroup,
  Input,
  Row,
  Col,
  Modal,
} from "reactstrap";
import Select from 'react-select';

const PayModal = ({ showPay, toggleModal, setfecha, fecha, setmonto, monto, handlePay, setbancopago, fechasince, numoperacion, setNumOperacion, numsofdoc, setNumSofdoc, setMontoPaid, montoPaid, opciones }) => {
  const [error, seterror] = useState({
    fecha: false,
    monto: false,
    numOperacion: false,
    montoPaid: false,
  });
  const saveJustification = () => {
    if (fecha === "") {
      seterror({ ...error, fecha: true });
    } else {
      if (monto === "") {
        seterror({ ...error, monto: true });
      } else {
        if (montoPaid === "") {
          seterror({ ...error, montoPaid: true });
        } else {
          if (numoperacion === "" && numsofdoc === "") {
            seterror({ ...error, numOperacion: true });
          } else {
            handlePay();
            toggleModal();
          }
        }
      }
    }
  }
  return (
    <Modal
      className="modal-dialog-centered"
      isOpen={showPay}
      toggle={toggleModal}
    >
      <div className="modal-header bg-secondary mb--4">
        <h3 className="modal-title">
          Pagar
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
      <div className="modal-body bg-secondary">
        <Row>
          <Col lg="12" className="my-4">
            <Row className="mt-0">
              <Col lg="12" className="mt-0">
                <h6 className="heading-small text-muted">
                  <i className="ni ni-money-coins mr-2 my-auto" /> Pago
                </h6>
              </Col>
              <Col lg="6"  className="mt-0">
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
                    value={fecha}
                    min={fechasince}
                    max={new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60000)).toISOString().split('T')[0]}
                    onChange={(e) => {
                      setfecha(e.target.value === "" ? null : e.target.value);
                      seterror({ ...error, fecha: false });
                    }}
                  />
                </FormGroup >
                {
                  error.fecha &&
                  <span className="text-danger text-center text-sm mx-auto mt-0"> Debe especificar la fecha. </span>
                }
              </Col>
              <Col lg="6"  className="mt-0">
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
                    value={monto}
                    onChange={(e) => {
                      setmonto(e.target.value);
                      seterror({ ...error, monto: false });
                    }}
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
            <Row>
              <Col lg="12" className="mt-0 mb-0">
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
                        onChange={(inputValue, actionMeta) => {
                          setbancopago(inputValue != null ? inputValue.value : null);
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
                        onChange={(inputValue, actionMeta) => {
                          setbancopago(inputValue != null ? inputValue.value : null);
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
                      setMontoPaid(e.target.value);
                      seterror({ ...error, montoPaid: false });
                    }}
                    value={montoPaid}
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
                    value={numoperacion}
                    onChange={(e, actionMeta) => {
                      setNumOperacion(e.target.value);
                      seterror({ ...error, numOperacion: false });
                    }}
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
                    value={numsofdoc}
                    onChange={(e, actionMeta) => {
                      setNumSofdoc(e.target.value);
                      seterror({ ...error, numOperacion: false });
                    }}
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
      <div className="modal-footer bg-secondary">
        <Button
          className="mr-auto"
          color="green"
          data-dismiss="modal"
          type="button"
          onClick={toggleModal}
        >
          Cerrar
          </Button>
        <Button className="btn-primary" color="success" type="button" onClick={saveJustification}>
          Registrar
          </Button>
      </div>
    </Modal>);
}


export default PayModal;