import { HandlerOptions, HttpMethod } from "@/app/interfaces";
import { apiHandler } from "@/app/utils";
import { NextApiRequest, NextApiResponse } from "next";

const GET = (req: NextApiRequest, res: NextApiResponse) => {
  res.json({ data: "GET response" });
};

const POST = (req: NextApiRequest, res: NextApiResponse) => {
  res.json({ data: "POST response" });
};

const handlers: HandlerOptions[] = [
  { method: "GET" as HttpMethod, handler: GET },
  { method: "POST" as HttpMethod, handler: POST },
];

export default apiHandler({ handlers });
