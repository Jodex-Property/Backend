import express, { Express, Response, Request, query } from "express";
import { PORT } from "./secrets";
import appRouter from "./routes/apiRoute";
import { PrismaClient } from "@prisma/client";

const app: Express = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Jodex property app");
});

app.use("/api/v1", appRouter);

export const prisma = new PrismaClient({
  log: ["query"],
});
app.listen(PORT, () => {
  console.log("App is working");
});
