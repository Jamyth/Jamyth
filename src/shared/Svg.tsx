import React from "react";

interface Props {
    viewBoxWidth: number;
    viewBoxHeight: number;
    children: React.ReactNode;
    style?: React.CSSProperties;
}

export const Svg = React.memo(({ children, viewBoxHeight, viewBoxWidth }: Props) => {
    const props: React.SVGAttributes<SVGSVGElement> = {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: `0 0 ${viewBoxWidth} ${viewBoxHeight}`,
    };

    return <svg {...props}>{children}</svg>;
});
