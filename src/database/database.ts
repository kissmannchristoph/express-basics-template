export abstract class DatabaseUtil {
  constructor(public name: string) {
    //console.log(this.name);
  }

  abstract getByIndex(key: string, value: any): any;
  abstract setByIndex(key: string, value: any): any;
}

export default abstract class Database extends DatabaseUtil {

  constructor(name: string) {
    super(name);
  }

  abstract read(): any;
  abstract write(data: any): any;

  /* Database Utils */
  abstract getByIndex(key: string, value: any): any;
  abstract setByIndex(key: string, value: any): any;
}