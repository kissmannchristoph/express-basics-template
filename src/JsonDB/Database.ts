import fs, { readFileSync } from "fs";

interface tableI {
  schema: schema_entry[];
  keys: key_entry[];
  data: {}[];
}

interface schema_entry {
  key?: string;
  plugins?: string[];
}

interface key_entry {
  name: string;
  type: string;
}

class Keys {
  private keys: key_entry[];

  constructor(
    public readonly json: key_entry[],
    private readonly schema: Schema
  ) {}

  getPrimary(): key_entry {
    //check prim key exists
    if (!this.json.filter((entry: key_entry) => entry.name === "primary")[0]) {
      console.log("no prim"); //fail
      return null;
    }

    return this.schema.json.filter(
      (entry: schema_entry) => entry.key && entry.key === "primary"
    )[0];
  }
}
class Schema {
  constructor(public readonly json: any) {}
}
class Data {
  constructor(public readonly json: {}[]) {}
}

class Query {
  private operations: string[] = [];

  constructor(
    private readonly table: table,
    private readonly operation: "select"
  ) {}

  private _orderBy: any;
  private _where: any;
  private _limit: any;

  public all(): any[] {
    const data = this.table.data;
    let parsedData: any[];

    if (this._where)
      parsedData = data.json.filter((entry: any) => {
        let success = true;
        for (let whereItem of this._where) {
          const [key, val]: any = whereItem;
          if (entry[key] !== val) success = false;
        }
        return success;
      });

    if (this._limit) {
      let lPD: any[] = [];

      for (let i = 0; i < this._limit; i++) {
        if (parsedData[i]) lPD.push(parsedData[i]);
      }

      parsedData = lPD;
    }

    return parsedData;
  }

  public find(id: number = undefined): any {
    if (id) {
      const primary = this.table.keys.getPrimary();
      console.log(primary);
    }

    return this.limit(1)
      .where([["id", id]])
      .all()[0];
  }

  public orderBy() {}

  public where(_where: any): Query {
    this._where = _where;
    return this;
  }

  public limit(_limit: number): Query {
    this._limit = _limit;
    return this;
  }
}

class QueryBuilder {
  constructor(private readonly table: table) {}

  Select(...selects: string[]): Query {
    return new Query(this.table, "select");
  }
}

class table {
  schema: Schema;
  keys: Keys;
  data: Data;

  constructor({ schema, keys, data }: tableI) {
    this.schema = new Schema(schema);
    this.keys = new Keys(keys, this.schema);
    this.data = new Data(data);
  }
}

class JsonDBFile {
  private datadir = __dirname + "/../../data/";

  constructor(name: string) {
    this.datadir = this.datadir + name + ".json";
  }

  public load(): table {
    const json: tableI = JSON.parse(readFileSync(this.datadir).toString());

    const _table = new table(json);
    const qb = new QueryBuilder(_table);

    console.log(
      qb
        .Select("id")
        .where([
          ["username", "gerredtor"],
          ["password", "1234"],
        ])
        .limit(2)
        .find(1)
    );

    return _table;
  }

  public save(table: table) {
    fs.writeFileSync(this.datadir, JSON.stringify(table));
  }
}

export default class Database {
  constructor(private readonly dataDir: string) {}

  public static loadTable(tableName: string): table {
    const file = new JsonDBFile(tableName);
    const table = file.load();
    return table;
  }
}
