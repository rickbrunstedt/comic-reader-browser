import ReactDOM from 'react-dom';
import React, { useEffect } from 'react';
import { useUnpackFile, usePageCount } from './hooks';
import { FileDropView } from './components/FileDropView';
import { ComicView } from './components/ComicView';
import { Navigation } from './components/Navigation';
import { css } from 'emotion';
import './style/index.css';

function App() {
  const [{ files, progress }, fileActions] = useUnpackFile();
  const [pageState, pageActions] = usePageCount();

  useEffect(() => {
    if (progress === 100) {
      pageActions.setNumberOfPages(files.length);
    }
  }, [progress, files.length, pageActions]);

  function handleReset() {
    fileActions.reset();
    pageActions.setNumberOfPages(1);
    pageActions.setCurrentPage(1);
  }

  function renderView() {
    if (progress === 100 && files[0].imageData) {
      const file = files[pageState.current - 1];
      return <ComicView images={[file]} />;
    }

    return <FileDropView unpackFile={fileActions.unpack} progress={progress} />;
  }

  const navigationActions = {
    handleReset: handleReset,
    setCurrentPage: pageActions.setCurrentPage,
  };

  return (
    <div
      className={css`
        display: grid;
        grid-template-rows: 95vh 5vh;
        height: 100vh;
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

ReactDOM.render(<App />, document.getElementById('app'));