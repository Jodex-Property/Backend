import express, { Express, query } from "express";
//import { PORT } from "./secrets";
import dotenv from "dotenv";
import appRouter from "./routes/apiRoute.js";
import { PrismaClient } from "@prisma/client";

dotenv.config({ path: ".env" });
const app = express();
app.use(express.json());
import cors from "cors";
import { errorMiddleware } from "./middlewares/error.js";
//import { TenantSignUpSchema } from "./Schema/tenantSchema/users.";
import { SignUpSchema } from "./Schema/Schema/user.js";

app.use(cors({ credentials: true, origin: "*" }));

app.use(cors({ credentials: true, origin: "*" }));
app.options("*", cors());

app.get("/", (req, res) => {
  res.send("Welcome to Jodex property app");
});

app.use("/api/v1", appRouter);

export const prisma = new PrismaClient({
  log: ["query"],
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  console.log("App is working");
});
