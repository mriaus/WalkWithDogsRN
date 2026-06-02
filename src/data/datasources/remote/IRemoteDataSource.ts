export interface IRemoteDataSource<T> {
  fetchOne(id: string): Promise<T>;
  fetchAll(): Promise<T[]>;
  create(data: Partial<T>): Promise<T>;
  update(id: string, data: Partial<T>): Promise<T>;
  delete(id: string): Promise<void>;
}
