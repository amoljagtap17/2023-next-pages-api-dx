import { ProductSchema } from "@/app/models";
import { InferSchemaType } from "mongoose";

export type IProduct = InferSchemaType<typeof ProductSchema>;
