export default class DBhandler {
  constructor({ name, version }) {
    if (!name) {
      throw new Error('DBhandler is missing name as prop');
    }
    if (!version) {
      throw new Error('DBhandler is missing version as prop');
    }
    this.dbName = name;
    this.dbVersion = version;
    this.db = undefined;
    this.isInitialized = false;
    this.stores = {};
  }

  async init() {
    this.db = await this.createDB();
    return;
  }

  initDone() {
    this.isInitialized = true;
  }

  createDB() {
    return new Promise((resolve, reject) => {
      const DBOpenRequest = window.indexedDB.open(this.dbName, this.dbVersion);

      DBOpenRequest.onupgradeneeded = this.onUpgradeNeeded;

      DBOpenRequest.onsuccess = function(event) {
        this.db = event.target.result;
        resolve(this.db);
      };

      DBOpenRequest.onerror = function(event) {
        const error = new Error("Can't load database");
        reject(error);
      };
    });
  }

  onUpgradeNeeded(event) {
    // The database did not previously exist, so create object stores and indexes.
    const db = event.target.result;
    const store = db.createObjectStore(thid.dbname, { keyPath: 'id' });
  }

  getStore(name) {
    const transaction = this.db.transaction(name, 'readwrite');
    return transaction.objectStore(name);
  }

  async storageFunction({ type, name, data }) {
    let reqData = data;

    if (type === 'add') {
      const items = await this.stores[name].getAll();
      if (items.length > 0) {
        const id = items[items.length - 1].id + 1;
        reqData = { ...reqData, id };
      } else {
        reqData = { ...reqData, id: 1 };
      }
    }

    const store = this.getStore(name);

    return new Promise((resolve, reject) => {
      const storeRequest = store[type](reqData);
      storeRequest.onsuccess = function(event) {
        resolve(event.target.result);
      };

      storeRequest.onerror = function(event) {
        const error = new Error(event.target.error);
        reject(error);
      };
    });
  }

  createStore(name) {
    this.stores[name] = {
      add: data => this.storageFunction({ type: 'add', name, data }),
      delete: data => this.storageFunction({ type: 'delete', name, data }),
      put: data => this.storageFunction({ type: 'put', name, data }),
      get: data => this.storageFunction({ type: 'get', name, data }),
      getAll: data => this.storageFunction({ type: 'getAll', name, data }),
    };
  }
}
