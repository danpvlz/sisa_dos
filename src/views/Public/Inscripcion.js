import React, { useState, useEffect } from 'react'
import ContainerPublic from './ContainerPublic';
// reactstrap components
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Row,
    Col,
    Button,
    Form,
    FormGroup,
    Input
} from "reactstrap";
import { useForm } from "react-hook-form";

import { show, resetCursoObject } from "../../redux/actions/Curso";
import { externalInscription } from "../../redux/actions/Inscripcion";
import { useDispatch, useSelector } from "react-redux";
import Recaptcha from "react-recaptcha";

const Page2 = ({ register }) => {
    return (
        <Row>
            <Col className="col-12">
                <h6 className="heading-small text-muted">
                    Información de empresa <span className="text-danger">(Opcional)</span>
                </h6>
            </Col>
            <Col className="my-2" lg="6">
                <FormGroup className="mb-0">
                    <label
                        className="form-control-label"
                        htmlFor="ruc"
                    >
                        RUC</label>
                    <Input
                        className="form-control-alternative"
                        name="ruc"
                        type="tel"
                        innerRef={register({ required: false })}
                    />
                </FormGroup >
            </Col>
            <Col className="my-2" lg="12">
                <FormGroup className="mb-0">
                    <label
                        className="form-control-label"
                        htmlFor="empresa"
                    >
                        Empresa</label>
                    <Input
                        className="form-control-alternative"
                        name="empresa"
                        type="text"
                        innerRef={register({ required: false })}
                    />
                </FormGroup >
            </Col>
            <Col className="my-2" lg="6">
                <FormGroup className="mb-0">
                    <label
                        className="form-control-label"
                        htmlFor="cargo"
                    >
                        Cargo</label>
                    <Input
                        className="form-control-alternative"
                        name="cargo"
                        type="text"
                        innerRef={register({ required: false })}
                    />
                </FormGroup >
            </Col>
        </Row>);
}

const Page1 = ({ register }) => {
    return (
        <Row>
            <Col className="col-12">
                <h6 className="heading-small text-muted">
                    Información personal
                </h6>
            </Col>
            <Col className="my-2" lg="6">
                <FormGroup className="mb-0">
                    <label
                        className="form-control-label"
                        htmlFor="dni"
                    >
                        DNI</label>
                    <Input
                        className="form-control-alternative"
                        name="dni"
                        type="tel"
                        innerRef={register({ required: true })}
                    />
                </FormGroup >
            </Col>
            <Col className="my-2" lg="12">
                <FormGroup className="mb-0">
                    <label
                        className="form-control-label"
                        htmlFor="nombres"
                    >
                        Nombres</label>
                    <Input
                        className="form-control-alternative"
                        name="nombres"
                        type="text"
                        innerRef={register({ required: true })}
                    />
                </FormGroup >
            </Col>
            <Col className="my-2" lg="6">
                <FormGroup className="mb-0">
                    <label
                        className="form-control-label"
                        htmlFor="paterno"
                    >
                        Apellido paterno</label>
                    <Input
                        className="form-control-alternative"
                        name="paterno"
                        type="text"
                        innerRef={register({ required: true })}
                    />
                </FormGroup >
            </Col>
            <Col className="my-2" lg="6">
                <FormGroup className="mb-0">
                    <label
                        className="form-control-label"
                        htmlFor="materno"
                    >
                        Apellido materno</label>
                    <Input
                        className="form-control-alternative"
                        name="materno"
                        type="text"
                        innerRef={register({ required: true })}
                    />
                </FormGroup >
            </Col>
            <Col className="col-12">
                <h6 className="heading-small mt-4 text-muted">
                    Información de contacto
                </h6>
            </Col>
            <Col className="my-2" lg="6">
                <FormGroup className="mb-0">
                    <label
                        className="form-control-label"
                        htmlFor="correo"
                    >
                        Email</label>
                    <Input
                        className="form-control-alternative"
                        name="correo"
                        type="email"
                        innerRef={register({ required: true })}
                    />
                </FormGroup >
            </Col>
            <Col className="my-2" lg="6">
                <FormGroup className="mb-0">
                    <label
                        className="form-control-label"
                        htmlFor="celular"
                    >
                        Celular</label>
                    <Input
                        className="form-control-alternative"
                        name="celular"
                        type="tel"
                        innerRef={register({ required: true })}
                    />
                </FormGroup >
            </Col>
            <Col className="my-2" lg="12">
                <FormGroup className="mb-0">
                    <label
                        className="form-control-label"
                        htmlFor="direccion"
                    >
                        Dirección</label>
                    <Input
                        className="form-control-alternative"
                        name="direccion"
                        type="text"
                        innerRef={register({ required: false })}
                    />
                </FormGroup >
            </Col>
        </Row>);
}

const Completed = () => {
    return (
        <>
            <CardHeader className="text-center bg-success">
                <div className="icon icon-shape icon-lg rounded-circle bg-white text-success">
                    <i className="ni ni-check-bold ni-3x" />
                </div>
            </CardHeader>
            <CardBody>

                <Col className="col-12 text-center">
                    <h2>
                        ¡Inscripción registrada!
                    </h2>
                    <p>
                        No olvides mandar tu comprobante de pago a <a href="https://wa.me/51944675625" target="_blank" rel="noreferrer">+51 944 675 625</a>
                    </p>
                    <strong>
                        ¡Gracias!
                    </strong>
                </Col>
            </CardBody>
        </>);
}

export default function Inscripcion(props) {
    const dispatch = useDispatch();
    const { cursobject } = useSelector(({ curso }) => curso);
    const { register, handleSubmit } = useForm();
    const [page, setpage] = useState(1);
    const [completed, setcompleted] = useState(false);
    const [formData, setformData] = useState();

    let recaptchaInstance;
    const executeCaptcha = () => {
      recaptchaInstance.execute();
    };
    const max = 2;
    const next = () => {
        setpage(page + 1);
    }
    const onSubmit = (data) => {
        if ((page + 1) > max) {
            executeCaptcha();
            formData.idCurso=props.match.params.cursoId;
            dispatch(externalInscription(formData));
            setcompleted(true);
        } else {
            setformData({ ...formData, ...data});
            next();
        }
    }
    useEffect(() => {
        dispatch(show(props.match.params.cursoId));
        return () => {
            dispatch(resetCursoObject());
        }
    }, [props.match.params.cursoId,dispatch]);
    
    return (
        <ContainerPublic bg="full" title={cursobject.descripcion ? `CURSO: ${cursobject?.descripcion?.toUpperCase() }` : "..."} imgHeader={cursobject?.foto}>
            <Col className="order-xl-1" lg="6">
                <Card className="bg-secondary shadow">
                    {
                        completed ?
                            <Completed />
                            :
                            <>
                                <CardHeader>
                                    <div className="d-flex mx-auto text-center justify-content-center">
                                        <div className={`icon icon-shape icon-sm rounded-circle font-weight-bold mx-2 text-white stepper-number ${page>1 ? 'bg-success' : 'bg-primary'}`}>
                                            {page > 1 ?
                                                <i className="ni ni-check-bold" />
                                                :
                                                '1'
                                            }
                                        </div>
                                        <div className={`stepper-line ${page > 1 ? 'sl-selected' : 'sl-not-selected'} `}></div>
                                        <div className={`icon icon-shape icon-sm rounded-circle font-weight-bold mx-2 text-white stepper-number ${page >= 2 ? 'bg-primary' : 'sn-incomplete'}`}>
                                            {page > 2 ?
                                                <i className="ni ni-check-bold" />
                                                :
                                                '2'
                                            }
                                        </div>
                                    </div>
                                </CardHeader>
                                <Form onSubmit={handleSubmit(onSubmit)}>
                                    <CardBody>
                                    <Recaptcha
                                        ref={e => recaptchaInstance = e}
                                        sitekey={process.env.REACT_APP_CAPTCHA_KEY}
                                        size="invisible"
                                    />
                                        {
                                            page === 1 ?
                                                <Page1 register={register} />
                                                :
                                                <Page2 register={register} />
                                        }
                                    </CardBody>
                                    <CardFooter className="d-flex justify-content-center">
                                        <Button color="primary" type="submit">
                                            {(page + 1) > max ? 'Finalizar' : 'Siguiente'}
                                            <i className="ml-2 fa fa-chevron-right" aria-hidden="true"></i>
                                        </Button>
                                    </CardFooter>
                                </Form>
                            </>
                    }
                </Card>
            </Col>
        </ContainerPublic>
    )
}

