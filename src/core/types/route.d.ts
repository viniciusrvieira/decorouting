import { RequestHandler } from "express";

export interface IRoute {
  method: "get" | "post" | "put" | "patch" | "delete";
  path: string;
  middlewares: RequestHandler[];
  handlerName: string | symbol;
}
