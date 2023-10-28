import { ObjectSchema } from "yup";
import { HTTP_STATUS_CODES } from ".";
import { ApiError } from "./errors";

export const validateBody = async (body: any, schema: ObjectSchema<any>) => {
  try {
    const validBody = await schema.validate(body, {
      abortEarly: true,
      recursive: true,
      strict: true,
      stripUnknown: true,
    });

    return validBody;
  } catch (error) {
    /* let errors: { [key: string]: string } = {};

    (error as ValidationError).inner.forEach((error: ValidationError) => {
      errors[`${error.path}`] = error.errors[0];
    });

    console.log("validation error::", errors); */

    throw new ApiError(HTTP_STATUS_CODES.BAD_REQUEST, (error as Error).message);
  }
};
