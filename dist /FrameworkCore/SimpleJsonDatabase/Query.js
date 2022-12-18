import { PluginBase } from "./plugins";
export default class Query {
    table;
    //private operations: string[] = [];
    constructor(table) {
        this.table = table;
    }
    _orderBy;
    _where;
    _limit;
    all() {
        const data = this.table.data;
        let parsedData;
        if (this._where) {
            parsedData = data.json.filter((entry) => {
                let success = true;
                for (let whereItem of this._where) {
                    const [key, val] = whereItem;
                    if (entry[key] !== val)
                        success = false;
                }
                return success;
            });
        }
        else {
            parsedData = data.json;
        }
        if (this._limit) {
            let lPD = [];
            for (let i = 0; i < this._limit; i++) {
                if (parsedData[i])
                    lPD.push(parsedData[i]);
            }
            parsedData = lPD;
        }
        return parsedData;
    }
    find(id = undefined) {
        if (id) {
            const primary = this.table.keys.getPrimary();
            return this.limit(1)
                .where([[primary.name, id]])
                .all()[0];
        }
        return this.limit(1).all()[0];
    }
    orderBy() { }
    where(_where) {
        this._where = _where;
        return this;
    }
    limit(_limit) {
        this._limit = _limit;
        return this;
    }
}
export class QueryBuilder {
    table;
    constructor(table) {
        this.table = table;
    }
    Select() {
        return new Query(this.table);
    }
    Replace(...datas) {
        let primary = this.table.keys.getPrimary();
        for (let data of datas) {
            if (data[primary.name]) {
                let primKeyVal = data[primary.name].toString();
                this.table.data.json.filter((entry, key) => {
                    if (entry[primary.name].toString() === primKeyVal) {
                        for (let newKey of this.table.schema.getIndexes()) {
                            if (newKey !== primary.name) {
                                const { success, array } = PluginBase.updatePluginsMiddleware(this.table, newKey, {
                                    arr: this.table.data.json,
                                    index: key,
                                    key: newKey,
                                    value: data[newKey],
                                });
                                if (success) {
                                    this.table.data.json[key][newKey] = data[newKey];
                                }
                                else {
                                    console.log("data update abort");
                                }
                            }
                        }
                    }
                });
            }
            else {
                //no primary
                let middlewareSuccess = true;
                const dataArr = this.table.data.json;
                dataArr.push(data);
                for (let newKey of this.table.schema.getIndexes()) {
                    let length = dataArr.length;
                    const { success, array } = PluginBase.updatePluginsMiddleware(this.table, newKey, {
                        arr: dataArr,
                        index: length - 1,
                        key: newKey,
                        value: data[newKey] ? data[newKey] : undefined,
                    });
                    if (!success) {
                        middlewareSuccess = false;
                    }
                    else {
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
//# sourceMappingURL=Query.js.map