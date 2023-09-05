import { Methods } from "../config";
import { methodDecoratorFactory } from "../factories";

const Get = methodDecoratorFactory(Methods.GET);
const Post = methodDecoratorFactory(Methods.POST);
const Put = methodDecoratorFactory(Methods.PUT);
const Delete = methodDecoratorFactory(Methods.DELETE);
const Patch = methodDecoratorFactory(Methods.PATCH);

export { Get, Post, Put, Delete, Patch };
