import { z } from "zod";

export const LandlordSignUpSchema = z.object({
  userName: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
});
