import { h } from 'preact';
import { useState, useContext } from 'preact/hooks';
import { appContext } from './context/appContext';
import { FileDropView } from './components/FileDropView';
import { ComicView } from './components/ComicView';
import { Navigation } from './components/Navigation';
import { ModalMenu } from './components/ModalMenu';
import { ComicListView } from './components/ComicListView';
import { css } from 'emotion';
import './style/index.css';
import { Router, Route } from './lib/Router';

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
  const { handleReset } = useContext(appContext);
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

  return (
    <div
      className={css`
        display: grid;
        grid-template-rows: 1fr 4rem;
        height: 100%;
        background-color: var(--color-bg);
      `}
    >
      <Router>
        <Route path="/">
          <FileDropView gotoFiledropView={() => switchView(VIEWS.COMIC_VIEW)} />
        </Route>
        <Route path="/reader">
          <ComicView />
        </Route>
        <Route path="/list">
          <ComicListView />
        </Route>

        <ModalMenu isVisible={isMenuVisible} actions={navigationActions} />
        <Navigation actions={navigationActions} />
      </Router>
    </div>
  );
}
