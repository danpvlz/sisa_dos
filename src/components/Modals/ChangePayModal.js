import React,{useState,useEffect} from 'react'
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
import { fetchError, hideMessage } from '../../redux/actions/Common';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { update,listBills } from "../../redux/actions/Cuenta";

const ChangePayModal = ({ showPay, toggleModal, setsendPay,setbancopago, opciones }) => {
  const { register, handleSubmit, watch, reset } = useForm();
  const dispatch = useDispatch();
  const { pagos } = useSelector(({ cuenta }) => cuenta.comprobanteObject);
  const [formData, setformData] = useState({
    fecha:"",
    monto:"",
    banco:"",
  });
  useEffect(() => {
    if(pagos){
      setformData({
        fecha:pagos[pagos.length-1]?.fecha,
        monto:pagos[pagos.length-1]?.monto,
        banco:pagos[pagos.length-1]?.banco,
      });
    }
    return () => {
      setformData({
        fecha:"",
        monto:"",
        banco:"",
      });
    }
  }, [pagos]);

  const onSubmit = (data) => {
    if(formData.fecha==""){
      dispatch(fetchError("Debe seleccionar una fecha."))
    }else{
      if(formData.monto==""){
        dispatch(fetchError("Debe especificar un monto."))
      }else{
          if(pagos){
            dispatch(update(formData,pagos[pagos.length-1]?.idPago));
            setformData(null);
            toggleModal();
          }
          dispatch(hideMessage());
        
      }
    }
  };
  
  return (
    <Modal
      className="modal-dialog-centered"
      isOpen={showPay}
      toggle={toggleModal}
    >
      <div className="modal-header bg-secondary">
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
          <Col lg="6"  >
            <FormGroup className="mb-0 pb-4">
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
                  setformData({...formData,fecha:e.target.value})
                }}
                innerRef={register({ required: true })}
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
                className="form-control-alternative text-center"
                name="monto"
                placeholder="S/."
                type="number"
                value={formData?.monto}
                onChange={(e) => {
                  setformData({...formData,monto:e.target.value})
                }}
                innerRef={register({ required: true })}
              />
            </FormGroup >
          </Col>
          {
            opciones ? 
            <Col>
              <FormGroup className="mb-0 pb-4">
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
                  value={[{ value: 3, label: "Banco" }, { value: 4, label: "Contado" }].find(b=>b.value==formData?.banco)}
                  onChange={(e) => {
                    setformData({...formData,banco:e.value})
                  }}
                  isClearable
                  options={[{ value: 3, label: "Banco" }, { value: 4, label: "Contado" }]}
                  />
              </FormGroup >
            </Col>
            :
            <Col>
              <FormGroup className="mb-0 pb-4">
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
                  value={[{ value: 1, label: "BCP" }, { value: 2, label: "BBVA" }].find(b=>b.value==formData?.banco)}
                  onChange={(e) => {
                    setformData({...formData,banco:e.value})
                  }}
                  isClearable
                  options={[{ value: 1, label: "BCP" }, { value: 2, label: "BBVA" }]} />
              </FormGroup >
            </Col>
          }
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
        <Button className="btn-primary" color="success" type="submit">
          Actualizar
          </Button>
      </div>
      </Form>
    </Modal>);
}


export default ChangePayModal;