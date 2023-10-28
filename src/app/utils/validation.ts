import { ObjectSchema, ValidationError } from "yup";
import { RequestValidationError } from "./error";

export const validateBody = async (body: any, schema: ObjectSchema<any>) => {
  try {
    const validBody = await schema.validate(body, {
      abortEarly: false,
      recursive: true,
      strict: true,
      stripUnknown: true,
    });

    return validBody;
  } catch (error) {
    throw new RequestValidationError(error as ValidationError);
  }
};
