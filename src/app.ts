import express, {
  NextFunction,
  Request,
  Response,
  type Application,
} from "express";

import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import { request } from "http";
import v1Api from "./routes/apiRoutes";
import { config } from "./configurations/config";
import path from "path";
import { engine } from "express-handlebars";
// import requestHeaders from "./middlewares/handlers/requestHeaders";
// import errorHandler from "./middlewares/handlers/requestErrorHandler";
//import { Winston } from "./middlewares/errors/winstonErrorLogger";
import prisma from "./database/db";
import { NotFoundError } from "./errors";
import { ServerUtils } from "./utilities/utils";
import { StatusCodes } from "http-status-codes";
const utils = new ServerUtils();
dotenv.config();
const PORT = process.env.PORT;
const app: Application = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors({ credentials: true, origin: "*" }));
app.options("*", cors());
app.use(express.json());

app.use("/api", v1Api);
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Jodex app");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
