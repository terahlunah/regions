import {ComposableMap, Geographies, Geography} from "react-simple-maps"
import geo from "../assets/dep_geo.json";
import {Row} from "../components/Row.tsx";
import {Col} from "../components/Col.tsx";
import React, {useContext, useState} from "react";
import {Region, RegionsContext} from "../stores/RegionsStore.tsx";
import {regionsColors} from "../colors.tsx";
import {PaintBrushIcon, PencilSquareIcon, PlusCircleIcon, TrashIcon} from "@heroicons/react/20/solid";


export const Carte = () => {

    const {selectedRegion, setSelectedRegion, regions, setRegions} = useContext(RegionsContext);

    const hasSelection = selectedRegion != null
    const selectedColor = hasSelection ? regionsColors[regions[selectedRegion].color] : "rgb(20, 20, 20)";

    const selectRegion = (id: number | null) => {
        setSelectedRegion(id)
    }

    const [hoveredDep, setHoveredDep] = useState("")

    const addDepToSelectedRegion = (code: string) => {
        if (selectedRegion == null) return

        const newRegions = regions.map((r, id) => {
            if (id === selectedRegion) {
                const deps: string[] = structuredClone(r.deps);
                if (!deps.includes(code))
                    deps.push(code)
                const newR = structuredClone(r)
                newR.deps = deps
                return newR
            } else {
                const deps: string[] = r.deps.filter(d => d != code);
                const newR = structuredClone(r)
                newR.deps = deps
                return newR
            }
        })

        setRegions(newRegions)
    }

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
                        {({geographies}) => {

                            const hovered = geographies.find(it => it.properties.code === hoveredDep);

                            const geos = structuredClone(geographies)
                            if (hovered != null) {
                                geos.push(hovered)
                            }

                            return geos.map((geo) => {

                                const code = geo.properties.code

                                const colorIndex = regions.map(r =>
                                    r.deps.includes(code) ? r.color : null
                                ).find(c =>
                                    c != null
                                )
                                const fillColor = colorIndex != undefined ? regionsColors[colorIndex] : 'rgb(20, 20, 20)'
                                const hoverBorderColor = fillColor == selectedColor ? '#fff' : selectedColor

                                const onMouseEnter = () => {
                                    setHoveredDep(code)
                                }

                                const onMouseDown = () => {
                                    addDepToSelectedRegion(code)
                                }

                                return (
                                    <Geography key={geo.rsmKey}
                                               geography={geo}
                                               onMouseEnter={onMouseEnter}
                                               onMouseDown={onMouseDown}
                                               style={{
                                                   default: {
                                                       fill: fillColor,
                                                       stroke: "#FFF",
                                                       outline: 'none',
                                                   },
                                                   hover: {
                                                       fill: fillColor,
                                                       stroke: hoverBorderColor,
                                                       outline: 'none',
                                                   },
                                                   pressed: {
                                                       fill: fillColor,
                                                       stroke: hoverBorderColor,
                                                       outline: 'none',
                                                   },
                                               }}
                                    />
                                )
                            })
                        }
                        }
                    </Geographies>
                </ComposableMap>
            </div>
            <RegionsList selectRegion={selectRegion}/>
        </Row>
    )
};

type RegionListProps = {
    selectRegion: (id: number) => void,
};

const RegionsList = ({selectRegion}: RegionListProps) => {

    const {regions, setRegions, selectedRegion, setSelectedRegion} = useContext(RegionsContext);

    const onPlusClick = () => {
        setRegions([...regions, {
            name: "Nouvelle Région",
            color: 0,
            deps: []
        }])
    }

    return <Col className="debug basis-1/3">
        {
            regions.map((region, index) => {

                const setName = (name: string) => {
                    const newRegions = structuredClone(regions)
                    newRegions[index] = {
                        ...region,
                        name,
                    }
                    setRegions(newRegions)
                };

                const setColorIndex = (color: number) => {
                    const newRegions = structuredClone(regions)
                    newRegions[index] = {
                        ...region,
                        color,
                    }
                    setRegions(newRegions)
                };

                const select = () => {
                    selectRegion(index)
                }

                const remove = () => {
                    if (selectedRegion == index) setSelectedRegion(null)

                    setRegions(regions.filter((e, idx) => idx != index))
                }

                return <RegionCard
                    region={region}
                    setName={setName}
                    setColorIndex={setColorIndex}
                    select={select}
                    remove={remove}
                    selected={selectedRegion == index}
                />;
            })
        }
        <button className="w-full p-2" onClick={onPlusClick}>
            <PlusCircleIcon className="w-full h-8 fill-on-background"/>
        </button>
    </Col>
};


type RegionProps = {
    region: Region,
    select: () => void,
    remove: () => void,
    setName: (newName: string) => void,
    setColorIndex: (newColor: number) => void,
    selected: boolean,
};
const RegionCard = ({region, setName, setColorIndex, select, selected, remove}: RegionProps) => {

    const [showPalette, setShowPalette] = useState(false)
    const [showLabelEdit, setShowLabelEdit] = useState(false)

    const togglePalette = () => {
        setShowPalette(!showPalette)
    }

    const toggleLabelEdit = () => {
        setShowLabelEdit(!showLabelEdit)
    }

    const onDelete = () => {
        remove()
    }

    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.code === "Enter" || e.code === "NumpadEnter") {
            toggleLabelEdit()
        }
    }

    const border = selected ? "border-2 border-on-background" : ""

    return (
        <div className={`m-2 rounded ${border}`} style={{
            background: regionsColors[region.color],
        }}>
            <Col className="items-center">
                <Row className="px-2 py-1 items-center w-full">
                    <button
                        className="grow text-left"
                        onClick={select}
                    >
                        {
                            showLabelEdit ?
                                <input
                                    className="text-on-primary text-xl font-medium bg-white outline-none w-full"
                                    name="name"
                                    value={region.name}
                                    type="text"
                                    onChange={onChangeInput}
                                    onKeyDown={onKeyDown}
                                    placeholder="Type Name"
                                />
                                :
                                <div className="text-on-primary text-xl font-medium">
                                    {region.name}
                                </div>

                        }
                    </button>
                    <button className="" onClick={toggleLabelEdit}>
                        <PencilSquareIcon className="w-5 h-5 fill-on-primary mr-2"/>
                    </button>
                    <button className="" onClick={togglePalette}>
                        <PaintBrushIcon className="w-5 h-5 fill-on-primary mr-2"/>
                    </button>
                    <button className="" onClick={onDelete}>
                        <TrashIcon className="w-5 h-5 fill-on-primary"/>
                    </button>
                </Row>
                {showPalette
                    ? <Row className="items-center flex-wrap">
                        {
                            regionsColors.map((c, index) => {
                                const onColorClick = () => {
                                    setColorIndex(index)
                                }

                                return <button onClick={onColorClick} className="h-5 w-5 border-2 m-1 border-background"
                                               style={{background: c}}/>
                            })
                        }
                    </Row>
                    : null
                }
            </Col>
        </div>
    )
}