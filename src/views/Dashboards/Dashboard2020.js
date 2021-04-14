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

const Dashboard2020 = () => {
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
                <h3 className="mb-0">KPI del año 2020</h3>
                <p>Indicadores del año atípico que significa el incio de la pandemia en el Perú.</p>
              </CardHeader>
              <CardBody>
                  <Row>
                      <Col lg="12">
                        <iframe 
                        style={{width:'100%',height:'100vh'}}
                        src="https://app.powerbi.com/view?r=eyJrIjoiYTdhOGFiYWMtMjlhNC00Nzc2LTgyYWUtZWJjZDIyZDNmNzlkIiwidCI6IjM4OTM1MDY5LTcxZTItNGM1YS1iODM0LTc5MTk4Y2FmY2QyYSJ9&pageName=ReportSection" 
                        title="KPI 2020" />
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

export default Dashboard2020;
