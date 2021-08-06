class Database {
  db: IDBDatabase | null = null;
  constructor(readonly dbName: string, readonly version: number) {}

  init(
    stores: {
      name: string;
      options: IDBObjectStoreParameters;
    }[]
  ): Promise<boolean> {
    return new Promise((resolve, reject) => {
      indexedDB.deleteDatabase(this.dbName).onsuccess = () => {
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
      };
    });
  }
  add(objectStoreName: string, key: string, value: any): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.db) {
        let request = this.db
          .transaction(objectStoreName, "readwrite")
          .objectStore(objectStoreName)
          .add({ value, key });
        request.addEventListener("success", (e: any) => resolve(e.target.result));
        request.addEventListener("error", reject);
      } else {
        reject(new Error("Database not initialized"));
      }
    });
  }
  get(objectStoreName: string, key: string): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.db) {
        let request = this.db
          .transaction(objectStoreName, "readonly")
          .objectStore(objectStoreName)
          .get(key);
        request.addEventListener("success", (e: any) => resolve(e.target.result));
        request.addEventListener("error", reject);
      } else {
        reject(new Error("Database not initialized"));
      }
    });
  }
}

export default Database;
