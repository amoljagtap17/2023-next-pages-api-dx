import { NextApiResponse } from "next";
import { HTTP_STATUS_CODES } from ".";
import { AbstractError } from "./error/abstract-error";

export const handleError = (error: Error, res: NextApiResponse) => {
  if (error instanceof AbstractError) {
    const errors = error.serializeErrors();

    return res.status(error.statusCode).json({ errors });
  } else {
    return res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      errors: [
        { message: (error as Error).message || "Internal Server Error" },
      ],
    });
  }
};
