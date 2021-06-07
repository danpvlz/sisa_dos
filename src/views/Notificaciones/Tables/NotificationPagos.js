import React from 'react'

import {
    Badge,
} from "reactstrap";
export default function NotificationPagos({ details,numoperacion, numsofdoc }) {
    return (
        <>
            {
                details?.map((detail, key) =>
                    <div key={key}>
                        <strong>{detail.serieNumero} - <span className="font-weight-normal">{detail.fechaEmision}</span></strong>
                        <p className="mb-0">{detail.asociado}</p>
                        <p>
                            <Badge style={{ marginRight: '.5rem', fontSize: '.8rem' }} color="success">
                                {detail.estado === 1 ? 'Por cancelar' : detail.estado === 2 ? 'Cancelada' : 'Anulada'}
                            </Badge>
                            <span className="font-weight-bold">S/.{detail.total}</span>
                        </p>
                        <table className="table-sm align-items-center table-flush text-center">
                            <thead className="thead-light ">
                                <tr>
                                    <th scope="col">Fecha</th>
                                    <th scope="col">Monto</th>
                                    <th scope="col">Banco</th>
                                    <th scope="col">Operación</th>
                                    <th scope="col">SofDoc</th>
                                    <th scope="col">Monto op.</th>
                                </tr>
                            </thead>
                            <tbody>
                                {JSON.parse(detail.pagos).map((pago, key) =>
                                    <tr key={key}>
                                        <td>
                                            {pago.fecha}
                                        </td>
                                        <td>
                                            {'S/.'+pago.monto}
                                        </td>
                                        <td>
                                            {pago.banco ?
                                                pago.banco === 1 ? 'BCP' : pago.banco === 2 ? 'BBVA' : pago.banco === 3 ? 'BANCOS' : pago.banco === 4 ? 'CONTADO' : 'CRÉDITO'
                                                : '-'}
                                        </td>
                                        <td>
                                            {pago.numoperacion}
                                        </td>
                                        <td>
                                            {pago.numsofdoc ? pago.numsofdoc : '-'}
                                        </td>
                                        <td>
                                            {pago.montoPaid ? ('S/.'+pago.montoPaid) : '-'}
                                        </td>
                                    </tr>)}
                            </tbody>
                        </table>
                        <hr className="my-4 " />
                    </div>
                )
            }
        </>
    )
}
