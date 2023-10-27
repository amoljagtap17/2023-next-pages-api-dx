import { NextApiRequest, NextApiResponse } from "next";
import { ApiHandlerConfig } from "../interfaces";

const logger = (
  req: NextApiRequest,
  res: NextApiResponse,
  next: VoidFunction
) => {
  console.log(`[API] ${req.method} ${req.url}`);

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

      // await connectDB();

      return matchingHandler.handler(req, res);
    } catch (error) {
      return res.status(500).json({
        error: (error as Error).message || "Internal Server Error",
      });
    }
  };
