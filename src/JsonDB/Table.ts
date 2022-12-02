interface tableI {
  schema: schema_entry[];
  keys: key_entry[];
  data: {}[];
}

interface schema_entry {
  name: string;
  key?: string;
  plugins?: string[];
}

interface key_entry {
  name: string;
  type: string;
}

class Keys {
  // keys: key_entry[];

  constructor(public json: key_entry[], private readonly schema: Schema) {}

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
  constructor(public json: any) {}

  public getByName(name: string): schema_entry {
    return this.json.find((entry: schema_entry) => entry.name === name);
  }

  public getIndexes(): string[] {
    let indexes = [];

    for (let entry of this.json) {
      indexes.push(entry.name);
    }

    return indexes;
  }
}
class Data {
  constructor(public json: any[]) {}
}

export default class Table {
  schema: Schema;
  keys: Keys;
  data: Data;

  constructor(public readonly name: string, { schema, keys, data }: tableI) {
    this.schema = new Schema(schema);
    this.keys = new Keys(keys, this.schema);
    this.data = new Data(data);
  }

  public stringify(): string {
    return JSON.stringify({
      schema: this.schema.json,
      keys: this.keys.json,
      data: this.data.json,
    });
  }
}
