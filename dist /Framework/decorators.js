import System from "./System";
const ControllerDecorator = () => (target) => {
    console.log("c on dev");
    const instance = new target();
    const server = System.instance.getServer(instance.serverName);
    server.setControllerState(instance.name, instance);
    console.log("state", server.getControllerState(instance.name));
};
const ActionDecorator = (method, url) => {
    return (target, name, descriptor) => {
        const instance = new target.constructor();
        const server = System.instance.getServer(instance.serverName);
        console.log("server", server);
        const state = server.getControllerState(instance.name);
        console.log("stateb", state);
        state.addRoute({
            method: method,
            url: url,
            callback: instance[name],
            middlewareList: []
        });
    };
};
const QueryParam = (name) => {
    return (target, name, descriptor) => {
    };
};
const URLParam = (name) => {
    return (target, name, descriptor) => {
    };
};
export { ControllerDecorator, ActionDecorator, QueryParam, URLParam };
//# sourceMappingURL=decorators.js.map