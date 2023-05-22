import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faGithub} from '@fortawesome/free-brands-svg-icons'
import {Row} from "./Row.tsx";
import {WrapWhen} from "../core.tsx";
import {HighlightText} from "./HighlightText.tsx";
import {Link} from "react-router-dom";

export interface TopbarItem {
    name: string;
    highlight?: boolean,
    link: string,
}

type TopbarProps = { items: TopbarItem[] };

export const Topbar = ({items}: TopbarProps) => {
    return (
        <Row className="h-16 justify-between items-center bg-surface mb-8">
            <div className="h-6 w-6 mx-8"/>
            <Row className="h-16 flex-1 justify-center items-center">
                {items.map(item => (
                    <Link to={item.link} className="mx-12 text-xl font-medium" key={item.name}>
                        <WrapWhen cond={item.highlight ?? false} wrapper={<HighlightText/>}>
                            {item.name}
                        </WrapWhen>
                    </Link>
                ))}
            </Row>
            <a href="https://github.com/terahlunah/regions">
                <FontAwesomeIcon icon={faGithub} className="h-6 mx-8"/>
            </a>
        </Row>
    );
}