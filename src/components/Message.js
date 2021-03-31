import React, { useState, useEffect } from 'react';
import { Col, UncontrolledAlert } from "reactstrap";
import { useSelector } from "react-redux";

export default function Message() {
  const {error,message} = useSelector(({ commonData }) => commonData);
  const [show, setShow] = useState(false);
  const [showmessage, setshowmessage] = useState(null)
  const [type, settype] = useState(0)

  useEffect(() => {
    if(error?.message?.length>0){
      setVisible(true)
      settype(1)
      setshowmessage(error?.message)
    }
  }, [error])

  useEffect(() => {
    if(message?.length>0){
      console.log("meeeee")
      setVisible(true)
      settype(2)
      setshowmessage(message)
    }
  }, [message])

  const setVisible = () => {
    setShow(true);
    setTimeout(() => {
      setShow(false);
      settype(0);
      setshowmessage(null);
    }, 3000);
  }

  return (
    <Col lg="7" md="10" style={{ marginTop: '1rem', position: 'fixed', zIndex: 9, left: '50%', width: '100%', transform: 'translate(-50%, 0)' }} >
      <UncontrolledAlert color={type==1  ? "danger" : type==2  ? "success" : ""}isOpen={true} isOpen={show}>
        <span className="alert-inner--icon">
          <i className={type==1 ? "fa fa-exclamation-circle" : type==2 ? "ni ni-like-2" : ""} />
        </span>{" "}
        <span className="alert-inner--text">
          <strong>{type==1 ? "Error." : type==2 ? "¡Éxito!" : ""}</strong> {showmessage}
          </span>
      </UncontrolledAlert >
    </Col>
  )
}
