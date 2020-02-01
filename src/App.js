import { h } from 'preact';
import { useState, useContext } from 'preact/hooks';
import { currentComicContext } from './context/currentComic';
// import { useEffect } from 'preact/hooks';
// import { useUnpackFile, usePageCount } from './hooks';
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
  const { handleReset } = useContext(currentComicContext);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [view, setView] = useState(getInitialView());

  function toggleShowMenu() {
    setIsMenuVisible(!isMenuVisible);
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

  const navigationActions = {
    toggleShowMenu,
    gotoFiledropView: () => switchView(VIEWS.FILEDROP_VIEW),
    gotoListView: () => switchView(VIEWS.LIST_VIEW),
  };

  function renderView() {
    switch (view) {
      case VIEWS.LIST_VIEW:
        return <ComicListView />;

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
            // unpackFile={fileActions.unpack}
            // progress={unpackState.progress}
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
      <ModalMenu isVisible={isMenuVisible} actions={navigationActions} />
      <Navigation actions={navigationActions} />
    </div>
  );
}
