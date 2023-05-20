import React, {ReactElement, ReactNode} from "react";


export const When = ({cond, a, b}: { cond: boolean, a: ReactNode, b: ReactNode }) => cond ? a : b

type Wrapper = {
    children: ReactNode
}

export const WrapWhen = ({cond, wrapper, children}: {
    cond: boolean,
    wrapper: ReactElement<Wrapper>,
    children: ReactNode
}) => (
    <>
        {cond ? React.cloneElement(wrapper, {children}) : children}
    </>
);