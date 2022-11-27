import fs, {readFileSync} from 'fs';
import Database from './database';

const MAIN_DIR = __dirname + "/../../";

class JsonDatabaseClass extends Database {
  private datadir;

  constructor(name: string) {
    super(name);
    this.datadir = MAIN_DIR + "data/";
  }

  read() {
    try {
    return JSON.parse(readFileSync(this.datadir + this.name + ".json").toString());
    } catch (error: any)
    {
      return null;
    }
  }

  write(data: any) {
    fs.writeFileSync(this.datadir + this.name + '.json', JSON.stringify(data));
  }

  getByIndex(key: string, value: any) {
    if (!this.read())
       return null;
      
    return this.read().find((d: any) => d[key] === value);
  }

  setByIndex(key: string, value: any) {
    
  }
}

const JsonDatabase = (name: string) => {
  return new JsonDatabaseClass(name);
}

export default JsonDatabase;