import { Document, FilterQuery, Model } from "mongoose";

export class CrudOperations<T extends Document> {
  private model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  async find(filters?: FilterQuery<T>): Promise<T[]> {
    return this.model
      .find(filters || {})
      .lean()
      .exec() as unknown as T[];
  }

  async findById(id: string): Promise<T | null> {
    return this.model.findById(id).lean().exec() as unknown as T | null;
  }

  async findOne(conditions: FilterQuery<T>): Promise<T | null> {
    return this.model.findOne(conditions).lean().exec() as unknown as T | null;
  }

  async findMultipleByIds(ids: string[]): Promise<T[]> {
    return this.model
      .find({ _id: { $in: ids } })
      .lean()
      .exec() as unknown as T[];
  }

  async create(data: Partial<T>): Promise<T> {
    const instance = new this.model(data);

    return await instance.save();
  }

  async findByIdAndUpdate(id: string, data: Partial<T>): Promise<T | null> {
    return this.model
      .findByIdAndUpdate(id, data, { new: true })
      .lean()
      .exec() as unknown as T | null;
  }

  async findByIdAndRemove(id: string): Promise<T | null> {
    return this.model
      .findByIdAndRemove(id)
      .lean()
      .exec() as unknown as T | null;
  }
}
