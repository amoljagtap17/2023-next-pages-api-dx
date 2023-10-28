import { NextApiRequest, NextApiResponse } from "next";
import { HTTP_STATUS_CODES, authenticate, authorize, logger } from ".";
import { ApiHandlerConfig } from "../interfaces";
import { connectDB } from "./connectDB";
import { handleError } from "./errors";
import { validateBody } from "./validation";

export const apiHandler =
  (config: ApiHandlerConfig) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const { method } = req;
      const matchingHandler = config.handlers.find((h) => h.method === method);

      if (!matchingHandler) {
        return res
          .status(HTTP_STATUS_CODES.METHOD_NOT_ALLOWED)
          .json({ error: `Method ${req.method} Not Allowed` });
      }

      logger(req, res);

      await authenticate(req, res);
      await authorize(req, res, matchingHandler.roles || config.defaultRoles);

      if (matchingHandler.bodySchema) {
        await validateBody(req.body, matchingHandler.bodySchema);
      }

      await connectDB();

      await matchingHandler.handler(req, res);
    } catch (error) {
      return handleError(error, res);
    }
  };
