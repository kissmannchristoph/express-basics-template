import JsonDBFile from "./index";
export default class Database {
    constructor() { }
    static loadTable(tableName) {
        const file = new JsonDBFile(tableName);
        const table = file.load();
        return table;
    }
    static saveTable(table) {
        const file = new JsonDBFile(table.name);
        file.save(table);
    }
}
//# sourceMappingURL=Database.js.map