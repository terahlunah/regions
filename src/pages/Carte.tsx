import {Col} from "../components/Col.tsx";
import {CartePanel} from "./CartePanel.tsx";
import {StatsPanel} from "./StatsPanel.tsx";

export const Carte = () => {

    return (
        <Col className="w-full items-center">
            <CartePanel/>
            <StatsPanel/>
        </Col>
    )
}
