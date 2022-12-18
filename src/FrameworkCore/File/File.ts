import { readFileSync, writeFileSync } from "fs";

export default abstract class File {
  constructor(private readonly uri: string) {
    return this;
  }

  public readFile(): string {
    return readFileSync(this.uri).toString();
  }

  public writeFile(val: string) {
    writeFileSync(this.uri, val);
  }
}
