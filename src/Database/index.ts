class Database {
  db: IDBDatabase = {} as IDBDatabase;
  constructor(readonly dbName: string, readonly version: number) {}

  init(
    stores: {
      name: string;
      options: IDBObjectStoreParameters;
    }[]
  ): Promise<boolean> {
    return new Promise((resolve, reject) => {
      let request = indexedDB.open(this.dbName, this.version);
      request.addEventListener("success", (event) => {
        resolve(true);
      });
      request.addEventListener("error", (event) => {
        reject(request.error);
      });
      request.addEventListener("upgradeneeded", (event) => {
        this.db = request.result;
        stores.forEach(({ name, options }) => {
          this.db.createObjectStore(name, options);
        });
      });
    });
  }
  delete(): void {
    indexedDB.deleteDatabase(this.dbName);
  }
}

export default Database;
