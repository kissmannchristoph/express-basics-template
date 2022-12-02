
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
    return (target: Object,
        propertyKey: string | symbol,
        parameterIndex: number) => {

        const topush = {
            target, propertyKey, parameterIndex, urlparam: id,
            ownKeys: Object.getOwnPropertyNames(target),
            function: target[propertyKey],
            // funcDescriptor: Object.getOwnPropertyDescriptor(target, propertyKey)
        };
        registered.push(topush);
    }
}


const Param = (key: string) => {
  return (target: any, memberName: string) => {
    let currentValue: any = target[memberName];

    Object.defineProperty(target, memberName, {
      set: (newValue: any) => {
        if (!allowlist.includes(newValue)) {
          return;
        }
        currentValue = newValue;
      },
      get: () => currentValue
    });
  };
}



function Route(id: string) {
    return (target: Object,
        propertyKey: string | symbol,
        parameterIndex: number) => {

        const topush = {
            target, propertyKey, parameterIndex, urlparam: id,
            ownKeys: Object.getOwnPropertyNames(target),
            function: target[propertyKey],
            // funcDescriptor: Object.getOwnPropertyDescriptor(target, propertyKey)
        };
        registered.push(topush);
    }
}

function Action(method: "get" | "post", route: string) {
    return (target: Object,
        propertyKey: string | symbol,
        parameterIndex: number) => {

        const topush = {
            target, propertyKey, parameterIndex, urlparam: id,
            ownKeys: Object.getOwnPropertyNames(target),
            function: target[propertyKey],
            // funcDescriptor: Object.getOwnPropertyDescriptor(target, propertyKey)
        };
        registered.push(topush);
    }
}




@Route("user")
class controllerA extends Controller {
  
  @Action("get",))
  public users(@Param("") user: string): WebResponse {
    
  }
}