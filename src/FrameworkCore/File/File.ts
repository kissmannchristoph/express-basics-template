import { readFileSync, writeFileSync, lstatSync } from "fs";
import Path from "path";

export default abstract class File {
  constructor(private uri: string) {
    return this;
  }

  public IsDirectory(): boolean {
    return lstatSync(this.uri).isDirectory();
  }

  public IsFile(): boolean {
    return lstatSync(this.uri).isFile();
  }

  public GetDirecotry(): File {
    this.uri = Path.dirname(this.uri).split(Path.sep).pop();
    return this;
  }

  public Join(uri: string): File {
    this.uri = Path.join(this.uri, uri);
    return this;
  }

  public ExistFile(): boolean {
    return this.IsFile();
  }

  public readFile(): string {
    if (!this.ExistFile()) this.writeFile("");

    return readFileSync(this.uri).toString();
  }

  public ReadJson<T>(): T {
    return JSON.parse(this.readFile()) as T;
  }

  public writeFile(val: string) {
    writeFileSync(this.uri, val);
  }
}
