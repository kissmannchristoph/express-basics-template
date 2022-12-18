class Keys {
    json;
    schema;
    // keys: key_entry[];
    constructor(json, schema) {
        this.json = json;
        this.schema = schema;
    }
    getPrimary() {
        //check prim key exists
        if (!this.json.filter((entry) => entry.name === "primary")[0]) {
            console.log("no prim"); //fail
            return null;
        }
        return this.schema.json.filter((entry) => entry.key && entry.key === "primary")[0];
    }
}
class Schema {
    json;
    constructor(json) {
        this.json = json;
    }
    getByName(name) {
        return this.json.find((entry) => entry.name === name);
    }
    getIndexes() {
        let indexes = [];
        for (let entry of this.json) {
            indexes.push(entry.name);
        }
        return indexes;
    }
}
class Data {
    json;
    constructor(json) {
        this.json = json;
    }
}
export default class Table {
    name;
    schema;
    keys;
    data;
    constructor(name, { schema, keys, data }) {
        this.name = name;
        this.schema = new Schema(schema);
        this.keys = new Keys(keys, this.schema);
        this.data = new Data(data);
    }
    stringify() {
        return JSON.stringify({
            schema: this.schema.json,
            keys: this.keys.json,
            data: this.data.json,
        });
    }
}
//# sourceMappingURL=Table.js.map