import { JsonResponse } from "../WebResponse";

class System {
        private controller: Controller

  
  
  public prepareControllerActionArgs(controller: any, method: "post" | "get", action: string)
  {
    let ca = new controllerA()
    ca.users.prototype
  }
  
  
}

class Controller {
  
}

class WebResponse {
  
}

function URLParam(id: string) {
    return (target: Object|any,
        propertyKey: string | symbol,
        parameterIndex: number) => {

        const topush = {
            target, propertyKey, parameterIndex, urlparam: id,
            ownKeys: Object.getOwnPropertyNames(target),
            function: target[propertyKey],
            // funcDescriptor: Object.getOwnPropertyDescriptor(target, propertyKey)
        };
        
    }
}


const Param = (key: string) => {
  return (target: any, memberName: string) => {
    let currentValue: any = target[memberName];
  };
}



function Route(id: string) {
    return (target: Object|any,
        propertyKey: string | symbol,
        parameterIndex: number) => {

        const topush = {
            target, propertyKey, parameterIndex, urlparam: id,
            ownKeys: Object.getOwnPropertyNames(target),
            function: target[propertyKey],
            // funcDescriptor: Object.getOwnPropertyDescriptor(target, propertyKey)
        };
        
    }
}

function Action(method: "get" | "post", route: string) {
  return (target: Object|any,
    propertyKey: string | symbol,
    parameterIndex: number) => {

    
}
}




//@Route("user")
class controllerA extends Controller {
  
  //@Action("get","asd")
  public users(@URLParam("") user: string): WebResponse {
    return new JsonResponse({})   
  }
}