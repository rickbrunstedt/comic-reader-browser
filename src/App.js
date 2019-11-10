import { h } from 'preact';
import { useState } from 'preact/hooks';
import { useEffect } from 'preact/hooks';
import { useUnpackFile, usePageCount } from './hooks';
import { FileDropView } from './components/FileDropView';
import { ComicView } from './components/ComicView';
import { Navigation } from './components/Navigation';
import { ModalMenu } from './components/ModalMenu';
import { ComicListView } from './components/ComicListView';
import { css } from 'emotion';
import './style/index.css';

const VIEW_STORAGE = 'current-view';
const VIEWS = {
  LIST_VIEW: 'LIST_VIEW',
  FILEDROP_VIEW: 'FILEDROP_VIEW',
  COMIC_VIEW: 'COMIC_VIEW',
};

function getInitialView() {
  const view = window.localStorage.getItem(VIEW_STORAGE);
  if (view) return view;
  return VIEWS.FILEDROP_VIEW;
}

export default function App() {
  const [currentComic, setCurrentComic] = useState();
  const [unpackState, fileActions] = useUnpackFile();
  const [pageState, pageActions] = usePageCount();
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [view, setView] = useState(getInitialView());

  useEffect(() => {
    if (unpackState.progress === 100) {
      if (unpackState.files) {
        pageActions.setNumberOfPages(unpackState.files.length);
        setCurrentComic(unpackState.files);
      }
      fileActions.reset();
    }
  }, [unpackState.progress, unpackState.files.length, pageActions]);

  function toggleShowMenu() {
    setIsMenuVisible(!isMenuVisible);
  }

  function handleReset() {
    setCurrentComic([]);
    pageActions.reset();
  }

  function handleSetView(newView) {
    setView(newView);
    window.localStorage.setItem(VIEW_STORAGE, newView);
  }

  function switchView(newView) {
    if (newView === VIEWS.FILEDROP_VIEW) {
      handleReset();
    }

    handleSetView(newView);
  }

  function setComic(comicFiles) {
    setCurrentComic(comicFiles);
    pageActions.setNumberOfPages(comicFiles.length);
    handleSetView(VIEWS.COMIC_VIEW);
  }

  const navigationActions = {
    toggleShowMenu,
    gotoFiledropView: () => switchView(VIEWS.FILEDROP_VIEW),
    gotoListView: () => switchView(VIEWS.LIST_VIEW),
    nextPage: pageActions.nextPage,
    prevPage: pageActions.prevPage,
    setAmountOfPagesToView: pageActions.setAmountToView,
  };

  function renderView() {
    switch (view) {
      case VIEWS.LIST_VIEW:
        return <ComicListView setComic={setComic} />;

      case VIEWS.COMIC_VIEW:
        if (currentComic) {
          let images = [currentComic[pageState.current - 1]];
          if (pageState.amountToView === 2 && currentComic[pageState.current]) {
            images.push(currentComic[pageState.current]);
          }
          return <ComicView images={images} />;
        }

      case VIEWS.FILEDROP_VIEW:
      default:
        return (
          <FileDropView
            gotoFiledropView={() => switchView(VIEWS.COMIC_VIEW)}
            unpackFile={fileActions.unpack}
            progress={unpackState.progress}
          />
        );
    }
  }

  return (
    <div
      className={css`
        display: grid;
        grid-template-rows: 1fr 4rem;
        height: 100%;
        background-color: #000;
      `}
    >
      {renderView()}

      {isMenuVisible && (
        <ModalMenu pageState={pageState} actions={navigationActions} />
      )}

      <Navigation
        progress={unpackState.progress}
        actions={navigationActions}
        pageState={pageState}
      />
    </div>
  );
}
