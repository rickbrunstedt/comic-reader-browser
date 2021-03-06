import { h } from 'preact';
import { useRef } from 'preact/hooks';
import { css } from 'emotion';

export function FileDrop({ addNewComic }) {
  const fileInputRef = useRef(null);

  function onDrop(event) {
    event.preventDefault();

    if (event.dataTransfer.items) {
      for (var i = 0; i < event.dataTransfer.items.length; i++) {
        if (event.dataTransfer.items[i].kind === 'file') {
          var zipFile = event.dataTransfer.items[i].getAsFile();
          addNewComic(zipFile);
        }
      }
    }
  }

  function onFileChange(event) {
    event.preventDefault();
    const file = event.target.files[0];
    addNewComic(file);
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
    <div className={container} onDrop={onDrop} onDragOver={onDragOver}>
      <button onClick={handleClick} className="file-button" />
      <span className="info-text">Click or drag a file to this area</span>
      <input type="file" hidden ref={fileInputRef} onChange={onFileChange} />
    </div>
  );
}

const container = css`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  width: 60vw;
  height: 10rem;
  background: var(--color-bg-glare);
  color: var(--color-text-dimmed);
  border-radius: 0.3rem;
  margin: 0.7rem;

  .info-text {
    font-size: 2rem;
    text-align: center;
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
`;
