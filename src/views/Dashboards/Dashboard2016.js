import React, { useEffect } from "react";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
} from "reactstrap";
// core components
import NotAllowed from "./NotAllowed";
import { useDispatch, useSelector } from "react-redux";
import { powerBiPass } from "../../redux/actions/Auth";

const Dashboard2016 = () => {
  const dispatch = useDispatch();
  const { powerBiAuthorization } = useSelector(({ auth }) => auth);
  useEffect(() => {
    dispatch(powerBiPass());
  }, [dispatch])
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
                  powerBiAuthorization === 1 ?
                    <>
                      <CardHeader className="bg-transparent text-center">
                        <h3 className="mb-0 text-center">KPI de los años 2016 al 2019</h3>
                      </CardHeader>
                      <CardBody>
                        <Col lg="12">
                            <iframe 
                            style={{width:'100%',height:'100vh'}}
                            src="https://app.powerbi.com/view?r=eyJrIjoiOTA1NmZkNDEtYTZjNC00MDkyLTlkNDQtYWJhNTAxYWFhOTczIiwidCI6IjM4OTM1MDY5LTcxZTItNGM1YS1iODM0LTc5MTk4Y2FmY2QyYSJ9&pageName=ReportSection" 
                            title="KPI 2016-2019" />
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

export default Dashboard2016;
