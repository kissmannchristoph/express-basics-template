import DynamicClass from "../../class/DynamicClass";
import plugins from "./plugins";
export default class Plugin {
    arr;
    index;
    key;
    value;
    name;
    static _plugins;
    constructor(arr, index, key, value) {
        this.arr = arr;
        this.index = index;
        this.key = key;
        this.value = value;
    }
    static registerPlugin(pluginName) {
        //
        this._plugins.push(pluginName);
        //greeter.constructor.apply(greeter, new Array("World"));
    }
    //private static runPlugin(pluginName: )
    static updatePluginsMiddleware(table, entryKey, args) {
        const entry = table.schema.getByName(entryKey);
        //const plugins = entry.plugins;
        for (let plugin of entry.plugins) {
            let pluginInstance;
            // try {
            pluginInstance = DynamicClass.InstanceObject(plugins, plugin, args);
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
//# sourceMappingURL=Plugin.js.map