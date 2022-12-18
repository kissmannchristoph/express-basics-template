import JsonDBFile from "./JsonDBFile";
import Table from "./Table";

export default class Database {
  constructor() {}

  public static loadTable(tableName: string): Table {
    const file = new JsonDBFile(tableName);
    const table = file.load();
    return table;
  }

  public static saveTable(table: Table) {
    const file = new JsonDBFile(table.name);
    file.save(table);
  }
}
