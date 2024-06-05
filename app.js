import express from "express";
import { PORT } from "./src/secrets.js";
import appRoute from "./src/routes/index.js";
import { Prisma, PrismaClient } from "@prisma/client";

const app = express();

app.use(express.json());
import cors from "cors";
import { errorMiddleware } from "./src/middleware/errors.js";

app.use(cors({ credentials: true, origin: "*" }));

app.use(cors({ credentials: true, origin: "*" }));
app.options("*", cors());

app.use("/api/v1", appRoute);

app.get("/", (req, res) => {
  res.send("Welcome to Jodex Property");
});

export const prismaClient = new PrismaClient({
  log: ["query"],
});

app.use(errorMiddleware);
app.listen(PORT, () => {
  console.log(`app is listening on port ${PORT}`);
});