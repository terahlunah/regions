import {Outlet} from "react-router-dom";
import {Topbar, TopbarItem} from "./components/Topbar.tsx";

export const Layout = () => {
    const topbarItems: TopbarItem[] = [
        {
            name: "Accueil",
            link: "/",
        },
        {
            name: "Carte",
            link: "/carte",
        },
        {
            name: "Infos",
            link: "/about",
        },
    ]

    return (
        <>
            <div className="flex flex-row w-screen h-screen">
                <div className="flex flex-col h-screen w-full bg-background">
                    <Topbar items={topbarItems}/>
                    <Outlet/>
                </div>
            </div>
        </>
    );
}