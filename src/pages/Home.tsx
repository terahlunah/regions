import {Col} from "../components/Col.tsx";
import {Row} from "../components/Row.tsx";
import {Link} from "react-router-dom";
import no_regions from "../assets/no_regions.png"
import old_regions from "../assets/old_regions.png"
import new_regions from "../assets/new_regions.png"
import {HighlightText} from "../components/HighlightText.tsx";

export const Home = () => {
    return (
        <>
            <Col className="items-center w-full mt-32">
                <div className="text-5xl">
                    <h1>
                        Composez <HighlightText>votre</HighlightText> carte des régions
                    </h1>
                </div>
                <div className="text-3xl mt-32 pt-8 w-full bg-surface">
                    <p className="text-center">
                        Selectionnez un point de depart
                    </p>
                    <Row className="justify-evenly mb-6 py-8">
                        <TemplateTile name="Les nouvelles régions"
                                      image={new_regions}
                                      data="NrBEEEFcDcFMCcDmA7WBaASgCwC+reADYAOsAzqADQBslwAzDYwIwCslALIxwEw0CclZpQDsHUY3oAOSj1oiAugrqgAQgHtISdSnQAxeAENkAYyzoAwuoC2AFwCXVZo2BTBrGSOE9hIgAyU-AE87PT8Siqq8LC2hrpUInQ8gjx8rLT0rBFgFrDIttFoAGqGhAAEACawZQAy6gCW0U4ywDwyHOwcwvSJ9LTMUtmgVvBksE60rX7efn5DAOJGyBVlAKJktk4BwNSJUjKs7KzirInUMgfCzAGsPEMAEoaQtmRoVWgGxibjlOw7aSlKFIAtQ5sowAA5wjVKplT6mH7CYD8dgiGT8XyJfh8ETsfjifj0IYAOXU8Gsxgq9R+gmAIloPESzHE1GErDBKlJMFghGhBAAjpB6rF6qgnH8eOIOL1uCDxMxBFJEjxGFJ5IJmEzqEMAPImEzC4zUqjbDj9PhSC3dbp8ah4mj9briegBDiDcGgAAKhgAnmRKtVCIZag0mkIkRxxFJOu5GCI7h7PfB1HAEQQSOQ0BYcLZ0BUAOTgABeWiofGAziBjFoUZOSgUQA"/>
                        <TemplateTile name="Les anciennes régions"
                                      image={old_regions}
                                      data="NrBEEEBsGcEMGMCmoA0B2FwBsGsA4BdAzCARwFcBLAF1koDtkUBGABkywBYVP2BmPjwwAmTkRLhyAN0QAnAOaNUg4IKyDmAVh59xYAEKxo0RAFoAcgHtZAW1j0AJpSYZgzbpvZZme0PsvkCpaKTMwqeACcKJp46Mwowj7EBrKItCGozMKYwlHC2ZpYKHyavgDCiPTUqZncwMKxnNqc8XwYfEXMhMmgZQAWsDYADrAhpuCyDpVKCZixmvFs0cLl1iaZ8fWs8cKsrL4AYrL28H1mZZY21ACXmZho7MLaEfwRvgASsOTUZla29k4mNpgGgisI0L4AHOQRAAAimsKOJ1CwIi2jQsQi8TQGAi2TQz24EV0PQAMvZ5OREA5LPBTAAlALGSiQSCWeh3bCdVrcPjsTjdEikyg2JkMVCuPAYZh5ElC6zHBhMdjATQYTTaTTcPCCsAAWUoTlMAAUAJ6ya70a6IaCZIrAKJ8VrZLDaPDZPCLbKcLC+P4OE1GUxTUxlWCQOi2lCxbAFN49Y2wU3QeFwiOw0mWSg1FibTja5pRTSCNArBOUeCwSbOZRzLyPXzGrPUAKhgapKo21BRNzSopoKJ4X0J2SWGT0JDjSBDG2hgAvP2DAHJwAAvQKobJuQR4NQ8aMeXz0vpzxiwqAzqNaTB8WIifsl7jxLBRThlghAA"/>
                        <TemplateTile name="Aucunes régions"
                                      image={no_regions}
                                      data="NoXSA"/>
                    </Row>
                </div>
            </Col>
        </>
    )
};


type TemplateTileProps = {
    name: string,
    data: string,
    image: string,
}

const TemplateTile = ({name, data, image}: TemplateTileProps) => {
    return (
        <Link to={`/carte/${data}`} className="bg-background rounded-xl w-1/4 overflow-clip">
            <Col>
                <div>
                    <img className="ml-7 mt-8" src={image}/>
                </div>
                <h2 className="p-6 text-center font-medium">
                    {name}
                </h2>
            </Col>
        </Link>
    )
}