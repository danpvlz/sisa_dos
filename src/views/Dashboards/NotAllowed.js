import React from 'react'

// reactstrap components
import {
    Button,
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { askpermission } from "../../redux/actions/Auth";
export default function NotAllowed() {
    const { powerBiAuthorization } = useSelector(({ auth }) => auth);
    const dispatch = useDispatch();
    return (
        <div>
            <img
                className="img-fluid d-block m-auto"
                alt="NoAutorizado"
                src={
                    require("../../assets/img/theme/unauthorized.jpg").default
                } />
            {
                powerBiAuthorization == 0 ?
                <>

                <h1 className="text-center mt-5 mb-0">Solicitud enviada!</h1>
                <p className="text-center mx-5 mt-0 mb-3">Su solicitud ha sido enviada. Espere a que le otorguen el permiso.</p>
                </>
                    :
                    <>

                        <h1 className="text-center mt-5 mb-0">No autorizado!</h1>
                        <p className="text-center mx-5 my-0">No tiene acceso para ver los KPI, solicite el acceso por 24h.</p>
                        <div className="text-center ">
                            <Button className="my-4" color="primary" onClick={() => dispatch(askpermission())}>
                                Solicitar acceso
                            </Button>
                        </div>
                    </>

            }
        </div>
    )
}
