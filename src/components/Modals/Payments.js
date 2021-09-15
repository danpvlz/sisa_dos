import React from 'react'
import {
    Col,
    Table,
    Row,
    Button,
    Modal,
    Progress,
    Badge
} from "reactstrap";
import { useSelector } from "react-redux";
import Loading from "../../components/Loaders/LoadingSmall";
import moment from "moment";
import 'moment/locale/es';
moment.locale('es')

export default function Payments({ showDetail, toggleModal }) {
    const { comprobanteObject } = useSelector(({ cuenta }) => cuenta);
    const loading = useSelector(({ commonData }) => commonData.loading);

    return (
        <Modal
            className="modal-dialog-centered"
            isOpen={showDetail}
            toggle={toggleModal}
            size="lg"
        >
            <div className="modal-header bg-secondary">
                <h3 className="modal-title" id="modalDetalleAsistencia">
                    Ver más
                </h3>
                <button
                    aria-label="Close"
                    className="close"
                    data-dismiss="modal"
                    type="button"
                    onClick={toggleModal}
                >
                    <span aria-hidden={true}>×</span>
                </button>
            </div>
            {
                comprobanteObject?.cuenta?.userLastChanged !== "-" ?
                    <Col className="text-center mt-2" >
                        <Badge color="" className="badge-dot mr-4">
                            <i className="bg-success" />
                            <small className="text-muted">Última modificación por {comprobanteObject?.cuenta?.userLastChanged} {moment(comprobanteObject?.cuenta?.lastUpdate, "YYYY-MM-DD h:m:s").fromNow()}</small>
                        </Badge>
                    </Col>
                    :
                    ""
            }
            {
                !loading ?
                    <div className="modal-body">
                        <Row>
                            {
                                comprobanteObject.nubefact ?
                                    <div className="col-12 flex text-right p-0 ">
                                        <Button
                                            className="btn btn-sm ml-auto mb-1"
                                            color="white"
                                            type="button"
                                            onClick={() => {
                                                window.open(comprobanteObject?.nubefact?.enlace_del_pdf);
                                            }}
                                        >
                                            <img alt="Abrir PDF" src={require("../../assets/img/theme/pdf.png").default} style={{ height: "25px" }} title="Abrir PDF" />
                                        </Button>
                                        <Button
                                            className="btn btn-sm ml-auto mb-1"
                                            color="white"
                                            type="button"
                                            onClick={() => {
                                                window.open(comprobanteObject?.nubefact?.enlace_del_xml);
                                            }}
                                        >
                                            <img alt="Abrir XML" src={require("../../assets/img/theme/xml.png").default} style={{ height: "25px" }} title="Abrir XML" />
                                        </Button>
                                        <Button
                                            className="btn btn-sm ml-auto mb-1"
                                            color="white"
                                            type="button"
                                            onClick={() => {
                                                window.open(comprobanteObject?.nubefact?.enlace_del_cdr);
                                            }}
                                        >
                                            <img alt="Abrir CDR " src={require("../../assets/img/theme/cdr.png").default} style={{ height: "25px" }} title="Abrir CDR" />
                                        </Button>
                                    </div>
                                    :
                                    ""
                            }
                            <Col className="d-flex justify-content-between p-0">
                                <h3 className="ml-1">CUENTA</h3>
                            </Col>
                            <Table className="align-items-center table-flush text-center" responsive>
                                <thead className="thead-light ">
                                    <tr>
                                        <th scope="col">Emisión</th>
                                        <th scope="col">Serie-número</th>
                                        <th scope="col">Asociado</th>
                                        <th scope="col">Estado</th>
                                        <th scope="col">Total</th>
                                        <th scope="col">Observaciones</th>
                                        {comprobanteObject?.cuenta?.fechaVencimiento ?
                                            <th scope="col">Vencimiento</th> : ""}
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            {comprobanteObject?.cuenta?.fechaEmision}
                                        </td>
                                        <td>
                                            {comprobanteObject?.cuenta?.serie}-{comprobanteObject?.cuenta?.numero}
                                        </td>
                                        <td>
                                            {comprobanteObject?.cuenta?.denominacion}
                                        </td>
                                        <td>
                                            {comprobanteObject?.cuenta?.estado === 1 ? "Por cancelar" : comprobanteObject?.cuenta?.estado === 2 ? "Cancelada" : "Anulada"}
                                        </td>
                                        <td>
                                            s/.{comprobanteObject?.cuenta?.total}
                                        </td>
                                        <td>
                                            {comprobanteObject?.cuenta?.observaciones}
                                        </td>

                                        {comprobanteObject?.cuenta?.fechaVencimiento ? <td> {comprobanteObject?.cuenta?.fechaVencimiento}
                                        </td> : ""}

                                    </tr>
                                </tbody>
                            </Table>
                        </Row>
                        <Row>
                            <h3 className="ml-1">DETALLE</h3>
                            <Table className="align-items-center table-flush text-center" responsive>
                                <thead className="thead-light ">
                                    <tr>
                                        <th scope="col">Concepto</th>
                                        <th scope="col">Cantidad</th>
                                        <th scope="col">Tipo</th>
                                        <th scope="col">Subtotal</th>
                                        <th scope="col">IGV</th>
                                        <th scope="col">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        comprobanteObject?.detalle?.map((detalle, i) =>
                                            <tr key={i}>
                                                <td>
                                                    {detalle?.descripcion}
                                                </td>
                                                <td>
                                                    {detalle?.cantidad}
                                                </td>
                                                <td>
                                                    {detalle?.tipoIGV === 1 ? "Gravada" : detalle?.tipoIGV === 7 ? "Gratuita" : "Exonerada"}
                                                </td>
                                                <td>
                                                    s/.
                                                    {detalle?.subtotal}
                                                </td>
                                                <td>
                                                    s/.
                                                    {detalle?.totaligv}
                                                </td>
                                                <td>
                                                    s/.
                                                    {detalle?.total}
                                                </td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </Table>
                        </Row>
                        {
                            comprobanteObject?.membresia &&
                            <Row>
                                <h3 className="ml-1">MEMBRESÍAS</h3>
                                <Table className="align-items-center table-flush text-center" responsive>
                                    <thead className="thead-light ">
                                        <tr>
                                            <th scope="col">Mes</th>
                                            <th scope="col">Año</th>
                                            <th scope="col">Estado</th>
                                            <th scope="col">Cobrado</th>
                                            <th scope="col">Pagado</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            comprobanteObject?.membresia?.map((membresia, key) =>
                                                <tr key={key}>
                                                    <td>
                                                        {
                                                            membresia.mes === 0 ?
                                                                membresia.masdeuno
                                                                :
                                                                ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Setiembre', 'Octubre', 'Noviembre', 'Diciembre'][membresia.mes - 1]

                                                        }
                                                    </td>
                                                    <td>
                                                        {membresia.year}
                                                    </td>
                                                    <td>
                                                        {membresia.estado === 1 ? "Por cancelar" : membresia.estado === 2 ? "Cancelada" : "Anulada"}
                                                    </td>
                                                    <td>
                                                        s/. {membresia.cobrado}
                                                    </td>
                                                    <td>
                                                        s/. {membresia.pagado}
                                                    </td>
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                </Table>
                            </Row>
                        }
                        <Row>
                            <h3 className="ml-1">PAGOS</h3>
                            <Table className="align-items-center table-flush text-center" responsive>
                                <thead className="thead-light ">
                                    <tr>
                                        <th scope="col">Fecha</th>
                                        <th scope="col">Monto</th>
                                        <th scope="col">Completado</th>
                                        <th scope="col">Banco</th>
                                        <th scope="col">Operación</th>
                                        <th scope="col">SofyDoc</th>
                                        <th scope="col">Monto op.</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        comprobanteObject?.pagos?.map((pago, key) =>
                                            <tr key={key}>
                                                <td>
                                                    {pago?.fecha}
                                                </td>
                                                <td>
                                                    s/. {pago?.monto}
                                                </td>
                                                <td>
                                                    <div className="d-flex align-items-center">
                                                        <span className="mr-2">{
                                                            Math.round((comprobanteObject?.pagos?.map((p, i) => { return i <= key ? parseFloat(p.monto) : 0 }).reduce((a, b) => parseFloat(a) + parseFloat(b), 0))
                                                                / comprobanteObject?.cuenta?.total * 100)
                                                        }%</span>
                                                        <div>
                                                            <Progress
                                                                max="100"
                                                                value={
                                                                    Math.round((comprobanteObject?.pagos?.map((p, i) => { return i <= key ? parseFloat(p.monto) : 0 }).reduce((a, b) => parseFloat(a) + parseFloat(b), 0)) / comprobanteObject?.cuenta?.total * 100)}
                                                                barClassName={
                                                                    (Math.round((comprobanteObject?.pagos?.map((p, i) => { return i <= key ? parseFloat(p.monto) : 0 }).reduce((a, b) => parseFloat(a) + parseFloat(b), 0)) / comprobanteObject?.cuenta?.total * 100)
                                                                    )
                                                                        > 50 ? "bg-success" : "bg-warning"}
                                                            />
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    {pago?.banco ? pago?.banco === 1 ? 'BCP' : pago?.banco === 2 ? 'BBVA' : pago?.banco === 3 ? 'BANCOS' : pago?.banco === 4 ? 'CONTADO' : "-" : '-'}
                                                </td>
                                                <td>{pago?.numoperacion ? pago?.numoperacion : "-"}</td>
                                                <td>{pago?.numsofdoc ? pago?.numsofdoc : "-"}</td>
                                                <td>{pago?.montoPaid ? ('S/.' + pago?.montoPaid) : "-"}</td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </Table>
                        </Row>
                    </div>
                    :
                    <div className="modal-body">
                        <Loading />
                    </div>
            }
            <div className="modal-footer d-flex justify-content-center">
                <Button
                    color="primary"
                    data-dismiss="modal"
                    type="button"
                    onClick={toggleModal}
                >
                    Cerrar
                </Button>
            </div>
        </Modal>
    )
}
