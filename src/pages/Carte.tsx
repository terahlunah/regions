import {ComposableMap, Geographies, Geography} from "react-simple-maps"
import geo from "../assets/dep_geo.json";
import {Row} from "../components/Row.tsx";
import {Col} from "../components/Col.tsx";
import {TopbarItem} from "../components/Topbar.tsx";
import React, {useContext} from "react";
import {Region, RegionsContext} from "../stores/RegionsStore.tsx";
import {regionsColors} from "../colors.tsx";


// const geoUrl = "https://raw.githubusercontent.com/gregoiredavid/france-geojson/master/departements-version-simplifiee.geojson"
export const Carte = () => {
    return (
        <Row className="w-full">
            <div className="debug basis-2/3">
                <ComposableMap
                    projection="geoAzimuthalEqualArea"
                    projectionConfig={{
                        rotate: [-3.0, -46.3, 0],
                        center: [-0, -0],
                        scale: 3500,
                    }}
                >
                    <Geographies geography={geo}>
                        {({geographies}) =>
                            geographies.map((geo) => (
                                <Geography key={geo.rsmKey} geography={geo} style={{
                                    default: {
                                        fill: "rgb(20, 20, 20)",
                                        stroke: "#FFF",
                                        outline: 'none',
                                    },
                                    hover: {
                                        fill: "#F53",
                                        stroke: "#FFF",
                                        outline: 'none',
                                    },
                                    pressed: {
                                        fill: "#E42",
                                        outline: 'none',
                                        stroke: "#FFF",
                                    },
                                }}
                                />
                            ))
                        }
                    </Geographies>
                </ComposableMap>
            </div>
            <RegionsList/>
        </Row>
    )
};

const RegionsList = () => {

    const {regions, setRegions} = useContext(RegionsContext)

    console.log("test")

    return (
        <Col className="debug basis-1/3">
            {
                regions.map((region, index) => {

                    const setName = (name: string) => {
                        const regions2 = structuredClone(regions)
                        regions2[index] = {
                            ...region,
                            name,
                        }
                        console.log("setName")
                        setRegions(regions2)
                    };

                    return <RegionCard region={region} setName={setName}/>;
                })
            }

        </Col>
    )
};


type RegionProps = {
    region: Region,
    setName: (newName: string) => void,
    setColorIndex?: (newColor: number) => void,
    addDep?: (code: string) => void,
    removeDep?: (code: string) => void,
};
const RegionCard = ({region, setName}: RegionProps) => {

    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }

    console.log(region.name)

    return (
        <div className="debug m-2 rounded" style={{
            background: regionsColors[region.color]
        }}>
            <Row className="text-on-primary text-xl font-medium">
                <input
                    name="name"
                    value={region.name}
                    type="text"
                    onChange={onChangeInput}
                    placeholder="Type Name"
                />
            </Row>
        </div>
    )
}