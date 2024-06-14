import { z } from "zod";

const SignUpSchema = z.object({
  userName: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
  userType: z.string(),
  fullName: z.string(),
});

export default SignUpSchema;
