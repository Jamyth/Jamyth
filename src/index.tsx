import React from "react";
import { createRoot } from "react-dom/client";
import { FeaturedProject } from "./FeaturedProject";
import "./FeaturedProject/index.less";

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- defined in html
const app = document.getElementById("app")!;
const root = createRoot(app);
root.render(
    <FeaturedProject
        repository={{
            description: "a 2p chinese chess game",
            full_name: "Jamyth/chinese-chess",
            language: "TypeScript",
            name: "chinese-chess",
            url: "https://api.github.com/repos/Jamyth/chinese-chess",
        }}
    />,
);
