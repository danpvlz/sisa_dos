import React, { useState, useEffect } from 'react';
import { Col, UncontrolledAlert } from "reactstrap";
import { useSelector } from "react-redux";

export default function Message() {
  const {error,message} = useSelector(({ commonData }) => commonData);
  const [show, setShow] = useState(false);

  useEffect(() => {
    error.length>0 &&
    setVisible(true)
    

  }, [error])

  useEffect(() => {
    message.length>0 &&
    setVisible(true)
  }, [message])

  const setVisible = () => {
    setShow(true);
    setTimeout(() => {
      setShow(false);
    }, 3000);
  }

  return (
    <Col lg="7" md="10" style={{ marginTop: '1rem', position: 'fixed', zIndex: 9, left: '50%', width: '100%', transform: 'translate(-50%, 0)' }} >
      <UncontrolledAlert color={error.length>0 ? "danger" : message.length>0 ? "success" : ""}isOpen={true} isOpen={show}>
        <span className="alert-inner--icon">
          <i className={error.length>0 ? "fa fa-exclamation-circle" : message.length>0 ? "ni ni-like-2" : ""} />
        </span>{" "}
        <span className="alert-inner--text">
          <strong>{error.length>0 ? "Error." : message.length>0 ? "¡Éxito!" : ""}</strong> {error.length>0 ? error : message.length>0 ? message : ""}
          </span>
      </UncontrolledAlert >
    </Col>
  )
}
