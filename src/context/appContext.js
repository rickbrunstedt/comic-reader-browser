import { h, createContext } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { useUnpackFile, usePageCount } from '../hooks/index';

export const appContext = createContext();
const Provider = appContext.Provider;

export function AppContextProvider({ children }) {
  const [currentComic, setCurrentComic] = useState();
  const [unpackState, fileActions] = useUnpackFile();
  const [pageState, pageActions] = usePageCount();

  useEffect(() => {
    if (unpackState.progress === 100) {
      if (unpackState.files) {
        pageActions.setNumberOfPages(unpackState.files.length);
        setCurrentComic(unpackState.files);
      }
      fileActions.reset();
    }
  }, [unpackState.progress, unpackState.files.length, pageActions]);

  function setComic(comicFiles) {
    setCurrentComic(comicFiles);
    pageActions.setNumberOfPages(comicFiles.length);
  }

  function handleReset() {
    setCurrentComic([]);
    pageActions.reset();
  }

  function addNewComic(file) {
    fileActions.unpack(file);
  }

  const value = {
    currentComic,
    setComic,
    handleReset,
    pageState,
    addNewComic,
    unpackState,
    pageActions,
  };

  return <Provider value={value}>{children}</Provider>;
}
