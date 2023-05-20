import {Surface} from "../components/Surface.tsx";
import {HighlightText} from "../components/HighlightText.tsx";

export const About = () => {
    return (
        <div className="flex items-center flex-col max-w-5xl mx-auto">
            <div className="relative h-32 w-32 my-16">
                <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl w-80 font-extralight">
                    Finance for <HighlightText>everyone</HighlightText>
                </p>
            </div>


            <Surface className="mx-16">
                <div className="p-8">
                    <h1 className="text-3xl">
                        What is Crossd
                    </h1>
                    <p className="mt-4">
                        Crossd is a project created to improve retail investors investment decisions by giving them
                        tools
                        that
                        are often reserved to professionals but also share strategies, insights and knowledge.
                        We developed a core strategy called <span
                        className="font-semibold text-secondary">Amplify</span> which can be
                        deployed with the others tools
                        available
                        to increase your returns. We provide all the tools, metrics and explanations necessary to allow
                        you
                        to
                        apply this strategy yourself and start your investment journey.
                    </p>
                </div>
                <div className="p-8">
                    <h1 className="text-3xl">
                        What do we propose
                    </h1>
                    <p className="mt-4">
                        <ul className="list-disc list-inside">
                            <li>Social plateforms : LiveChart, Discord</li>
                            <li>Metrics to get a better overview of the market : Yield Curve, Correlations &
                                Volatility
                            </li>
                            <li>Metrics to build your strategy : Open Interests Analysis, VaR, Return Analysis</li>
                            <li>Tool to help decision making : Neural Network predictions</li>
                            <li>Tool to use Crossd strategy : Amplify</li>
                        </ul>
                    </p>
                </div>
                <div className="p-8">
                    <h1 className="text-3xl">
                        How to join
                    </h1>
                    <p className="mt-4">
                        You can create an account to get access to all the metrics & social plateforms.
                        Then if you want to get access to the more advanced tools like Neural Network predictions and
                        Amplify
                        strategy, you can subscribe to our plateform.
                    </p>
                </div>
            </Surface>
        </div>
    )
};
