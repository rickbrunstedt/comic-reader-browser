import { Archive } from 'libarchive.js/main.js';
import { useReducer, useEffect } from 'preact/hooks';
import { readFileAsImage } from '../lib/readFileAsImage';
import { useDB } from './useDB';

Archive.init({
  workerUrl: '/libarchivejs/worker-bundle.js',
});

async function openArchive(zipFile) {
  const archive = await Archive.open(zipFile);
  const comporessedFiles = await archive.getFilesArray();
  comporessedFiles.sort((a, b) => {
    if (a.file.name > b.file.name) return 1;
    if (a.file.name < b.file.name) return -1;
    return 0;
  });

  return comporessedFiles;
}

const FILETYPE_RGX = /\.(cbr|cbz|zip|rar)$/;

const types = {
  ADD_FILE: 'ADD_FILE',
  SET_ERROR: 'SET_ERROR',
  RESET: 'RESET',
  SET_TITLE: 'SET_TITLE',
};

const initialState = {
  files: [],
  title: '',
  progress: 0,
};

function unpackFileReducer(state, action) {
  switch (action.type) {
    case types.SET_TITLE:
      return {
        ...state,
        title: action.title,
      };

    case types.ADD_FILE:
      return {
        ...state,
        files: [...state.files, action.file],
        progress: action.progress,
      };

    case types.SET_ERROR:
      return {
        ...state,
        errorMessage: action.message,
      };

    case types.RESET:
      return initialState;

    default:
      return state;
  }
}

export function useUnpackFile() {
  const [state, dispatch] = useReducer(unpackFileReducer, initialState);
  const [db, isInitialized] = useDB();

  useEffect(() => {
    if (state.progress === 100) {
      saveToStorage();
    }
  }, [state.progress, isInitialized]);

  function reset() {
    dispatch({ type: types.RESET });
  }

  async function saveToStorage() {
    try {
      const { title, files } = state;
      const id = await db.stores.comics.add({
        title,
        files,
      });
      await db.stores.thumbnails.add({
        comicId: id,
        title: title,
        image: files[0],
      });
      return;
    } catch (error) {
      // Todo: Handle error with e.g. an context where it could be pushed.
      console.error(error);
    }
  }

  async function unpack(zipFile) {
    try {
      reset();
      const title = zipFile.name.replace(FILETYPE_RGX, '');
      dispatch({ type: types.SET_TITLE, title });

      const compressedFiles = await openArchive(zipFile);
      const numberOfFiles = compressedFiles.length;
      let currentFile = 0;

      compressedFiles.forEach(async compressedFile => {
        let file = await compressedFile.file.extract();

        currentFile += 1;
        const progress = Math.round((currentFile / numberOfFiles) * 100);

        const imageData = await readFileAsImage(file);
        const newFile = {
          name: file.name,
          imageData: imageData,
        };

        dispatch({
          type: types.ADD_FILE,
          file: newFile,
          progress,
        });
      });
    } catch (error) {
      dispatch({ type: types.SET_ERROR, message: error.message });
    }
  }

  return [state, { unpack, reset }];
}
