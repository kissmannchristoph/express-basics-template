import fs, { readFileSync } from "fs";
import DynamicClass, { DynamicClassLoadError } from "../class/DynamicClass";

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
  private keys: key_entry[];

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

  public get(): schema_entry[] {
    return this.json;
  }

  public getIndexes(): string[] {
    let indexes = [];

    for (let entry of this.get()) {
      indexes.push(entry.name);
    }

    return indexes;
  }
}
class Data {
  constructor(public json: any[]) {}
}

class Query {
  private operations: string[] = [];

  constructor(
    private table: table,
    private readonly operation: "select",
    private readonly select: string[]
  ) {}

  private _orderBy: any;
  private _where: any;
  private _limit: any;

  public all(): any[] {
    const data = this.table.data;
    let parsedData: any[];

    if (this._where) {
      parsedData = data.json.filter((entry: any) => {
        let success = true;
        for (let whereItem of this._where) {
          const [key, val]: any = whereItem;
          if (entry[key] !== val) success = false;
        }
        return success;
      });
    } else {
      parsedData = data.json;
    }

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
      return this.limit(1)
        .where([[primary.name, id]])
        .all()[0];
    }

    return this.limit(1).all()[0];
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

interface plugin_constructor_args {
  arr: any[];
  index: any;
  key: string;
}

abstract class Plugin {
  public name: string;

  private static _plugins: string[];

  constructor(
    public arr: any,
    public index: any,
    public key: string,
    public value: any
  ) {}

  abstract run(): { success: boolean; array: any };

  public static get plugins() {
    return Plugin._plugins;
  }

  public static registerPlugin(pluginName: string) {
    //
    this._plugins.push(pluginName);
    //greeter.constructor.apply(greeter, new Array("World"));
  }

  //private static runPlugin(pluginName: )

  public static updatePluginsMiddleware(
    table: table,
    entryKey: string,
    ...args: any[]
  ): boolean {
    console.log("uPM entryKey", entryKey);
    console.log("uPM ...args", ...args);
    const entry = table.schema.getByName(entryKey);
    const plugins = entry.plugins;

    for (let plugin of plugins) {
      let pluginInstance: Plugin;

      try {
        pluginInstance = DynamicClass.InstanceObject<Plugin>(
          plugin_context,
          plugin,
          ...args
        );
        const { success, array } = pluginInstance.run();
        console.log("run call ", plugin, array);
        return success;
      } catch (dcle: any) {
        console.log("no plugin registred", plugin);
        return false;
      }
    }

    //plugin.apply(plugin, {arr,index,key});
  }
}

export class AutoIncrement extends Plugin {
  constructor(arr: any, index: any, key: string, value: any) {
    super(arr, index, key, value);
    this.name = this.toString();
  }

  run(): { success: boolean; array: any } {
    this.arr[this.index][this.key] = this.value;

    return { success: true, array: this.arr };
  }
}

export class NotNull extends Plugin {
  constructor(arr: any, index: any, key: string, value: any) {
    super(arr, index, key, value);
    this.name = this.toString();
  }

  run(): { success: boolean; array: any } {
    if (this.value === null || this.value === undefined)
      return { success: false, array: null };
    return { success: true, array: null };
  }
}

const plugin_context = {
  AutoIncrement,
  NotNull,
};

class QueryBuilder {
  constructor(private readonly table: table) {}

  Select(...selects: string[]): Query {
    return new Query(this.table, "select", selects);
  }

  Replace(...datas: any[]) {
    let primary = this.table.keys.getPrimary();

    for (let data of datas) {
      if (data[primary.name]) {
        let primKeyVal: string = data[primary.name].toString();
        this.table.data.json.filter((entry: any, key: number) => {
          if (entry[primary.name].toString() === primKeyVal) {
            for (let newKey of this.table.schema.getIndexes()) {
              //Object.keys(data)) {
              if (newKey !== primary.name) {
                if (
                  !Plugin.updatePluginsMiddleware(
                    this.table,
                    newKey,
                    "update",
                    {
                      arr: this.table.data.json,
                      index: key,
                      key: newKey,
                      value: data[newKey],
                    }
                  )
                ) {
                  this.table.data.json[key][newKey] = data[newKey];
                } else {
                  console.log("data update abort");
                }
              }
            }
          }
        });
      } else {
        //no primary
        console.log("noprim");

        let middlewareSuccess = true;
        let dataArr = this.table.data.json;

        for (let newKey of this.table.schema.getIndexes()) {
          //dataArr.push(
          if (
            !Plugin.updatePluginsMiddleware(this.table, newKey, "insert", {
              arr: dataArr,
              index: dataArr.length - 1,
              key: newKey,
              value: dataArr.length,
            })
          ) {
            middlewareSuccess = false;
          }
        }
        if (!middlewareSuccess) {
          console.log("data push abort");
          return;
        }
        this.table.data.json = dataArr;

        // let newID =
        //   this.table.data.json[this.table.data.json.length - 1].id + 1;
        // data.id = newID;
      }
    }
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

    qb.Replace(
      { id: "1", username: "a", password: "b" },
      { username: "a", password: "b" }
    );

    console.log(qb.Select("id").all());

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
