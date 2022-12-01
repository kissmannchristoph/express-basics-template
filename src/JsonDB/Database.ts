import fs, { readFileSync } from "fs";

interface json_db_table {
  schema: schema_entry[];
  keys: key_entry[];
  data: any[];
}

interface schema_entry {
  key?: string;
  plugins?: string[];
}

interface key_entry {
  name: string;
  type: string;
}

class file {
  private datadir = __dirname + "/../../data/";

  constructor(name: string) {
    this.datadir = this.datadir + name + ".json";
  }

  public load(): json_db_table {
    return JSON.parse(readFileSync(this.datadir).toString()) as json_db_table;
  }

  public save(table: json_db_table) {
    fs.writeFileSync(this.datadir, JSON.stringify(table));
  }
}

export default class Database {}
