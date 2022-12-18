import Path from "path";
import File from "./File";

export default class StaticFile extends File {
  constructor(
    public name: string,
    private readonly rootDir: string,
    private readonly path: string
  ) {
    super(Path.join(rootDir, path));
  }
}
