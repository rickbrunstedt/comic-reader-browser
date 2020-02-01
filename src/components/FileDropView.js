import { h } from 'preact';
import { css } from 'emotion';
import { FileDrop } from './FileDrop';
import { ProgressBar } from './ProgressBar';
import { useContext } from 'preact/hooks';
import { currentComicContext } from '../context/currentComic';

const container = css`
  display: flex;
  flex-direction: column;
`;

export function FileDropView({ gotoFiledropView }) {
  const { unpackState, addNewComic } = useContext(currentComicContext);

  function renderView() {
    if (unpackState.progress === 100) {
      gotoFiledropView();
    }

    if (unpackState.progress > 0) {
      return <ProgressBar progress={unpackState.progress} />;
    }

    return <FileDrop addNewComic={addNewComic} />;
  }

  return (
    <div className={container}>
      <h1 className="title">Comic Reader</h1>

      {renderView()}
    </div>
  );
}
