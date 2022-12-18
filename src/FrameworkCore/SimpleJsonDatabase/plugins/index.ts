import DynamicClass from "../../../class/DynamicClass";
import Table from "../Table";
import Plugin from "../Plugin";

export abstract class PluginBase {
  public name: string;

  private static _plugins: string[];

  public get plugins() {
    return PluginBase._plugins;
  }

  constructor(
    public arr: any,
    public index: any,
    public key: string,
    public value: any
  ) {}

  abstract run(): { success: boolean; array: any };

  public static registerPlugin(pluginName: string) {
    //
    this._plugins.push(pluginName);
  }

  public static updatePluginsMiddleware(
    table: Table,
    entryKey: string,
    args: any
  ): { success: boolean; array: any } {
    const entry = table.schema.getByName(entryKey);

    for (let plugin of entry.plugins) {
      let pluginInstance: Plugin;

      // try {

      pluginInstance = DynamicClass.InstanceObject<Plugin>(
        context,
        plugin,
        args
      );

      const { success, array } = pluginInstance.run();
      return { success: success, array: array };
    }
  }
}

class AutoIncrement extends PluginBase {
  constructor(arr: any, index: any, key: string, value: any) {
    super(arr, index, key, value);
    this.name = this.toString();
  }

  run(): { success: boolean; array: any } {
    this.value = this.arr.length;
    this.arr[this.index][this.key] = this.value;
    return { success: true, array: this.arr };
  }
}

class NotNull extends PluginBase {
  constructor(arr: any, index: any, key: string, value: any) {
    super(arr, index, key, value);
    this.name = this.toString();
  }

  run(): { success: boolean; array: any } {
    if (this.value === null || this.value === undefined)
      return { success: false, array: null };
    return { success: true, array: null };
  }
}

const context = {
  NotNull,
  AutoIncrement,
};

export default context;
