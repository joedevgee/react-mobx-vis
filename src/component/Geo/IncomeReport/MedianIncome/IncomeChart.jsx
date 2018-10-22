// @flow
import * as React from 'react'
import {
    G2,
    Chart,
    Geom,
    Axis,
    Tooltip,
    Coord,
    Label,
    Legend,
    View,
    Guide,
    Shape,
    Facet,
    Util
} from 'bizcharts'
import type { GeoIncome } from '../../../../type/GeoType'

type Props = {
    targetIncome: GeoIncome,
    nationalIncome: GeoIncome
}

const IncomeChart = ({ targetIncome, nationalIncome }: Props) => {
    const data = [...targetIncome, ...nationalIncome]
    const cols = {
        year: {
            type: 'linear',
            tickIntercal: 1000
        }
    }
    return (
        <React.Fragment>
            <Chart data={data} scale={cols} height={200} forceFit>
                <Axis name="year" />
                <Axis name="income" />
                <Legend />
                <Tooltip
                    crosshairs={{
                        type: "line"
                    }}
                />
                <Geom type="areaStack" position="year*income" color="geo" />
            </Chart>
        </React.Fragment>
    )
}

export default IncomeChart

