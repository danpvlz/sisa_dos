import React, { useState } from 'react';
import { toSoles } from "../../../util/Helper"
import {
    Table,
    Button,
} from "reactstrap"
import Select from 'react-select';
import moment from "moment";

import { confirmarCheckIn } from '../../../redux/actions/Reserva';
import { useDispatch } from 'react-redux';

export default function NotificacionInscripcion({ detail, handleDone }) {
    const [tipoDoc, settipoDoc] = useState(null);
    const dispatch = useDispatch();
    const handleClickDone = () => {
        detail.tipo_de_comprobante=tipoDoc;
        detail.fechaEmision=moment().format("YYYY-MM-DD");
        detail.typeChange=1;
        console.log(detail)
        dispatch(confirmarCheckIn(detail));
        handleDone()
    }
    return (
        <div>
            <small>Información del comprobante</small>
            <strong className="d-block mt-2">Tipo de documento:</strong>
            <div className="row mb-4">
                <div className="col-3">
                    <Select
                        placeholder="Seleccione..."
                        className="select-style"
                        onChange={(inputValue, actionMeta) => {
                            settipoDoc(inputValue.value)
                        }}
                        options={[{ value: 1, label: "Factura" }, { value: 2, label: "Boleta" }]} />
                </div>
            </div>
            <strong className="d-block mt-2">Cliente:</strong>
            <p className="my-0"><strong>Documento: </strong>{detail?.cliente_documento}</p>
            <p className="my-0"><strong>Denominación: </strong>{detail?.cliente}</p>
            <p className="my-0"><strong>Dirección: </strong>{detail?.cliente_direccion}</p>
            <strong className="d-block mt-2">Items:</strong>
            <div>
                <Table className="table-sm align-items-center text-right table-flush mt-2" responsive>
                    <thead className="thead-light">
                        <tr>
                            <th scope="col" className="text-left">Concepto</th>
                            <th scope="col">Precio</th>
                            <th scope="col" className="text-center">Cantidad</th>
                            <th scope="col" className="text-center">Descto.</th>
                            <th scope="col">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {detail?.items?.map((item, key) =>
                            <tr key={key}>
                                <td className="text-left">
                                    <span>{item?.labelConcepto} {item?.gratuito ? <strong className="text-success">GRATUITO</strong> : ""}</span>
                                </td>
                                <td>
                                    {'S/. ' + toSoles(item?.price)}
                                </td>
                                <td className="text-center">
                                    {item?.ammount}
                                </td>
                                <td className="text-center">
                                    {item?.descuento ? '- S/. ' + toSoles(item?.descuento) : "-"}
                                </td>
                                <td>
                                    {'S/. ' + toSoles(item?.subtotal)}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
            <div className="text-right pr-4">
                <strong>Total: <span className="my-0">S/. {toSoles(detail?.total)}</span></strong>
            </div>
            {
                detail?.pagado === 2 ?
                    <>
                        <strong className="d-block mt-2">Pago:</strong>
                        <p className="my-0"><strong>Banco: </strong>{detail?.opcion === 1 ? "BCP" : "BBVA"}</p>
                        <p className="my-0"><strong>Monto: </strong>S/. {toSoles(detail?.montoPaid)}</p>
                        <p className="my-0"><strong>Número de SOFYDOC: </strong>{detail?.numsofdoc}</p>
                    </>
                    :
                    ""
            }
            <div className="text-center mt-5">
                <Button color="success" onClick={handleClickDone} disabled={tipoDoc==null}>Generar comprobante</Button>
            </div>
        </div>
    )
}