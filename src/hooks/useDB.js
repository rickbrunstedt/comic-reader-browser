import DBHandler from '../lib/DBHandler';
import { useState, useEffect } from 'preact/hooks';

class DB extends DBHandler {
  onUpgradeNeeded(event) {
    // The database did not previously exist, so create object stores and indexes.
    const db = event.target.result;
    const comicStore = db.createObjectStore('comics', { keyPath: 'id' });
    comicStore.createIndex('by_title', 'title', {
      // This line should be included later
      // unique: true,
    });

    const thumbnailStore = db.createObjectStore('thumbnails', {
      keyPath: 'id',
    });
    thumbnailStore.createIndex('by_title', 'title', {
      // This line should be included later
      // unique: true,
    });
    thumbnailStore.createIndex('by_comicId', 'comicId', {
      // This line should be included later
      // unique: true,
    });
  }
}

const db = new DB({ name: 'comic-reader', version: 1 });

export function useDB() {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    db.init().then(() => {
      db.createStore('comics');
      db.createStore('thumbnails');
      db.initDone();
      setIsInitialized(true);
    });
  }, []);

  return [db, isInitialized];
}
