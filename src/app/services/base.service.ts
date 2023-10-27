import { CrudOperations } from "../utils";
import { AbstractService } from "./abstract.service";

export class BaseService<T> extends AbstractService<T> {
  private crud: CrudOperations<T>;

  constructor(model: any) {
    super();

    this.crud = new CrudOperations(model);
  }

  async find(filters?: any): Promise<T[]> {
    return this.crud.find(filters);
  }

  async findById(id: string): Promise<T | null> {
    return this.crud.findById(id);
  }

  async findOne(conditions: any): Promise<T | null> {
    return this.crud.findOne(conditions);
  }

  async findMultipleByIds(ids: string[]): Promise<T[]> {
    return this.crud.findMultipleByIds(ids);
  }

  async create(data: Partial<T>): Promise<T> {
    return this.crud.create(data);
  }

  async findByIdAndUpdate(id: string, data: Partial<T>): Promise<T | null> {
    return this.crud.findByIdAndUpdate(id, data);
  }

  async findByIdAndRemove(id: string): Promise<T | null> {
    return this.crud.findByIdAndRemove(id);
  }
}
