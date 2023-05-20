import {GenericProps} from "./GenericProps.tsx";

export const HighlightText = ({children, className}: GenericProps<unknown>) => {
    return (
        <span className={`text-secondary ${className}`}>{children}</span>
    );
}