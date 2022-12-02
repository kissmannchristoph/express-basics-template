import { ControllerDecorator } from "../../../../Framework/decorators";
import { Controller } from "../../../../Framework/System";

@ControllerDecorator("users")
export default class UserController extends Controller {
  constructor() {
    super();
  }
  
  public b: string = "dd"

  public a() {}
}
