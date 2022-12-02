import Table from "./Table";
import DynamicClass from "../class/DynamicClass";
import plugins from "./plugins";
export default abstract class Plugin {
  public name: string;

  private static _plugins: string[];

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
    //greeter.constructor.apply(greeter, new Array("World"));
  }

  //private static runPlugin(pluginName: )

  public static updatePluginsMiddleware(
    table: Table,
    entryKey: string,
    args: any
  ): { success: boolean; array: any } {
    const entry = table.schema.getByName(entryKey);
    //const plugins = entry.plugins;

    for (let plugin of entry.plugins) {
      let pluginInstance: Plugin;

      // try {
      pluginInstance = DynamicClass.InstanceObject<Plugin>(
        plugins,
        plugin,
        args
      );

      /*} catch (dcle: any) {
        console.log("no plugin registred");
        return {success: false, array: null};
      }*/

      const { success, array } = pluginInstance.run();
      return { success: success, array: array };
    }

    //plugin.apply(plugin, {arr,index,key});
  }
}
