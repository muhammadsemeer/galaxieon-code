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
        this.db = request.result;
        resolve(true);
      });
      request.addEventListener("error", (event) => {
        reject(request.error);
      });
      request.addEventListener("upgradeneeded", (event) => {
        stores.forEach(({ name, options }) => {
          request.result.createObjectStore(name, options);
        });
      });
    });
  }
  delete(): void {
    indexedDB.deleteDatabase(this.dbName);
  }
  add(objectStoreName: string, key: string, value: any): Promise<Event> {
    return new Promise((resolve, reject) => {
      console.log({ objectStoreName, key, value });
      let request = this.db
        .transaction(objectStoreName, "readwrite")
        .objectStore(objectStoreName)
        .add({value, key});
      request.addEventListener("success", resolve);
      request.addEventListener("error", reject);
    });
  }
}

export default Database;
