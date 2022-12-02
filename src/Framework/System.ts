abstract class Controller {

    public getActionsByMethodAndRoute(method: string, route: string) {

    }



}

function URLParam (target: Object, propertyKey: string | symbol, parameterIndex: number)  {
    console.log("target", target)
}

export default class System {
    constructor(
        readonly controller: Controller[] = []
    ) {
        console.log("system")
        this.test()
    }

    public test(@URLParam s: string = null) 
    {
console.log("test")
    }
}

