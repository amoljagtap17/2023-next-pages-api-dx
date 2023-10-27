export abstract class AbstractService<T> {
  abstract find(filters?: any): Promise<T[]>;

  abstract findById(id: string): Promise<T | null>;

  abstract findOne(conditions: any): Promise<T | null>;

  abstract findMultipleByIds(ids: string[]): Promise<T[]>;

  abstract create(data: Partial<T>): Promise<T>;

  abstract findByIdAndUpdate(id: string, data: Partial<T>): Promise<T | null>;

  abstract findByIdAndRemove(id: string): Promise<T | null>;
}
