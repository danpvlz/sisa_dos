import React from 'react'

import { Line } from "react-chartjs-2";

import {
  chartExample1,
} from "variables/charts.js";

export default function LineTrend({lineCobrado,lineEmitido,handleClick}) {
    return (
        <div className="chart">
          {
            lineCobrado ? 
            <Line
              data={{
                labels: lineCobrado?.map(a => ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", 'Sep', 'Oct', 'Nov', 'Dic'][a.mes - 1]),
                datasets: [
                  {
                    label: "Cobrado",
                    data: lineCobrado?.map(a => a.monto),
                    pointBorderColor: "#fff",
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    borderColor: "#2dce89",
                    backgroundColor: "#2dce89",
                    fill:false,
                  },
                  {
                    label: "Emitido",
                    data: lineEmitido?.map(a => a.monto),
                    pointBorderColor: "#fff",
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    borderColor: "#1279ee",
                    backgroundColor: "#1279ee",
                    fill:false,
                  },
                ],
              }}
              options={{...chartExample1.options,
                onClick: handleClick
            ,}}
            />
            :
            ""
          }
        </div>
    )
}
