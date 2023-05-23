import {Region, RegionsContext} from "../stores/RegionsStore.tsx";
import {useContext} from "react";
import depData from "../assets/dep_data.json";
import {regionsColors} from "../colors.tsx";
import {Col} from "../components/Col.tsx";
import * as _ from "lodash"

export const StatsPanel = () => {

    const popSelector = (r: Region, deps: []) => _.sum(r.deps.map(d => deps[d].pop))
    const gdpSelector = (r: Region, deps: []) => _.sum(r.deps.map(d => deps[d].gdp))
    const gdpPerCapitaSelector = (r: Region, deps: []) => _.sum(r.deps.map(d => 1000 * deps[d].gdp)) / _.sum(r.deps.map(d => deps[d].pop))
    const depSelector = (r: Region, _: []) => r.deps.length


    return (
        <div
            className="w-full xl:max-w-screen-2xl grid grid-cols-1 xl:grid-cols-2 gap-16 justify-evenly justify-items-center mx-8 my-20">
            <StatPanel name="Population (Millions)" selector={popSelector} precision={2}/>
            <StatPanel name="PIB (Milliards)" selector={gdpSelector} precision={0}/>
            <StatPanel name="Nombre de Départements" selector={depSelector} precision={0}/>
            <StatPanel name="PIB / Habitant" selector={gdpPerCapitaSelector} precision={0}/>
        </div>
    )
}


type StatPanelProps = {
    name: string,
    selector: (region: Region, deps: []) => number,
    precision: number
}

const StatPanel = ({name, selector, precision}: StatPanelProps) => {

    const {regions} = useContext(RegionsContext)

    const deps = {};
    depData.forEach(d => {
        deps[d.code] = {
            code: d.code,
            pop: Number(d.population) / 1000000,
            gdp: Number(d.gdp) / 1000
        };
    });

    const data = regions.map(r => {
        return {
            name: r.name,
            color: regionsColors[r.color],
            value: selector(r, deps),
        }
    });
    data.sort((a, b) => b.value - a.value)

    let max = _.maxBy(data, x => x.value)
    max = max ? max.value : 1;

    return (
        <Col className="w-full px-4">
            <h1 className="font-medium text-3xl">{name}</h1>
            <Col className="gap-2 mt-8">
                {
                    data.map(r => {
                            return <StatBar label={r.name}
                                            text={r.value.toFixed(precision)}
                                            pct={r.value / max}
                                            color={r.color}/>
                        }
                    )
                }
            </Col>
        </Col>
    )
}

type StatBarProps = {
    label: string,
    text: string,
    pct: number,
    color: string,
}

const StatBar = ({label, text, pct, color}: StatBarProps) => {
    return (
        <div className="grid grid-cols-4 justify-between items-center">
            <h5 className="leading-none">{label}</h5>
            <div className="ml-2 col-span-3 rounded font-medium py-0.5 text-right px-2"
                 style={{background: color, width: `${pct * 100}%`}}>
                {text}
            </div>
        </div>
    )
}