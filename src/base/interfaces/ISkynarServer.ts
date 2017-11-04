import * as express from "express";

export interface ISkynaServer {
  beforeInit?(app: Skynar.Application): void;
  afterInit?(app: Skynar.Application): void;

  boot(port: number, callback: Function): void;
}