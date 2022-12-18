import { readFileSync, writeFileSync, lstatSync } from "fs";
import Path from "path";
export default class File {
    uri;
    constructor(uri) {
        this.uri = uri;
        return this;
    }
    IsDirectory() {
        return lstatSync(this.uri).isDirectory();
    }
    IsFile() {
        return lstatSync(this.uri).isFile();
    }
    GetDirecotry() {
        this.uri = Path.dirname(this.uri).split(Path.sep).pop();
        return this;
    }
    Join(uri) {
        this.uri = Path.join(this.uri, uri);
        return this;
    }
    ExistFile() {
        return this.IsFile();
    }
    readFile() {
        if (!this.ExistFile())
            this.writeFile("");
        return readFileSync(this.uri).toString();
    }
    ReadJson() {
        return JSON.parse(this.readFile());
    }
    writeFile(val) {
        writeFileSync(this.uri, val);
    }
}
//# sourceMappingURL=File.js.map