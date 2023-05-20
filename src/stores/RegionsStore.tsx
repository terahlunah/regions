import React, {ReactNode, useState} from "react";


export type RegionStore = {
    regions: Region[],
    setRegions: (regions: Region[]) => void,
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
})

export const RegionsProvider = ({children}: { children: ReactNode }) => {

    const [regions, setRegions] = useState<Region[]>([
        {
            name: "Occitanie",
            color: 0,
            deps: []
        },
        {
            name: "Aquitaine",
            color: 1,
            deps: []
        },
    ])

    const store = {
        regions,
        setRegions
    }

    return <RegionsContext.Provider value={store}>{children}</RegionsContext.Provider>
}