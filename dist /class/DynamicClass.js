export class DynamicClassLoadError extends Error {
}
export default class DynamicClass {
    static InstanceObject(context, className, args) {
        console.log("InstanceObject", className, args, context);
        if (context[className] === undefined || context[className] === null) {
            throw new DynamicClassLoadError(`Class type of \'${className}\' is not in the context`);
        }
        return new context[className](args["arr"], args["index"], args["key"], args["value"]);
    }
}
//# sourceMappingURL=DynamicClass.js.map