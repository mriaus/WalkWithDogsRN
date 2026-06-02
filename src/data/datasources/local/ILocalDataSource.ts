// Placeholder para base de datos local.
// Implementaciones candidatas:
//   - AsyncStorage: npm install @react-native-async-storage/async-storage
//   - MMKV:         npm install react-native-mmkv
//   - SQLite:       npm install op-sqlite
//   - WatermelonDB: npm install @nozbe/watermelondb
//   - Realm:        npm install realm

export interface ILocalDataSource<T> {
  get(key: string): Promise<T | null>;
  set(key: string, value: T): Promise<void>;
  remove(key: string): Promise<void>;
  clear(): Promise<void>;
}

export interface ILocalCollectionDataSource<T> {
  getAll(): Promise<T[]>;
  getById(id: string): Promise<T | null>;
  insert(item: T): Promise<T>;
  update(id: string, item: Partial<T>): Promise<T>;
  delete(id: string): Promise<void>;
  deleteAll(): Promise<void>;
}
