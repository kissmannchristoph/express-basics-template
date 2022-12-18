export default class Repository {
    name;
    constructor(name) {
        this.name = name;
    }
    find() {
        return null;
    }
    findOneBy(params) {
        return null;
    }
    findManyBy(params) {
        return null;
    }
    save() { }
    remove() { }
}
export class TestRepository extends Repository {
    constructor() {
        super("test");
    }
    t() {
        const a = this.find();
    }
}
//# sourceMappingURL=Repository.js.map