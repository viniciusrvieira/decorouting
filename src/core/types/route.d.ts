import { Methods } from "../config";
import { RequestHandler } from "express";

export interface IRoute {
  method: Methods;
  path: string;
  middlewares: RequestHandler[];
  handlerName: string | symbol;
}
