import express from "express";
import { PORT } from "./src/secrets.js";
import appRoute from "./src/routes/index.js";
import { PrismaClient } from "@prisma/client";

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

export const prisma = new PrismaClient({
  log: ["query"],
});

/* The code `app.use(errorMiddleware);` is using the `errorMiddleware` function to handle errors in the
Express application. This middleware function will be called whenever an error occurs during the
request-response cycle. It helps in centralizing error handling logic and providing a consistent way
to handle errors across the application. */
app.use(errorMiddleware);
app.listen(PORT, () => {
  console.log(`app is listening on port ${PORT}`);
});
