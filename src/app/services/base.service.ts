import { CrudOperations } from "../utils";
import { ApiError } from "../utils/error";
import { AbstractService } from "./abstract.service";

export class BaseService<T> extends AbstractService<T> {
  private crud: CrudOperations<T>;

  constructor(model: any) {
    super();

    this.crud = new CrudOperations(model);
  }

  async find(filters?: any): Promise<T[]> {
    try {
      return await this.crud.find(filters);
    } catch (error) {
      throw new ApiError(error as Error);
    }
  }

  async findById(id: string): Promise<T | null> {
    try {
      return await this.crud.findById(id);
    } catch (error) {
      throw new ApiError(error as Error);
    }
  }

  async findOne(conditions: any): Promise<T | null> {
    try {
      return await this.crud.findOne(conditions);
    } catch (error) {
      throw new ApiError(error as Error);
    }
  }

  async findMultipleByIds(ids: string[]): Promise<T[]> {
    try {
      return await this.crud.findMultipleByIds(ids);
    } catch (error) {
      throw new ApiError(error as Error);
    }
  }

  async create(data: Partial<T>): Promise<T> {
    try {
      return await this.crud.create(data);
    } catch (error) {
      throw new ApiError(error as Error);
    }
  }

  async findByIdAndUpdate(id: string, data: Partial<T>): Promise<T | null> {
    try {
      return await this.crud.findByIdAndUpdate(id, data);
    } catch (error) {
      throw new ApiError(error as Error);
    }
  }

  async findByIdAndRemove(id: string): Promise<T | null> {
    try {
      return await this.crud.findByIdAndRemove(id);
    } catch (error) {
      throw new ApiError(error as Error);
    }
  }
}
