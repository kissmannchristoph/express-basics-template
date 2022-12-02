import fs, { readFileSync } from "fs";
import Table from "./Table";
import { QueryBuilder } from "./Query";

export default class JsonDBFile {
  private datadir = __dirname + "/../../data/";

  constructor(private readonly name: string) {
    this.datadir = this.datadir + name + ".json";
  }

  public load(): Table {
    const json = JSON.parse(readFileSync(this.datadir).toString());

    const _table = new Table(this.name, json);
    const qb = new QueryBuilder(_table);

    qb.Replace(
      { id: "1", username: "a", password: "b" },
      { username: "a", password: "b" }
    );

    console.log(qb.Select().all());

    return _table;
  }

  public save(table: Table) {
    fs.writeFileSync(this.datadir, table.stringify());
  }
}
