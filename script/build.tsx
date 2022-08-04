import { createConsoleLogger } from "@iamyth/logger";
import path from "path";
import fs from "fs";
import prettier from "prettier";
import { FeaturedProject } from "../src/FeaturedProject";
import { renderToStaticMarkup } from "react-dom/server";
import { spawnSync } from "child_process";
import { Temporal } from "@js-temporal/polyfill";
import { GithubService } from "../src/util/service/GithubService";
import type { RepositoryView } from "../src/type/api";

async function run() {
    const logger = createConsoleLogger("ReadMe Builder");
    const cssPath = path.join(__dirname, "../readme.css");
    const svgPath = path.join(__dirname, "../readme.svg");
    const readmePath = path.join(__dirname, "../README.md");
    const profile = await GithubService.getProfile();
    const numbersOfRepo = profile.public_repos;
    const pageLimit = 30;
    const page = Math.ceil(numbersOfRepo / pageLimit);
    const repos: RepositoryView[] = [];
    for (let i = 1; i <= page; i++) {
        // eslint-disable-next-line no-await-in-loop -- waterfall
        const repositories = await GithubService.getRepositories(i);
        repos.push(...repositories);
    }
    const index = Math.floor(Math.random() * numbersOfRepo);
    const repo = repos[index];

    logger.info("building svg");
    const markup = renderToStaticMarkup(<FeaturedProject repository={repo} />);

    spawnSync("lessc", [path.join(__dirname, "../src/FeaturedProject/index.less"), cssPath]);

    const cssContent = fs.readFileSync(cssPath, { encoding: "utf-8" });

    const completeContent = markup.replace("/// INSERT_STYLE", cssContent);

    const content = prettier.format(completeContent, {
        printWidth: 300,
        tabWidth: 2,
        filepath: "_.html",
    });

    const now = Temporal.Now.plainDateISO();

    fs.writeFileSync(svgPath, content, { encoding: "utf-8" });
    fs.writeFileSync(
        readmePath,
        `<!-- built at ${now.toPlainDateTime().toString()} -->
<p align="center">
    <img width="500" height="500" src="./readme.svg" />
</p>`,
        { encoding: "utf-8" },
    );

    logger.info("README Updated");
}

run();
