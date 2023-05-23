import {useNavigate, useParams} from "react-router-dom";
import React, {useContext, useEffect, useRef, useState} from "react";
import {Region, RegionsContext} from "../stores/RegionsStore.tsx";
import {dumpData, loadData} from "../compression.tsx";
import {regionsColors} from "../colors.tsx";
import {ComposableMap, Geographies, Geography} from "react-simple-maps";
import geo from "../assets/dep_geo.json";
import {Col} from "../components/Col.tsx";
import {Row} from "../components/Row.tsx";
import {PaintBrushIcon, PlusCircleIcon, TagIcon, TrashIcon} from "@heroicons/react/20/solid";
import {Popover} from "@headlessui/react";
import {Tooltip} from 'react-tooltip'
import depData from "../assets/dep_data.json";

export const CartePanel = () => {
    const {template} = useParams();
    const encodedData = useRef("")

    const {selectedRegion, setSelectedRegion, regions, setRegions} = useContext(RegionsContext);

    useEffect(() => {
        // Decode template
        const decoded = loadData(template)
        setSelectedRegion(null)
        setRegions(decoded)
    }, []);

    console.log(regions)

    const encoded = dumpData(regions)
    const navigate = useNavigate()
    if (encoded != encodedData.current) {
        encodedData.current = encoded
        navigate(`/carte/${encoded}`, {replace: true})
    }


    console.log("selectedRegion: " + selectedRegion)
    const hasSelection = selectedRegion != null && selectedRegion != undefined
    const selectedColor = hasSelection ? regionsColors[regions[selectedRegion].color] : "rgb(40, 40, 40)";

    const selectRegion = (id: number | null) => {
        setSelectedRegion(id)
    }

    const [hoveredDep, setHoveredDep] = useState({code: "", name: "", regionName: ""})

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
        <div className="w-full flex flex-col justify-center xl:max-h-200">
            <div className="max-w-screen-2xl w-full">
                <div className="w-full xl:h-200 grid grid-cols-1 xl:flex xl:flex-row">
                    <div className="xl:basis-2/3 h-full">
                        <ComposableMap
                            // width={h}
                            // height={h}
                            projection="geoAzimuthalEqualArea"
                            projectionConfig={{
                                rotate: [-3, -46.3, 0],
                                center: [-0, -0],
                                scale: 3500,
                            }}
                        >
                            <Geographies geography={geo}>
                                {({geographies}) => {

                                    const hovered = geographies.find(it => it.properties.code === hoveredDep.code);

                                    const geos = structuredClone(geographies)
                                    if (hovered != null) {
                                        const clone = structuredClone(hovered)
                                        clone.rsmKey = "hovered"
                                        geos.push(clone)
                                    }

                                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                    // @ts-ignore
                                    return geos.map(geo => {

                                        const code = geo.properties.code
                                        const name = geo.properties.nom

                                        const region = regions.find(r => r.deps.includes(code))
                                        const regionName = region ? " - " + region.name : ""
                                        const colorIndex = region?.color
                                        const fillColor = colorIndex != undefined ? regionsColors[colorIndex] : 'rgb(40, 40, 40)'
                                        const hoverBorderColor = fillColor == selectedColor ? '#fff' : selectedColor

                                        const onMouseEnter = () => {
                                            setHoveredDep({code, name, regionName})
                                            //setTooltipId(geo.rsmKey)
                                        }
                                        const onMouseLeave = () => {
                                            setHoveredDep({code: "", name: "", regionName: ""})
                                            //setTooltipId(geo.rsmKey)
                                        }

                                        const onMouseDown = () => {
                                            addDepToSelectedRegion(code)
                                            //setTooltipId("")
                                        }

                                        return (
                                            <Geography
                                                id="tooltipId"
                                                key={geo.rsmKey}
                                                geography={geo}
                                                onMouseEnter={onMouseEnter}
                                                onMouseLeave={onMouseLeave}
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
                        <Tooltip anchorSelect="#tooltipId" className="border-2" place="bottom">
                            <div className="font-medium">
                                {hoveredDep.name + hoveredDep.regionName}
                            </div>
                        </Tooltip>
                    </div>
                    <div
                        className="pb-16 xl:basis-1/3 xl:overflow-auto h-full xl:scrollbar-thin xl:scrollbar-thumb-surface xl:scrollbar-track-black xl:scrollbar-thumb-rounded-md xl:scrollbar-track-rounded">
                        <RegionsList selectRegion={selectRegion}/>
                    </div>
                </div>
            </div>
        </div>
    )
};

type RegionListProps = {
    selectRegion: (id: number) => void,
};

const RegionsList = ({selectRegion}: RegionListProps) => {

    const {regions, setRegions, selectedRegion, setSelectedRegion} = useContext(RegionsContext);

    const onPlusClick = () => {

        const maxColor = regionsColors.length

        let freeColors = Array.from(Array(maxColor).keys());
        regions.forEach(r => {
            freeColors = freeColors.filter(c => c != r.color)
        })
        if (freeColors.length === 0) freeColors = Array.from(Array(maxColor).keys());

        const color = _.sample(freeColors)
        console.log("Picked color " + color + "(" + regionsColors[color] + ")")


        setRegions([...regions, {
            name: "Nouvelle Région",
            color: color,
            deps: []
        }])
    }

    return <Col className="">
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

                    setSelectedRegion(null)
                    setRegions(regions.filter((_, idx) => idx != index))
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
        <button className="w-full pt-4" onClick={onPlusClick}>
            <Row className="items-center w-full justify-center">
                <PlusCircleIcon className="h-8 fill-on-background"/>
                <p className="ml-2 text-xl">Ajouter une région</p>
            </Row>

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

    const [showLabelEdit, setShowLabelEdit] = useState(false)

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

    const border = selected ? "border-4 border-on-background" : ""

    return (
        <div className={`m-2 rounded ${border}`} style={{
            background: regionsColors[region.color],
        }}>
            <Col className="items-center">
                <Row className="px-2 py-1 items-center w-full">
                    <button
                        className="grow text-left"
                        onClick={select}
                        id="regionCardTooltip"
                        data-tooltip-content="Selectionner région"
                        data-tooltip-place="left"
                        data-tooltip-offset={20}
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
                    <button className="" onClick={toggleLabelEdit} id="regionCardTooltip"
                            data-tooltip-content="Renommer">
                        <TagIcon className="w-5 h-5 fill-on-primary mx-2"/>
                    </button>
                    <div id="regionCardTooltip"
                         data-tooltip-content="Changer couleur">
                        <PalettePopover onSelectColor={setColorIndex}/>
                    </div>
                    <button className="" onClick={onDelete} id="regionCardTooltip"
                            data-tooltip-content="Supprimer">
                        <TrashIcon className="w-5 h-5 fill-on-primary"/>
                    </button>
                </Row>
            </Col>
            <Tooltip anchorSelect="#regionCardTooltip" className="border-2" place="bottom"
                     style={{background: "#333131"}}/>
        </div>

    )
}

type PaletteProps = {
    onSelectColor: (index: number) => void
}

const Palette = ({onSelectColor}: PaletteProps) => {
    return (
        <div className="grid grid-cols-10">
            {
                regionsColors.map((c, index) => {
                    const onColorClick = () => {
                        onSelectColor(index)
                    }

                    return <button onClick={onColorClick} className="h-5 w-5 border-2 m-1 border-background"
                                   style={{background: c}}/>
                })
            }
        </div>
    )
}

const PalettePopover = ({onSelectColor}: PaletteProps) => {
    return (<Popover className="relative w-5 h-5 mr-2">
            <Popover.Button><PaintBrushIcon className="w-5 h-5 fill-on-primary"/></Popover.Button>

            <Popover.Panel
                className="absolute z-10 bg-surface rounded p-2 overflow-visible shadow-2xl shadow-black -left-52 w-64">
                <Popover.Button>
                    <Palette onSelectColor={onSelectColor}/>
                </Popover.Button>
            </Popover.Panel>
        </Popover>
    );
}