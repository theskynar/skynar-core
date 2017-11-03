import * as express from "express";
import * as http from "http";

export class SkynarServer {
  private _app: express.Express;

  public boot(port: number = 3000, callback: Function = null) {
    http.createServer(this._app).listen(port, err => {
      if(err) console.log(err);
      console.log(`Your server is online! Port: ${port}`);
      if(callback) callback();
    })
  }
}