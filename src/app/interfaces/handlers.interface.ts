import { NextApiRequest, NextApiResponse } from "next";

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface HandlerOptions {
  method: HttpMethod;
  handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>;
  roles?: string[];
}

export interface ApiHandlerConfig {
  defaultRoles?: string[];
  handlers: HandlerOptions[];
}
