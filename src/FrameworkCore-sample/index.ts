import FrameworkCore, {
  Create,
  CreateOptions,
} from "../FrameworkCore/FrameworkCore";
import Path from "path";
import StaticFile from "../FrameworkCore/File/StaticFile";

const createOptions: CreateOptions = {
  rootDir: __dirname,
  serverRootDir: Path.join(__dirname, "servers"),
  staticFileDirs: [new StaticFile("files", __dirname, "files")],
};

Create(createOptions);
