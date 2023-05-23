import {Surface} from "../components/Surface.tsx";
import {Col} from "../components/Col.tsx";

export const About = () => {
    return (
        <Col className="justify-center items-center w-full h-full">
            <Surface className="mx-16 max-w-5xl mt-10">
                <div className="p-8">
                    <h1 className="text-3xl">
                        Pourquoi ce site ?
                    </h1>
                    <p className="my-8">
                        J'ai créé ce site suite aux discussions que j'ai eu avec mon père sur le découpage idéal des
                        régions. C'est un outil tout simple pour s'amuser à imaginer un découpage différent de la France
                        en régions.
                    </p>
                    <h1 className="text-3xl">
                        Comment partager une carte ?
                    </h1>
                    <p className="my-8">
                        Il suffit simplement de copier l'url, elle se met à jour à chaque changement et contient les
                        données de votre carte.
                    </p>
                    <h1 className="text-3xl">
                        D'ou viennent les données ?
                    </h1>
                    <p className="my-8">
                        Les données de la carte viennent du <a className="text-secondary"
                                                               href="https://github.com/gregoiredavid/france-geojson">Github
                        france-geojson</a>.<br/>
                        Les données administratives viennent de <a className="text-secondary"
                                                                   href="https://fr.wikipedia.org/wiki/R%C3%A9gion_fran%C3%A7aise">Wikipedia</a>.<br/>
                        Les données économiques viennent d' <a className="text-secondary"
                                                               href="https://ec.europa.eu/eurostat/databrowser/view/nama_10r_3gdp/default/table?lang=en">Eurostat</a>.
                    </p>
                    <h1 className="text-3xl">
                        Est-ce open-source ?
                    </h1>
                    <p className="my-8">
                        Oui ! Vous pouvez trouver le code source sur mon <a className="text-secondary"
                                                                            href="https://github.com/terahlunah/regions">Github</a>.<br/>
                        (Attention c'est du code fait en un weekend sans tenir compte de la qualité)
                    </p>
                </div>
            </Surface>
        </Col>
    )
};
