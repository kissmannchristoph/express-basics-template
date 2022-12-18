import fs, { readFileSync } from "fs";
import Table from "./Table";
import { QueryBuilder } from "./Query";
export default class JsonDBFile {
    name;
    datadir = __dirname + "/../../data/";
    constructor(name) {
        this.name = name;
        this.datadir = this.datadir + name + ".json";
    }
    load() {
        const json = JSON.parse(readFileSync(this.datadir).toString());
        const _table = new Table(this.name, json);
        const qb = new QueryBuilder(_table);
        qb.Replace({ id: "1", username: "a", password: "b" }, { username: "a", password: "b" });
        console.log(qb.Select().all());
        return _table;
    }
    save(table) {
        fs.writeFileSync(this.datadir, table.stringify());
    }
}
//# sourceMappingURL=index.js.map