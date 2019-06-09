import React, { useRef } from 'react';
import { css } from 'emotion';
import { colors } from '../style/defaultStyles';

export function FileDrop({ unpackFile, progress }) {
  const fileInputRef = useRef(null);

  function onDrop(event) {
    event.preventDefault();

    if (event.dataTransfer.items) {
      for (var i = 0; i < event.dataTransfer.items.length; i++) {
        if (event.dataTransfer.items[i].kind === 'file') {
          var zipFile = event.dataTransfer.items[i].getAsFile();
          unpackFile(zipFile);
        }
      }
    }
  }

  function onFileChange(event) {
    event.preventDefault();
    const file = event.target.files[0];
    unpackFile(file);
  }

  function onDragOver(event) {
    event.preventDefault();
    // maybe do some effect to tell user its within drop zone.
  }

  function handleClick(event) {
    event.preventDefault();
    fileInputRef.current.click();
  }

  return (
    <div
      className={css`
        flex: 1 1;
        display: flex;
        position: relative;
        justify-content: center;
        align-items: center;
        max-width: 100%;
        background: ${colors.grayLight};
        border-radius: 1rem;
        margin: 0.7rem;

        .info-text {
          font-size: 2rem;
        }

        .file-button {
          background: none;
          border: none;
          width: 100%;
          height: 100%;
          position: absolute;
          left: 0;
          top: 0;
        }
      `}
      onDrop={onDrop}
      onDragOver={onDragOver}
    >
      <button onClick={handleClick} className="file-button" />
      <span className="info-text">Click or drag a file to this area</span>
      <input type="file" hidden ref={fileInputRef} onChange={onFileChange} />
    </div>
  );
}
