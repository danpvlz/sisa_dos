import React from 'react'
import {
  Button,
  FormGroup,
  Input,
  Row,
  Col,
  Modal,
} from "reactstrap";

const SetCodigoModal = ({ showSetCodigo, toggleModal, codigo,setcodigo, handleSendCodigo }) => {
  const saveJustification = () => {
    handleSendCodigo(); 
    toggleModal();
  }
  return (
    <Modal
      className="modal-dialog-centered"
      isOpen={showSetCodigo}
      toggle={toggleModal}
    >
      <div className="modal-header bg-secondary">
        <h3 className="modal-title">
          Modificar código
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
      <div className="modal-body pb-0 bg-secondary">
        <Row>
          <Col lg="12"  >
            <FormGroup className="mb-0 pb-4">
              <label
                className="form-control-label"
                htmlFor="filterMonth"
              >
                Código</label>
              <Input
                className="form-control-alternative text-center"
                name="codigo"
                value={codigo}
                onChange={(e) => {
                  setcodigo(e.target.value === "" ? null : e.target.value)
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


export default SetCodigoModal;