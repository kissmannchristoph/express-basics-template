import Path from "path";
import StaticFile from "../FrameworkCore/File/StaticFile";
import { Create, } from "../FrameworkCore/FrameworkCore";
const createOptions = {
    rootDir: __dirname,
    serverRootDir: Path.join(__dirname, "servers"),
    staticFileDirs: [new StaticFile("files", __dirname, "files")],
};
Create(createOptions);
//# sourceMappingURL=index.js.map