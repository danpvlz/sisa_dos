import React from 'react'

import {
    Table,
    Button,
} from "reactstrap";

import { acceptUpdate } from "../../../redux/actions/Asociado";
import { useDispatch } from "react-redux";

export default function NotificationAsociadoEdit({ detail }) {
    const dispatch = useDispatch();
    return (
        <div>
            <strong className="d-block"><span className="font-weight-normal">Solicitud para cambiar asociado </span> {detail.asociado}</strong>
            <p className="d-block mt-3 mb-1">Los siguientes campos:</p>
            {
                Object.keys(detail?.changes)?.map((category, key) =>
                    <div key={key} className="my-2">
                        <strong className="d-flex text-muted mb-1">{category}</strong>
                        <Table className="table-sm align-items-center table-flush text-center" responsive>
                            <thead className="thead-light bg-secondary">
                                <tr>
                                    {
                                        Object.keys(Object.values(detail?.changes)[key])?.map((value, k) =>
                                            <th key={k} scope="col">{value}</th>
                                        )
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    {
                                        Object.values(Object.values(detail?.changes)[key])?.map((value, k) =>
                                            <td key={k} scope="col">{value}</td>
                                        )
                                    }
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                )
            }
            {
                detail.id &&
                <div className="text-center">
                    <Button color="primary" type="button" className="text-uppercase mt-4" onClick={()=>dispatch(acceptUpdate(detail.id,detail.request))}>Aceptar cambios</Button>
                </div>
            }
        </div>
    )
}
