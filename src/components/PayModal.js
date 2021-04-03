import React from 'react'
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
  Modal,
} from "reactstrap";

const Justify = ({ showPay, toggleModal, setfecha, fecha, setmonto, monto, setsendPay }) => {
  const saveJustification = () => {
    setsendPay(true); 
    toggleModal();
  }
  return (
    <Modal
      className="modal-dialog-centered"
      isOpen={showPay}
      toggle={toggleModal}
    >
      <div className="modal-header bg-secondary">
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
      <div className="modal-body pb-0">
        <Row>
          <Col lg="6"  >
            <FormGroup className="mb-0 pb-4">
              <label
                className="form-control-label"
                htmlFor="filterMonth"
              >
                Mes</label>
              <Input
                className="form-control-alternative"
                placeholder="fechaPago"
                type="date"
                value={fecha}
                onChange={(e) => {
                  setfecha(e.target.value == "" ? null : e.target.value)
                }}
              />
            </FormGroup >
          </Col>
          <Col lg="6"  >
            <FormGroup className="mb-0 pb-4">
              <label
                className="form-control-label"
                htmlFor="filterMonth"
              >
                Monto</label>
              <Input
                className="form-control-alternative"
                name="monto"
                placeholder="s/."
                type="number"
                value={monto}
                onChange={(e) => {
                  setmonto(e.target.value == "" ? null : e.target.value)
                }}
              />
            </FormGroup >
          </Col>
        </Row>
      </div>
      <div className="modal-footer">
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


export default Justify;