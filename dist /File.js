import { readFileSync, writeFileSync } from "fs";
export default class File {
    uri;
    constructor(uri) {
        this.uri = uri;
        return this;
    }
    readFile() {
        return readFileSync(this.uri).toString();
    }
    writeFile(val) {
        writeFileSync(this.uri, val);
    }
}
//# sourceMappingURL=File.js.map