import { IServerOptions } from "../types/IServerOptions";
import * as express from "express";
import { ConfigureApp } from "../helpers/ConfigureApp";

export function Server(options: IServerOptions) {
  return function(target) {
    if(!options.providers) options.providers = [];

    // Create express app
    let app = ConfigureApp.SetConfig(express(), options)

    // Save target
    let original = target;

    // New constructor
    let server = function(...args) {

      new original(...args);

      this.beforeInit(app);
      ConfigureApp.SetRoutes(app, options);
      this.afterInit(app);
      
    }
    // Copy original props to new module
    server.prototype = original.prototype;
    // Increment properties
    server.prototype._app = app;
    // Return new module
    return <any>server;
  }
}