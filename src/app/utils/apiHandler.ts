import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authConfig } from "../auth";
import { ApiHandlerConfig } from "../interfaces";
import { ApiError } from "./errors";

const logger = (
  req: NextApiRequest,
  res: NextApiResponse,
  next: VoidFunction
) => {
  console.log(`[API] ${req.method} ${req.url}`);

  next();
};

const authenticate = async (
  req: NextApiRequest,
  res: NextApiResponse,
  next: VoidFunction
) => {
  const session = await getServerSession(req, res, authConfig);

  console.log("authenticate::", session);

  if (!session) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  next();
};

export const apiHandler =
  (config: ApiHandlerConfig) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const { method } = req;
      const matchingHandler = config.handlers.find((h) => h.method === method);

      if (!matchingHandler) {
        return res.status(405).json({ error: "Method Not Allowed" });
      }

      // Middleware execution
      logger(req, res, () => {});

      await authenticate(req, res, () => {});

      // await connectDB();

      await matchingHandler.handler(req, res);
    } catch (error) {
      handleError(error, res);
    }
  };

const handleError = (error: any, res: NextApiResponse) => {
  if (error instanceof ApiError) {
    res.status(error.statusCode).json({ error: error.message });
  } else {
    res
      .status(500)
      .json({ error: (error as Error).message || "Internal Server Error" });
  }
};
