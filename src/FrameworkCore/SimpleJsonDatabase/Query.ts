import Table from "./Table";
import { PluginBase } from "./plugins";

export default class Query {
  //private operations: string[] = [];

  constructor(private table: Table) {}

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

export class QueryBuilder {
  constructor(private readonly table: Table) {}

  Select(): Query {
    return new Query(this.table);
  }

  Replace(...datas: any[]) {
    let primary = this.table.keys.getPrimary();

    for (let data of datas) {
      if (data[primary.name]) {
        let primKeyVal: string = data[primary.name].toString();
        this.table.data.json.filter((entry: any, key: number) => {
          if (entry[primary.name].toString() === primKeyVal) {
            for (let newKey of this.table.schema.getIndexes()) {
              if (newKey !== primary.name) {
                const { success, array } = PluginBase.updatePluginsMiddleware(
                  this.table,
                  newKey,
                  {
                    arr: this.table.data.json,
                    index: key,
                    key: newKey,
                    value: data[newKey],
                  }
                );
                if (success) {
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

        let middlewareSuccess = true;
        const dataArr = this.table.data.json;
        dataArr.push(data);
        for (let newKey of this.table.schema.getIndexes()) {
          let length = dataArr.length;
          const { success, array } = PluginBase.updatePluginsMiddleware(
            this.table,
            newKey,
            {
              arr: dataArr,
              index: length - 1,
              key: newKey,
              value: data[newKey] ? data[newKey] : undefined,
            }
          );

          if (!success) {
            middlewareSuccess = false;
          } else {
            this.table.data.json = array;
          }
        }
        if (!middlewareSuccess) {
          console.log("data push abort");
          return;
        }
        this.table.data.json = dataArr;
      }
    }
  }
}
