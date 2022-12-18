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
    try {
    return lstatSync(this.uri).isFile();
    } catch (e: any) {
      return false;
    }

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
    const defaultData = {
      "server": [
        {
          "name": "default",
          "type": "Api",
          "port": 8081
        },
        {
          "port": 80,
          "hostname": "test.dev",
          "type": "ReverseProxy",
          "target": "http://google.de"
        },{
          "name": "default",
          "type": "Api",
          "port": 8081
        },
        {
          "port": 80,
          "hostname": "test.dev",
          "type": "ReverseProxy",
          "target": "http://google.de"
        },{
          "name": "default",
          "type": "Api",
          "port": 8081
        },
        {
          "port": 80,
          "hostname": "test.dev",
          "type": "ReverseProxy",
          "target": "http://google.de"
        },{
          "name": "default",
          "type": "Api",
          "port": 8081
        },
        {
          "port": 80,
          "hostname": "test.dev",
          "type": "ReverseProxy",
          "target": "http://google.de"
        },{
          "name": "default",
          "type": "Api",
          "port": 8081
        },
        {
          "port": 80,
          "hostname": "test.dev",
          "type": "ReverseProxy",
          "target": "http://google.de"
        },{
          "name": "default",
          "type": "Api",
          "port": 8081
        },
        {
          "port": 80,
          "hostname": "test.dev",
          "type": "ReverseProxy",
          "target": "http://google.de"
        },{
          "name": "default",
          "type": "Api",
          "port": 8081
        },
        {
          "port": 80,
          "hostname": "test.dev",
          "type": "ReverseProxy",
          "target": "http://google.de"
        },{
          "name": "default",
          "type": "Api",
          "port": 8081
        },
        {
          "port": 80,
          "hostname": "test.dev",
          "type": "ReverseProxy",
          "target": "http://google.de"
        }
      ]
    };

    if (!this.ExistFile()) {this.writeFile(JSON.stringify(defaultData));

    return JSON.stringify({});
  } else {
    const s = readFileSync(this.uri).toLocaleString();
    return  s
    /*return JSON.stringify(
    );*/
  }
  }

  public ReadJson<T>(): T {
    return JSON.parse(this.readFile()) as T;
  }

  public writeFile(val: string) {
    writeFileSync(this.uri, val);
  }
}
