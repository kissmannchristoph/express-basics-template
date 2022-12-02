import Response from "../../../../Framework/Response";
import { ControllerDecorator, ActionDecorator, QueryParam } from "../../../../Framework/decorators";
import { Controller } from "../../../../Framework/System";

@ControllerDecorator()
export default class UserController extends Controller {
  constructor() {
    super("users", "default");
  }

  @ActionDecorator("get", "/")
  public test(@QueryParam("username") username: string = ''): Response {
    return null
  }
}
