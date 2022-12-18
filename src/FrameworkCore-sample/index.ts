
import Path from "path";
import StaticFile from "../FrameworkCore/File/StaticFile";
import {
  create
} from "../FrameworkCore/FrameworkCore";

create({
  rootDir: __dirname,
  serverRootDir: Path.join(__dirname, "servers"),
  staticFileDirs: [new StaticFile("files", __dirname, "files")],
});
