import React, { useState } from 'react'
import {
    Container,
    Row,
    Col,
    FormGroup
} from "reactstrap";

import AreaDashbord from "../Indexes/AreaDashbord";
import SearchAreas from "../../components/Selects/SearchAreas";

export default function Areas() {
    const [idArea, setidArea] = useState(3);
    return (
        <AreaDashbord idArea={idArea}>
            <Row>
                <Col lg="4">
                    <FormGroup className="mb-0 pb-4">
                        <label
                            className="form-control-label text-white"
                            htmlFor="filterMonth"
                        >
                            Área
                        </label>
                        <SearchAreas setVal={setidArea} idArea={idArea} />
                    </FormGroup>
                </Col>
            </Row>
        </AreaDashbord>
    )
}


