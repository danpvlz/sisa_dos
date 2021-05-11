import React from 'react'

import {
    Row,
    Col,
  } from "reactstrap";

export default function LoadingSmall() {
    return (
        <>
        <Row>
          <Col>
            <div class="load-wrapp">
              <div className="load-3">
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
              </div>
            </div>
          </Col>
        </Row>
        </>
    )
}
