import { NextApiRequest, NextApiResponse } from "next";

export const logger = (req: NextApiRequest, res: NextApiResponse) => {
  console.log(`[API] ${req.method} ${req.url}`);
};
