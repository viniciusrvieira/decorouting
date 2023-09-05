import "reflect-metadata";

import * as http from "http";

import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

import { Application } from "../src/core/application";
import { routers } from "./routers";

const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: "http://localhost:4200",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

const application = new Application(
  [bodyParser.json(), cors(corsOptions), cookieParser()],
  routers
);

const server = http.createServer(application.instance);

server.listen(PORT, () => {
  console.log(`Server is listening on :${PORT}`);
});
