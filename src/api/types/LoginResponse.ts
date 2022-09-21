import { z } from "zod";

export const LoginResponse = z.object({
  token: z.string(),
});
