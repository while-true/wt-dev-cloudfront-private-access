import { z } from "zod";
import { LoginRequest } from "@/types/auth";

export const validateLoginRequestBody = (request: LoginRequest) => {
  const loginRequestSchema = z.object({
    email: z.string().email(),
    password: z.string(),
  });

  loginRequestSchema.parse(request);
};
