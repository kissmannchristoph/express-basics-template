import Path from "path";
import File from "./File";
export default class StaticFile extends File {
    name;
    rootDir;
    path;
    constructor(name, rootDir, path) {
        super(Path.join(rootDir, path));
        this.name = name;
        this.rootDir = rootDir;
        this.path = path;
    }
}
//# sourceMappingURL=StaticFile.js.map