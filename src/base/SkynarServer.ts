import * as express from "express";
import * as http from "http";
import { ISkynaServer } from "./interfaces/ISkynarServer"

export class SkynarServer implements ISkynaServer {
  private _app: Skynar.Application;

  public boot(port: number = 3000, callback: Function = null) {
    http.createServer(this._app).listen(port, err => {
      if(err) console.log(err);
      console.log(`Your server is online! Port: ${port}`);
      if(callback) callback();
    })
  }

  public beforeInit(app){
    
  }

  public afterInit(app){
    
  }
}