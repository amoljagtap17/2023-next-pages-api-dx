import { NextApiResponse } from "next";

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
      .status(500)
      .json({ error: (error as Error).message || "Internal Server Error" });
  }
};
