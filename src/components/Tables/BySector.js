import React, { useEffect } from 'react'

import {
  Card,
  Table,
  Row,
  Progress,
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { listbysector } from "../../redux/actions/Cuenta";
import Loading from "../../components/Loaders/LoadingSmall";

export default function BySector({ since, until }) {
  const dispatch = useDispatch();
  const { billListBySector } = useSelector(({ cuenta }) => cuenta);
  const { loading } = useSelector(({ commonData }) => commonData);
  useEffect(() => {
    let tsearch = {};
    if (since == null) {
      delete tsearch.since;
    } else {
      tsearch.since = since;
    }

    if (until == null) {
      delete tsearch.until;
    } else {
      tsearch.until = until;
    }
    dispatch(listbysector(tsearch));
  }, [since, until,dispatch]);

  return (
    <Row className="mb-3">
      <div className="col">
        <Card className="shadow">
          {
            !loading || billListBySector?.cuentas ?
              <>
                <Table
                  className="align-items-center table-flush"
                  responsive
                >
                  <thead>
                    <tr>
                      <th scope="col" className="text-left font-weight-bold">Cobrador</th>
                      <th scope="col" className="text-right font-weight-bold" >Emitido</th>
                      <th scope="col" className="text-right font-weight-bold">Cobrado</th>
                      <th scope="col" className="text-right font-weight-bold">Meta</th>
                      <th scope="col">Cobranza</th>
                      <th scope="col" className="text-right font-weight-bold">Asociados</th>
                      <th scope="col">Cobertura</th>
                    </tr>
                  </thead>
                  <tbody className="text-right">
                    {
                      billListBySector?.cuentas?.map((bill, key) =>
                        <tr key={key}>
                          <td className="text-left font-weight-bold">{bill.descripcion}</td>
                          <td>S/.{bill.emitidos}</td>
                          <td>S/.{bill.cobrado}</td>
                          <td>S/.{bill.meta}</td>
                          <td>
                            {
                              bill.meta === 0 ?
                                "" :
                                <div className="d-flex align-items-center">
                                  <div>
                                    <Progress
                                      max="100"
                                      value={bill.cobrado / bill.meta * 100}
                                      barClassName={
                                        Math.round(bill.cobrado / bill.meta * 100) < 50 ?
                                          'bg-danger'
                                          :
                                          'bg-success'
                                      }
                                    />
                                  </div>
                                  <span className="ml-2">{Math.round(bill.cobrado / bill.meta * 100)}%</span>
                                </div>

                            }
                          </td>
                          <td>{bill.asociados} <i className="ni ni-single-02 ml-1"></i></td>
                          <td>
                            {
                              billListBySector.cobertura?.find(c=>c.descripcion===bill.descripcion)?.cobertura ?
                                <div className="d-flex align-items-center">
                                  <div>
                                    <Progress
                                      max="100"
                                      value={billListBySector.cobertura?.find(c=>c.descripcion===bill.descripcion)?.cobertura / bill.asociados * 100}
                                      barClassName={
                                        Math.round(billListBySector.cobertura?.find(c=>c.descripcion===bill.descripcion)?.cobertura/ bill.asociados * 100) < 50 ?
                                          'bg-danger'
                                          :
                                          'bg-success'
                                      }
                                    />
                                  </div>
                                  <span className="ml-2">{Math.round(billListBySector.cobertura?.find(c=>c.descripcion===bill.descripcion)?.cobertura / bill.asociados * 100)}% ({billListBySector.cobertura?.find(c=>c.descripcion===bill.descripcion)?.cobertura} <i className="ni ni-single-02"></i>)</span>
                                </div>
                                :
                                ""
                            }
                          </td>
                        </tr>
                      )
                    }
                    <tr>
                      <td className="text-left font-weight-bold">Afiliaciones</td>
                      <td>S/.{billListBySector?.afiliaciones?.emitidos}</td>
                      <td>S/.{billListBySector?.afiliaciones?.cobrado}</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                  </tbody>
                </Table>
              </>
              :
              <Loading />
          }
        </Card>
      </div>
    </Row>
  )
}
