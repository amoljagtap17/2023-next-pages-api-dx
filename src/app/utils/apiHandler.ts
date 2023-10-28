import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authConfig } from "../auth";
import { ApiHandlerConfig } from "../interfaces";
import { connectDB } from "./connectDB";
import { ApiError } from "./errors";

const logger = (req: NextApiRequest, res: NextApiResponse) => {
  console.log(`[API] ${req.method} ${req.url}`);
};

const authenticate = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authConfig);

  if (!session) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  // @ts-ignore
  req.session = session;
};

const authorize = async (
  req: NextApiRequest,
  res: NextApiResponse,
  requiredRoles?: string[]
) => {
  if (!requiredRoles) return;

  // @ts-ignore
  const { user } = req.session;

  const rolePresent = requiredRoles.some((role) => user.roles.includes(role));

  if (!rolePresent) {
    return res.status(403).json({ error: "Role not authorized" });
  }
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
      logger(req, res);

      await authenticate(req, res);
      await authorize(req, res, matchingHandler.roles || config.defaultRoles);

      await connectDB();

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
