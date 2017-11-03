import { IController } from "../types/IController";
import { IRoute } from "../types/IRoute";

export function MapRoutes(curr: any, baseRoute: string = ''): IRoute[] {  

  curr.prototype._baseRoute = curr.prototype._baseRoute ? curr.prototype._baseRoute.replace(/\/$/g,'') : '';
  curr.prototype._routes = curr.prototype._routes || [];

  if(baseRoute.length > 1) {
    baseRoute = baseRoute.replace(/\/$/g,'') + '/';
    curr.prototype._baseRoute = curr.prototype._baseRoute.replace(/^\//g,'');
  }

  return curr.prototype._routes.map(item => {
    item.path = item.path.replace(/^\//g,'');
    item.path = baseRoute + curr.prototype._baseRoute + '/' + item.path;
    return item;
  });

}

