import React from 'react';

export default function NotificationAsociado({ detail, timestamp }) {
    return (
        <div>
            <strong>{detail.asociado} - <span className="font-weight-normal">{detail.documento}</span></strong>
            <p className="mb-0"><small>Ingreso: </small>{detail.fechaIngreso}</p>
            <p className="mb-0"><small>Dirección: </small>{detail.direccionSocial}</p>
            <p className="mb-0"><small>Teléfono: </small>{detail.telefonos}</p>
            <p className="mb-0"><small>Correo: </small>{detail.correos}</p>
            <p className="mb-0"><small>Importe: S/.</small>{detail.importeMensual}</p>
            <p className="mb-0"><small>Promotor: </small>{detail.promotor}</p>
            <p className="mb-0"><small>Fecha de eliminación: </small>{timestamp}</p>
        </div>
    )
}
