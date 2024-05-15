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

dotenv.config();
const PORT = process.env.PORT;
const app: Application = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors({ credentials: true, origin: "*" }));
app.options("*", cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Jodex app");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
