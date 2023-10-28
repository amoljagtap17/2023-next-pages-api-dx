import { NextApiRequest, NextApiResponse } from "next";
import { ROLES_ENUM } from "../utils";

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface HandlerOptions {
  method: HttpMethod;
  handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>;
  roles?: ROLES_ENUM[];
  bodySchema?: any;
}

export interface ApiHandlerConfig {
  defaultRoles?: ROLES_ENUM[];
  handlers: HandlerOptions[];
}
