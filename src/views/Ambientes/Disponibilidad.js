import React from 'react'
// reactstrap components
import {
    Card,
    Container,
    Row,
} from "reactstrap"
// core components

import DisponilidadCalendar from '../../components/Calendars/Disponibilidad'

export default function Disponibilidad() {
    return (
        <>
        <div className="header pb-8 pt-9 d-flex align-items-center">
            <span className="mask bg-gradient-info opacity-8" />
        </div>
            <Container className="mt--9" fluid>
                <Row>
                    <div className="col-8">
                        <DisponilidadCalendar />
                    </div>
                    <div className="col-4">
                        <Card className="shadow">
                        </Card>
                    </div>
                </Row>
            </Container>
        </>
    )
}
