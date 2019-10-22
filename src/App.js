import { h } from 'preact';
import { useState } from 'preact/hooks';
import { useEffect } from 'preact/hooks';
import { useUnpackFile, usePageCount } from './hooks';
import { FileDropView } from './components/FileDropView';
import { ComicView } from './components/ComicView';
import { Navigation } from './components/Navigation';
import { ModalMenu } from './components/ModalMenu';
import { css } from 'emotion';
import './style/index.css';

export default function App() {
  const [{ files, progress }, fileActions] = useUnpackFile();
  const [pageState, pageActions] = usePageCount();
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  useEffect(() => {
    if (progress === 100) {
      pageActions.setNumberOfPages(files.length);
    }
  }, [progress, files.length, pageActions]);

  function toggleShowMenu() {
    setIsMenuVisible(!isMenuVisible);
  }

  function handleReset() {
    fileActions.reset();
    pageActions.reset();
    setIsMenuVisible(false);
  }

  function renderView() {
    if (progress === 100 && files[0].imageData) {
      let images = [files[pageState.current - 1]];

      if (pageState.amountToView === 2 && files[pageState.current]) {
        images.push(files[pageState.current]);
      }

      return <ComicView images={images} />;
    }

    return <FileDropView unpackFile={fileActions.unpack} progress={progress} />;
  }

  const navigationActions = {
    toggleShowMenu,
    handleReset: handleReset,
    nextPage: pageActions.nextPage,
    prevPage: pageActions.prevPage,
    setAmountOfPagesToView: pageActions.setAmountToView,
  };

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
        progress={progress}
        actions={navigationActions}
        pageState={pageState}
      />
    </div>
  );
}
