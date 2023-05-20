import React, {RefAttributes, SVGProps} from "react";

type HeroIcon = React.ComponentType<
    Omit<SVGProps<SVGSVGElement>, 'ref'> &
    {
        title?: string | undefined;
        titleId?: string | undefined;
    } &
    RefAttributes<SVGSVGElement>
>;

export default HeroIcon;