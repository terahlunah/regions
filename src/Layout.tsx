import {Outlet} from "react-router-dom";
import {Topbar, TopbarItem} from "./components/Topbar.tsx";
import {useContext} from "react";
import {RegionsContext} from "./stores/RegionsStore.tsx";
import {dumpData} from "./compression.tsx";
import {Col} from "./components/Col.tsx";

export const Layout = () => {

    const {regions} = useContext(RegionsContext)

    const topbarItems: TopbarItem[] = [
        {
            name: "Accueil",
            link: "/",
        },
        {
            name: "Carte",
            link: "/carte/" + (regions ? dumpData(regions) : "NoXSA"),
        },
        {
            name: "Infos",
            link: "/about",
        },
    ]

    return (
        <div className="bg-background">
            <Col className="h-full w-full">
                <Topbar items={topbarItems}/>
                <Outlet/>
            </Col>
        </div>
    );
}