import React, { useState } from "react";
// react component that copies the given text inside your clipboard
import { CopyToClipboard } from "react-copy-to-clipboard";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";

const Dashboard2021 = () => {
  const [copiedText, setCopiedText] = useState();
  return (
    <>
    <div className="header pb-8 pt-5 pt-lg-8 pt-md-8  d-flex align-items-center">
      <span className="mask bg-gradient-info opacity-8" />
    </div>  
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="bg-transparent text-center">
                <h3 className="mb-0">KPI actuales</h3> 
                <p>Indicadores con sincronización de datos cada fin de mes.</p>
              </CardHeader>
              <CardBody>
                  <Row>
                      <Col lg="12">
                        <iframe 
                        frameBorder="0" style={{width:'100%',height:'100vh'}}
                        src="https://app.powerbi.com/view?r=eyJrIjoiOTA1NmZkNDEtYTZjNC00MDkyLTlkNDQtYWJhNTAxYWFhOTczIiwidCI6IjM4OTM1MDY5LTcxZTItNGM1YS1iODM0LTc5MTk4Y2FmY2QyYSJ9&pageName=ReportSection" 
                        title="KPI 2016-2019" />
                      </Col>
                  </Row>
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Dashboard2021;
