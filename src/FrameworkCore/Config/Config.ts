import File from "../File/File";

export default abstract class Config extends File {
  private data: any;

  constructor(uri: string, data: string | null) {
    super(uri);

    if (data != null) {
      this.data = this.Load<any>(data);
      return;
    }

    this.Load();
  }

  private mergeDataAndClass() {
    const c: any = this;
    const keys = Object.keys(this.data);
    const values = Object.values(this.data);

    for (let index in keys) {
      let key = keys[index];
      let value = values[index];

      c[key] = value;
    }
  }

  public Save() {
    this.writeFile(JSON.stringify(this.data));
  }

  public Load<T>(str: string = null) {
    this.data = JSON.parse(str ? str : this.readFile()) as T;
    this.mergeDataAndClass();
  }
}
