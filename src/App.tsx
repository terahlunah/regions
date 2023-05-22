import {BrowserRouter, Routes, Route} from "react-router-dom";
import {Layout} from "./Layout.tsx";
import {Home} from "./pages/Home.tsx";
import {About} from "./pages/About.tsx";
import {Carte} from "./pages/Carte.tsx";


const App = () => {
    return (
        <BrowserRouter basename={import.meta.env.BASE_URL}>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<Home/>}/>
                    <Route path="carte/:template" element={<Carte/>}/>
                    <Route path="about" element={<About/>}/>
                    <Route path="*" element={<Home/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
};

export default App
