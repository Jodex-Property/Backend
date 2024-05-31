import express, { Express, Response, Request, query } from "express";
import { PORT } from "./secrets";
import appRouter from "./routes/apiRoute";
import { PrismaClient } from "@prisma/client";

const app: Express = express();
app.use(express.json());
import cors from "cors";
import { errorMiddleware } from "./midlewares/error";
import { TenantSignUpSchema } from "./Schema/tenantSchema/users";
import { LandlordSignUpSchema } from "./Schema/landlordSchema/landlord";

app.use(cors({ credentials: true, origin: "*" }));

app.use(cors({ credentials: true, origin: "*" }));
app.options("*", cors());

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Jodex property app");
});

app.use("/api/v1", appRouter);

export const prisma = new PrismaClient({
  log: ["query"],
});

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log("App is working");
});
