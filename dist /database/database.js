export class DatabaseUtil {
    name;
    constructor(name) {
        this.name = name;
        //console.log(this.name);
    }
}
export default class Database extends DatabaseUtil {
    constructor(name) {
        super(name);
    }
}
//# sourceMappingURL=database.js.map