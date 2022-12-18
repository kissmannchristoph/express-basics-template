import File from "../File/File";
export default class Config extends File {
    data;
    constructor(uri, data) {
        super(uri);
        if (data != null) {
            this.data = this.Load(data);
            return;
        }
        this.Load();
    }
    mergeDataAndClass() {
        const c = this;
        const keys = Object.keys(this.data);
        const values = Object.values(this.data);
        for (let index in keys) {
            let key = keys[index];
            let value = values[index];
            c[key] = value;
        }
    }
    Save() {
        this.writeFile(JSON.stringify(this.data));
    }
    Load(str = null) {
        this.data = JSON.parse(str ? str : this.readFile());
        this.mergeDataAndClass();
    }
}
//# sourceMappingURL=Config.js.map