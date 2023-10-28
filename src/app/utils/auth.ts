import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authConfig } from "../auth";

export const authenticate = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const session = await getServerSession(req, res, authConfig);

  if (!session) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  // @ts-ignore
  req.session = session;
};

export const authorize = async (
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
