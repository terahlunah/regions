import React, {ReactNode, useState} from "react";


export type RegionStore = {
    regions: Region[],
    setRegions: (regions: Region[]) => void,
    selectedRegion: number | null,
    setSelectedRegion: (id: number | null) => void,
}

export type Region = {
    name: string,
    color: number,
    deps: string[],
}

export const RegionsContext = React.createContext<RegionStore>({
    regions: [],
    setRegions: () => {
        console.log("Default set regions")
    },
    selectedRegion: null,
    setSelectedRegion: () => {
    }
})

export const RegionsProvider = ({children}: { children: ReactNode }) => {

    const [regions, setRegions] = useState<Region[]>([])

    const [selectedRegion, setSelectedRegion] = useState<number | null>(null)

    const store = {
        regions,
        setRegions,
        selectedRegion,
        setSelectedRegion
    }

    return <RegionsContext.Provider value={store}>{children}</RegionsContext.Provider>
}