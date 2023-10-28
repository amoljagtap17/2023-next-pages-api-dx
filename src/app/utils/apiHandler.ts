import { NextApiRequest, NextApiResponse } from "next";
import { authenticate, authorize, logger } from ".";
import { ApiHandlerConfig } from "../interfaces";
import { connectDB } from "./connectDB";
import { handleError } from "./errors";

export const apiHandler =
  (config: ApiHandlerConfig) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const { method } = req;
      const matchingHandler = config.handlers.find((h) => h.method === method);

      if (!matchingHandler) {
        return res
          .status(405)
          .json({ error: `Method ${req.method} Not Allowed` });
      }

      logger(req, res);

      await authenticate(req, res);
      await authorize(req, res, matchingHandler.roles || config.defaultRoles);

      await connectDB();

      await matchingHandler.handler(req, res);
    } catch (error) {
      return handleError(error, res);
    }
  };
