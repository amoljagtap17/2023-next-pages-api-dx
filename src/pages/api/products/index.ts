import { HandlerOptions, HttpMethod } from "@/app/interfaces";
import { ProductService } from "@/app/services";
import { apiHandler } from "@/app/utils";
import { NextApiRequest, NextApiResponse } from "next";

const productService = new ProductService();

const GET = async (req: NextApiRequest, res: NextApiResponse) => {
  const products = await productService.find();

  res.json({ data: products });
};

const POST = async (req: NextApiRequest, res: NextApiResponse) => {
  const product = await productService.create({ name: "test" });

  res.json({ data: product });
};

const handlers: HandlerOptions[] = [
  { method: "GET" as HttpMethod, handler: GET },
  { method: "POST" as HttpMethod, handler: POST },
];

export default apiHandler({ handlers });
