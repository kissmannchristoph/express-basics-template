export default abstract class Repository {
  constructor(public readonly name: String) {}

  public find<T = any>(): T[] {
    return null;
  }

  public findOneBy<T = any>(params: any): T {
    return null;
  }

  public findManyBy<T = any>(params: any): T[] {
    return null;
  }

  public save() {}

  public remove() {}
}

export class TestRepository extends Repository {
  constructor() {
    super("test");
  }

  t() {
    const a = this.find<String>();
  }
}
