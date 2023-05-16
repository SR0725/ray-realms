import { z } from "zod";
import { log } from "logger";

const isValid = (data: any, schema: z.ZodObject<any, any>) => {
  const validation = schema.safeParse(data);
  if (!validation.success) {
    log(validation.error);
    return false;
  }
  return true;
};

export default isValid;
