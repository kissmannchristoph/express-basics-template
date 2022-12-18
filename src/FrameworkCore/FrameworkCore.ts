import File from "../File";

class FrameworkCore {
  constructor(private env: any, private staicFilesDir: string) {}

  public Env(): any {
    return this.env;
  }
  
  public GetStaticFile(path: string)
}

export abstract class CreateOptions {
  public rootDir?: string;
  public staticFilesDir?: string;
}

const Create = (createOptions: CreateOptions) => {
  let env = {};

  if (createOptions.rootDir) {
    env = JSON.parse(new File(createOptions.rootDir + "env.json").readFile());
  }

  let frameworkCore = new FrameworkCore(env);
};

export { Create };
