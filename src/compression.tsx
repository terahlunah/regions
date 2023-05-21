import {Region} from "./stores/RegionsStore.tsx";
import * as LZString from "lz-string";


export function dumpData(data: Region[]): string {
    const mini = data.map(r => [
        r.name,
        r.color,
        r.deps.map(d => {
            if (d === "2A") {
                return 200
            } else if (d === "2B") {
                return 201
            } else {
                return Number(d)
            }
        }),
    ])
    return LZString.compressToEncodedURIComponent(JSON.stringify(mini))
}

export function loadData(encoded: string): Region[] {
    const mini = JSON.parse(LZString.decompressFromEncodedURIComponent(encoded))
    return mini.map(([name, color, deps]) => {
        return {
            name,
            color,
            deps: deps.map(d => {
                if (d === 200) {
                    return "2A"
                } else if (d === 201) {
                    return "2B"
                } else {
                    return d.toString()
                }
            }),
        }
    })
}