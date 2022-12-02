abstract class Controller {

    public getActionsByMethodAndRoute(method: string, route: string) {

    }



}

function URLParam (target: Object, propertyKey: string | symbol, parameterIndex: number)  {
        console.log("p")
    }

export default class System {
    constructor(
        readonly controller: Controller[] = []
    ) {
        console.log("arguments", this.test.arguments)
    }
            
    public test(@URLParam s: string) 
    {

    }
}

