import System, { Controller } from "./System";

const ControllerDecorator = () => (target: any) => {
console.log("c on dev")
        const instance = new target()
        const server = System.instance.getServer(instance.serverName)

        server.setControllerState(instance.name, instance)
    console.log("state", server.getControllerState(instance.name))
  
};

const ActionDecorator = (method: "get" | "post", url: string) => {
    
    return (target: any, name: any, descriptor: any) => {
        const instance = new target.constructor();
        const server = System.instance.getServer(instance.serverName)
        console.log("server", server)
        const state = server.getControllerState(instance.name)
        console.log("stateb", state)
        state.addRoute({
           method: method,
           url: url,
           callback: instance[name],
           middlewareList: [] 
        })
    }
}


const QueryParam = (name: string) => {
    
    return (target: any, name: any, descriptor: any) => {
       
    }
}



const URLParam = (name: string) => {
    
    return (target: any, name: any, descriptor: any) => {
       
    }
}


export { ControllerDecorator, ActionDecorator, QueryParam, URLParam };
