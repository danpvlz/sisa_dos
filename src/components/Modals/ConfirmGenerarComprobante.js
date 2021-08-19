import React, { useState } from 'react'
import {
    Button,
    Modal,
    Row,
    Col,
    FormGroup,
    Input,
} from "reactstrap";
import Select from 'react-select';
const ConfirmGenerarComprobante = ({ showConfirm, toggleModal, handleConfirm, infoReserva,setinfoReserva }) => {
    const [error, seterror] = useState(false);

    const doAction = () => {
        if (infoReserva.pagado && (infoReserva.banco == null || infoReserva.sofdoc == null || infoReserva.monto == null)) {
            seterror(true);
        } else {
            handleConfirm();
            toggleModal();

            //reset
            seterror(false);
            setinfoReserva({
                pagado: false,
                banco: null,
                sofdoc: null,
                monto: null,
            });
        }
    }

    return (
        <Modal
            className="modal-dialog-centered"
            isOpen={showConfirm}
            toggle={toggleModal}
            size="lg"
        >
            <div className="modal-header">
                <div className="w-100 text-center">
                    <h4 className="text-primary" style={{ fontSize: '1.2rem' }}>{"Confirmar"}</h4>
                    <p style={{ ontSize: '1.2rem', margin: '0'}}>¿Solicitar generar comprobante?</p>
                </div>
            </div>
            <div className="modal-body pb-0">
                <Row className="justify-content-center">
                    {
                        error &&
                        <div className="col-12 text-center mb-3">
                            <small className="text-danger d-block"><strong>Debe completar todos los campos</strong></small>
                        </div>
                    }
                    <Col lg="3">
                        <FormGroup>
                            <Select
                                placeholder="¿Pagado?"
                                className="select-style"
                                name="paidOut"
                                id="paidOut"
                                isClearable
                                options={[{ value: true, label: "Sí" }, { value: false, label: "No" }]}
                                onChange={(inputValue, actionMeta) => {
                                    setinfoReserva({ ...infoReserva, pagado: inputValue?.value ? inputValue.value : false });
                                }}
                            />
                        </FormGroup>
                    </Col>
                    {infoReserva.pagado === true ?
                        <>
                            <Col lg="3">
                                <FormGroup>
                                    <Select
                                        placeholder="Banco"
                                        className="select-style"
                                        name="option"
                                        id="option"
                                        options={[{ value: 1, label: "BCP" }, { value: 2, label: "BBVA" }]}
                                        onChange={(inputValue, actionMeta) => {
                                            setinfoReserva({ ...infoReserva, banco: inputValue?.value });
                                        }}
                                    />
                                </FormGroup>
                            </Col>
                            <Col lg="3">
                                <FormGroup>
                                    <Input
                                        className="form-control-alternative"
                                        name="numsofydoc"
                                        type="text"
                                        placeholder="Num. de SOFYDOC"
                                        onChange={(e) => {
                                            setinfoReserva({ ...infoReserva, sofdoc: e.target.value });
                                        }}
                                    />
                                </FormGroup>
                            </Col>
                            <Col lg="3">
                                <FormGroup>
                                    <Input
                                        className="form-control-alternative text-center"
                                        name="monto"
                                        type="text"
                                        placeholder="S/. Monto"
                                        onChange={(e) => {
                                            setinfoReserva({ ...infoReserva, monto: e.target.value });
                                        }}
                                    />
                                </FormGroup>
                            </Col>
                        </>
                        : ""}
                </Row>
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
                <Button
                    className="btn-primary"
                    color="primary"
                    type="button"
                    onClick={(e) => { e.preventDefault(); doAction(); }}>
                    Confirmar
                </Button>
            </div>
        </Modal>);
}
export default ConfirmGenerarComprobante;