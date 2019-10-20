import { h } from 'preact';
import { useEffect } from 'preact/hooks';
import { useUnpackFile, usePageCount } from './hooks';
import { FileDropView } from './components/FileDropView';
import { ComicView } from './components/ComicView';
import { Navigation } from './components/Navigation';
import { css } from 'emotion';
import './style/index.css';

export default function App() {
  const [{ files, progress }, fileActions] = useUnpackFile();
  const [pageState, pageActions] = usePageCount();

  useEffect(() => {
    if (progress === 100) {
      pageActions.setNumberOfPages(files.length);
    }
  }, [progress, files.length, pageActions]);

  function handleReset() {
    fileActions.reset();
    pageActions.reset();
  }

  function renderView() {
    if (progress === 100 && files[0].imageData) {
      let images = [files[pageState.current - 1]];

      if (pageState.amountToView === 2) {
        images.push(files[pageState.current]);
      }

      return <ComicView images={images} />;
    }

    return <FileDropView unpackFile={fileActions.unpack} progress={progress} />;
  }

  const navigationActions = {
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

      <Navigation
        progress={progress}
        actions={navigationActions}
        pageState={pageState}
      />
    </div>
  );
}
