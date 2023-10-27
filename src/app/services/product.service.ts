import { IProduct } from "@/app/interfaces";
import { ProductModel } from "@/app/models";
import { BaseService } from "@/app/services";

export class ProductService extends BaseService<IProduct> {
  constructor() {
    super(ProductModel);
  }
}
