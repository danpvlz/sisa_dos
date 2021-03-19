import React, { useState, useEffect } from 'react';
import { Col, UncontrolledAlert } from "reactstrap";

export default function Message() {
    const [show,setShow]=useState(false);
    const setVisible=()=>{
        setShow(true);
        setTimeout(() => {
            setShow(false);
        }, 3000);
    }
    return (
        <Col lg="7" md="10" style={{marginTop:'1rem',position:'fixed',zIndex:9,left: '50%', width: '100%', transform: 'translate(-50%, 0)'}} >
        <UncontrolledAlert  color="success" isOpen={true} isOpen={show}>
          <span className="alert-inner--icon">
            <i className="ni ni-like-2" />
          </span>{" "}
          <span className="alert-inner--text">
            <strong>Éxito!</strong> Registro guardado!
          </span>
        </UncontrolledAlert >
        </Col>
    )
}
