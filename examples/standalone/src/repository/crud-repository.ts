export interface CrudRepository<T> {
  queryById: (id: string) => Promise<T>;
  insert: (data: T) => Promise<T>;
  update: (data: T) => Promise<T>;
}
