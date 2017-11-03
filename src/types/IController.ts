import { IRoute } from "./IRoute";


export interface IController {

  _baseRoute: string;
  _routes: Array<IRoute>;
}