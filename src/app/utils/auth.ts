import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { HTTP_STATUS_CODES, ROLES_ENUM } from ".";
import { authConfig } from "../auth";

export const authenticate = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const session = await getServerSession(req, res, authConfig);

  if (!session) {
    return res
      .status(HTTP_STATUS_CODES.UNAUTHORIZED)
      .json({ error: "Not authenticated" });
  }

  // @ts-ignore
  req.session = session;
};

export const authorize = async (
  req: NextApiRequest,
  res: NextApiResponse,
  requiredRoles?: ROLES_ENUM[]
) => {
  if (!requiredRoles) return;

  // @ts-ignore
  const { user } = req.session;

  const rolePresent = requiredRoles.some((role) => user.roles.includes(role));

  if (!rolePresent) {
    return res
      .status(HTTP_STATUS_CODES.FORBIDDEN)
      .json({ error: "Role not authorized" });
  }
};
