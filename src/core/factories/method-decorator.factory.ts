import "reflect-metadata";

import { MetadataKeys, Methods } from "../config";
import { IRoute } from "../types/route";
import { RequestHandler } from "express";

export const methodDecoratorFactory =
  (method: Methods) =>
  (path: string, middlewares: RequestHandler[] = []): MethodDecorator =>
  (target, propertyKey) => {
    const targetClass = target.constructor;

    const classRoutes = Reflect.getMetadata(MetadataKeys.ROUTES, targetClass);

    const routes: IRoute[] = classRoutes || [];

    routes.push({
      method,
      path,
      middlewares,
      handlerName: propertyKey,
    });

    Reflect.defineMetadata(MetadataKeys.ROUTES, routes, targetClass);
  };
