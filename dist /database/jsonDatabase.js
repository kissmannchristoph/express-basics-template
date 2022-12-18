import fs, { readFileSync } from "fs";
import Database from "./database";
const MAIN_DIR = __dirname + "/../../";
class JsonDatabaseClass extends Database {
    datadir;
    constructor(name) {
        super(name);
        this.datadir = MAIN_DIR + "data/";
    }
    read() {
        try {
            return JSON.parse(readFileSync(this.datadir + this.name + ".json").toString());
        }
        catch (error) {
            return null;
        }
    }
    write(data) {
        fs.writeFileSync(this.datadir + this.name + ".json", JSON.stringify(data));
    }
    getByIndex(key, value) {
        if (!this.read())
            return null;
        return this.read().find((d) => d[key] === value);
    }
    setByIndex(key, value) { }
}
const JsonDatabase = (name) => {
    return new JsonDatabaseClass(name);
};
export default JsonDatabase;
//# sourceMappingURL=jsonDatabase.js.map