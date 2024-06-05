import { z } from "zod";

export const SignUpSchema = z.object({
  userName: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
  userType: z.string(),
});
