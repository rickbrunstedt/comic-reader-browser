import React from 'react';
import { css } from 'emotion';
import { FileDrop } from './FileDrop';
import { ProgressBar } from './ProgressBar';

export function FileDropView({ unpackFile, progress }) {
  return (
    <div
      className={css`
        display: flex;
        flex-direction: column;
      `}
    >
      <h1 className="title">Comic Reader</h1>
      {progress > 0 ? (
        <ProgressBar progress={progress} />
      ) : (
        <FileDrop unpackFile={unpackFile} progress={progress} />
      )}
    </div>
  );
}
