import z from "zod";
import dotenv from "dotenv";

dotenv.config({
  path: "../.env",
});

const envsSchema = z.object({
  NODE_ENV: z.string().min(1),
});
const envs = envsSchema.parse(envsSchema);

export default envs;
