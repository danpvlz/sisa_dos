import React, { useEffect } from "react";
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
import NotAllowed from "./NotAllowed";
import { useDispatch, useSelector } from "react-redux";
import { powerBiPass } from "../../redux/actions/Auth";

const Dashboard2020 = () => {
  const dispatch = useDispatch();
  const { powerBiAuthorization } = useSelector(({ auth }) => auth);
  useEffect(() => {
    dispatch(powerBiPass());
  }, [])
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
                {
                  powerBiAuthorization == 1 ?
                    <>
                      <CardHeader className="bg-transparent text-center">
                        <h3 className="mb-0">KPI del año 2020</h3>
                        <p>Indicadores del año atípico que significa el incio de la pandemia en el Perú.</p>
                      </CardHeader>
                      <CardBody>
                        <Col lg="12">
                            <iframe 
                            style={{width:'100%',height:'100vh'}}
                            src="https://app.powerbi.com/view?r=eyJrIjoiYTdhOGFiYWMtMjlhNC00Nzc2LTgyYWUtZWJjZDIyZDNmNzlkIiwidCI6IjM4OTM1MDY5LTcxZTItNGM1YS1iODM0LTc5MTk4Y2FmY2QyYSJ9&pageName=ReportSection" 
                            title="KPI 2020" />
                        </Col>
                      </CardBody>
                    </>
                    :
                    <Col lg="12">
                      <NotAllowed />
                    </Col>
                }
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Dashboard2020;
