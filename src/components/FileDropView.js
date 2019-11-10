import { h } from 'preact';
import { css } from 'emotion';
import { FileDrop } from './FileDrop';
import { ProgressBar } from './ProgressBar';

const container = css`
  display: flex;
  flex-direction: column;
`;

export function FileDropView({ gotoFiledropView, unpackFile, progress }) {
  function renderView() {
    if (progress === 100) {
      gotoFiledropView();
    }

    if (progress > 0) {
      return <ProgressBar progress={progress} />;
    }

    return <FileDrop unpackFile={unpackFile} />;
  }

  return (
    <div className={container}>
      <h1 className="title">Comic Reader</h1>

      {renderView()}
    </div>
  );
}
