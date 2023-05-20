import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faGithub} from '@fortawesome/free-brands-svg-icons'
import {Row} from "./Row.tsx";
import {WrapWhen} from "../core.tsx";
import {HighlightText} from "./HighlightText.tsx";

export interface TopbarItem {
    name: string;
    highlight?: boolean,
    link: string,
}

type TopbarProps = { items: TopbarItem[] };

export const Topbar = ({items}: TopbarProps) => {
    return (
        <Row className="h-16 justify-end items-center pr-8">
            {items.map(item => (
                <a href={item.link} className="mx-4 text-lg">
                    <WrapWhen cond={item.highlight ?? false} wrapper={<HighlightText/>}>
                        {item.name}
                    </WrapWhen>
                </a>
            ))}
            <div className="w-8"/>
            <a href="https://github.com/terahlunah">
                <FontAwesomeIcon icon={faGithub} className="h-6 ml-6"/>
            </a>
        </Row>
    );
}