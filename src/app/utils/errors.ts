import { NextApiResponse } from "next";
import { HTTP_STATUS_CODES } from ".";

export class ApiError extends Error {
  public readonly statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);

    this.statusCode = statusCode;
  }
}

export const handleError = (error: any, res: NextApiResponse) => {
  if (error instanceof ApiError) {
    return res.status(error.statusCode).json({ error: error.message });
  } else {
    return res
      .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ error: (error as Error).message || "Internal Server Error" });
  }
};
