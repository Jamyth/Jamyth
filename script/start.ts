import { ViteRunner } from "vite-runner";
import path from "path";

new ViteRunner({
    projectDirectory: path.join(__dirname, ".."),
    tsconfigPath: path.join(__dirname, "../config/tsconfig.src.json"),
    useReact: true,
}).startServer();
