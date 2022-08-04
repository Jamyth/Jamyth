import React from "react";
import { Svg } from "../shared/Svg";
import { ArrayUtil } from "@iamyth/util";
import { Language } from "./Language";
import type { RepositoryView } from "../type/api";

export interface Props {
    repository: RepositoryView;
}

export const FeaturedProject = React.memo(({ repository }: Props) => {
    const description =
        repository.description || "This is an Awesome Repository, but Jamyth forgot to add descriptions...";
    const descriptions = ArrayUtil.chunk(description.split(" ") ?? [], 9);

    return (
        <Svg viewBoxHeight={120} viewBoxWidth={350}>
            <style>{"/// INSERT_STYLE"}</style>

            <rect id="background" />

            <path
                id="repo-icon"
                fillRule="evenodd"
                d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z"
            />
            <text x={25} y={17}>
                {repository?.full_name}
            </text>
            {descriptions.map((_, index) => (
                <text id="description" fontSize={8} x={5} y={33 + index * 10} key={index}>
                    {_.join(" ")}
                </text>
            ))}
            <g id="language">
                <Language language={repository?.language} />
                <text fontSize={8} x={30} y={15}>
                    {repository?.language}
                </text>
            </g>
            <g id="signature">
                <path d="m16 0c-8.995 0-16.288 7.293-16.288 16.29c0 7.197 4.667 13.302 11.14 15.457c.815.149 1.112-.354 1.112-.786c0-.386-.014-1.411-.022-2.77c-4.531.984-5.487-2.184-5.487-2.184c-.741-1.881-1.809-2.382-1.809-2.382c-1.479-1.011.112-.991.112-.991c1.635.116 2.495 1.679 2.495 1.679c1.453 2.489 3.813 1.77 4.741 1.354c.148-1.053.568-1.771 1.034-2.178c-3.617-.411-7.42-1.809-7.42-8.051c0-1.778.635-3.232 1.677-4.371c-.168-.412-.727-2.068.159-4.311c0 0 1.368-.438 4.48 1.67c1.299-.361 2.693-.542 4.078-.548c1.383.006 2.777.187 4.078.548c3.11-2.108 4.475-1.67 4.475-1.67c.889 2.243.33 3.899.162 4.311c1.044 1.139 1.675 2.593 1.675 4.371c0 6.258-3.809 7.635-7.438 8.038c.585.503 1.106 1.497 1.106 3.017c0 2.177-.02 3.934-.02 4.468c0 .436.293.943 1.12.784c6.468-2.159 11.131-8.26 11.131-15.455c0-8.997-7.294-16.29-16.291-16.29" />
                <text x={40} y={20}>
                    Jamyth Luk
                </text>
            </g>
        </Svg>
    );
});
