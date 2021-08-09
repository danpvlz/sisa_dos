import React, { useState, useEffect } from 'react';
import { Col, Alert } from "reactstrap";
import { useSelector } from "react-redux";

export default function Message() {
  const { error, success, message } = useSelector(({ commonData }) => commonData);
  const [show, setShow] = useState(false);
  const [showmessage, setshowmessage] = useState(null)
  const [type, settype] = useState(0)

  const setVisible = () => {
    setShow(true);
    setTimeout(() => {
      setShow(false);
      settype(0);
      setshowmessage(null);
    }, 3000);
  }

  useEffect(() => {
    if (error) {
      settype(1);
      if (typeof message === "string") {
        setVisible(true);
        setshowmessage(message);
      } else {
        message?.message ? setVisible(true) : setVisible(false);
        setshowmessage(message?.message ? message.message : "");

        if (message?.message === "Request failed with status code 401") {
          window.location.reload();
        }

      }
    } else {
      if (success) {
        setVisible(true)
        settype(2)
        setshowmessage(message)
      }
    }
  }, [error, success, message])

  return (
    <Col lg="7" md="10" style={{ marginTop: '1rem', position: 'fixed', zIndex: 9, left: '50%', width: '100%', transform: 'translate(-50%, 0)' }} >
      <Alert color={type === 1 ? "danger" : type === 2 ? "success" : ""} isOpen={show} toggle={() =>setShow(false)}>
        <span className="alert-inner--icon">
          <i className={type === 1 ? "fa fa-exclamation-circle" : type === 2 ? "ni ni-like-2" : ""} />
        </span>{" "}
        <span className="alert-inner--text">
          <strong>{type === 1 ? "Error." : type === 2 ? "¡Éxito!" : ""}</strong> {showmessage}
        </span>
      </Alert >
    </Col>
  )
}
