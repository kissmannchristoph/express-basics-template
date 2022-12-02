export class DynamicClassLoadError extends Error {}

export default class DynamicClass {
  public static InstanceObject<T>(
    context: any,
    className: string,
    ...args: any[]
  ): T {
    console.log("InstanceObject", className, ...args);
    if (context[className] === undefined || context[className] === null) {
      throw new DynamicClassLoadError(
        `Class type of \'${className}\' is not in the context`
      );
    }
    return new context[className](...args);
  }
}
