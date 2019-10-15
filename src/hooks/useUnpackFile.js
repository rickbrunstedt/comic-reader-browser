import { Archive } from 'libarchive.js/main.js';
import { useReducer } from 'preact/hooks';
import { readFileAsImage } from '../utils';

Archive.init({
  workerUrl: '/libarchive.js/worker-bundle.js',
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

const types = {
  ADD_FILE: 'ADD_FILE',
  SET_ERROR: 'SET_ERROR',
  RESET: 'RESET',
  SET_IMAGE_DATA: 'SET_IMAGE_DATA',
};

const initialState = {
  files: [],
  progress: 0,
};

function unpackFileReducer(state, action) {
  switch (action.type) {
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

    case types.SET_IMAGE_DATA:
      const files = state.files.map(file => {
        if (file.pageNumber === action.pageNumber) {
          return { ...file, imageData: action.imageData };
        }
        return file;
      });
      return { ...state, files };

    case types.RESET:
      return initialState;

    default:
      return state;
  }
}

export function useUnpackFile() {
  const [state, dispatch] = useReducer(unpackFileReducer, initialState);

  function reset() {
    dispatch({ type: types.RESET });
  }

  async function handleReadFile({ fileData, pageNumber }) {
    try {
      const imageData = await readFileAsImage(fileData);
      dispatch({ type: types.SET_IMAGE_DATA, imageData, pageNumber });
    } catch (error) {
      console.error(error.message);
      dispatch({ type: types.SET_ERROR, message: error.message });
    }
  }

  async function unpack(zipFile) {
    try {
      reset();
      const compressedFiles = await openArchive(zipFile);
      const numberOfFiles = compressedFiles.length;
      let currentFile = 0;

      compressedFiles.forEach(async compressedFile => {
        let file = await compressedFile.file.extract();
        currentFile += 1;
        const progress = Math.round((currentFile / numberOfFiles) * 100);

        const newFile = {
          fileData: file,
          name: file.name,
          pageNumber: currentFile,
          imageData: null,
        };

        dispatch({
          type: types.ADD_FILE,
          file: newFile,
          progress,
        });
        handleReadFile(newFile);
      });
    } catch (error) {
      dispatch({ type: types.SET_ERROR, message: error.message });
    }
  }

  return [state, { unpack, reset }];
}
