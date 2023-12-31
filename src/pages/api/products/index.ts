import { HandlerOptions, HttpMethod } from "@/app/interfaces";
import { createProductSchema } from "@/app/schemas";
import { ProductService } from "@/app/services";
import { HTTP_STATUS_CODES, ROLES_ENUM, apiHandler } from "@/app/utils";
import { NextApiRequest, NextApiResponse } from "next";

const productService = new ProductService();

const GET = async (req: NextApiRequest, res: NextApiResponse) => {
  const products = await productService.find();

  res.status(HTTP_STATUS_CODES.OK).json({ data: products });
};

const POST = async (req: NextApiRequest, res: NextApiResponse) => {
  const body = req.body;

  const product = await productService.create(body);

  res.status(HTTP_STATUS_CODES.CREATED).json({ data: product });
};

const handlers: HandlerOptions[] = [
  { method: "GET" as HttpMethod, handler: GET },
  {
    method: "POST" as HttpMethod,
    handler: POST,
    roles: [ROLES_ENUM.ADMIN],
    bodySchema: createProductSchema,
  },
];

const defaultRoles = [ROLES_ENUM.USER, ROLES_ENUM.ADMIN];

export default apiHandler({ defaultRoles, handlers });
