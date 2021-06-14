import React from 'react'
import {
    Button,
    Modal,
  } from "reactstrap";
const ConfirmDialog = ({ showConfirm, toggleModal, question, handleConfirm }) => {
    const doAction = () => {
        handleConfirm();
        toggleModal();
    }
    return (
        <Modal
            className="modal-dialog-centered"
            isOpen={showConfirm}
            toggle={toggleModal}
        >
            <div className="modal-body pb-0">
                <div className="pt-3 text-center">
                    <h4 className="text-primary" style={{ fontSize: '1.2rem' }}>{"Confirmar"}</h4>
                    <p style={{ fontSize: '1.2rem' }}>{question}</p>
                </div>
            </div>
            <div className="modal-footer">
                <Button
                    className="mr-auto"
                    color="link"
                    data-dismiss="modal"
                    type="button"
                    onClick={toggleModal}
                >
                    Cerrar
                      </Button>
                <Button className="btn-primary" color="primary" type="button" onClick={(e) => {e.preventDefault(); doAction();}}>
                    Confirmar
                      </Button>
            </div>
        </Modal>);
}
export default ConfirmDialog;