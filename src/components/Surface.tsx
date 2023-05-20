import {GenericProps} from "./GenericProps.tsx";

export const Surface = ({children, className}: GenericProps<unknown>) => {
    return (
        <div className={`rounded-md bg-surface ${className}`}>
            {children}
        </div>
    );
}