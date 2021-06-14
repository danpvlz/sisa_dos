import React from "react";
// reactstrap components
import { Container, Row, Col } from "reactstrap";

const ContainerPublic = ({children,title,bg}) => {

    React.useEffect(() => {
        if(bg === "full"){
            document.body.classList.add("bg-gradient-secondary");
        }else{
            document.body.classList.add("bg-default");
        }
        return () => {
            document.body.classList.remove("bg-gradient-secondary");
            document.body.classList.remove("bg-default");
        };
    }, [bg]);

    return (
        <>
            <div className="header bg-gradient-info py-7 py-lg-8">
                <Container>
                    <div className="header-body text-center mb-5 mt-2">
                        <Row className="justify-content-center">
                            <Col lg="5" md="6">
                                <h1 className="text-white">{title}</h1>
                            </Col>
                        </Row>
                    </div>
                </Container>
                {
                    bg !== "full" ?
                    <div className="separator separator-bottom separator-skew zindex-100">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            preserveAspectRatio="none"
                            version="1.1"
                            viewBox="0 0 2560 100"
                            x="0"
                            y="0"
                        >
                            <polygon
                                className="fill-default"
                                points="2560 0 2560 100 0 100"
                            />
                        </svg>
                    </div>
                    :
                    ""
                }
            </div>
            {/* Page content */}
            <Container className="mt--8 pb-5">
                <Row className="justify-content-center">
                    {children}
                </Row>
            </Container>
        </>
    );
};

export default ContainerPublic;
