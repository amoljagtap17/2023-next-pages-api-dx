import { Schema, model, models } from "mongoose";

export const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
      minlength: 3,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 200,
      minlength: 3,
      default: null,
    },
    price: { type: Number, required: true, min: 0, max: 1000000, default: 0 },
    image: {
      type: String,
      trim: true,
      minlength: 3,
      maxlength: 200,
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    collection: "products",
    strict: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    skipVersioning: { dontVersionMe: true },
  }
);

export const ProductModel = models.Product || model("Product", ProductSchema);
