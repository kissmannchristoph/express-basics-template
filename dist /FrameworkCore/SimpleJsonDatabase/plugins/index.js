import DynamicClass from "../../../class/DynamicClass";
export class PluginBase {
    arr;
    index;
    key;
    value;
    name;
    static _plugins;
    get plugins() {
        return PluginBase._plugins;
    }
    constructor(arr, index, key, value) {
        this.arr = arr;
        this.index = index;
        this.key = key;
        this.value = value;
    }
    static registerPlugin(pluginName) {
        //
        this._plugins.push(pluginName);
    }
    static updatePluginsMiddleware(table, entryKey, args) {
        const entry = table.schema.getByName(entryKey);
        for (let plugin of entry.plugins) {
            let pluginInstance;
            // try {
            pluginInstance = DynamicClass.InstanceObject(context, plugin, args);
            const { success, array } = pluginInstance.run();
            return { success: success, array: array };
        }
    }
}
class AutoIncrement extends PluginBase {
    constructor(arr, index, key, value) {
        super(arr, index, key, value);
        this.name = this.toString();
    }
    run() {
        this.value = this.arr.length;
        this.arr[this.index][this.key] = this.value;
        return { success: true, array: this.arr };
    }
}
class NotNull extends PluginBase {
    constructor(arr, index, key, value) {
        super(arr, index, key, value);
        this.name = this.toString();
    }
    run() {
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
//# sourceMappingURL=index.js.map