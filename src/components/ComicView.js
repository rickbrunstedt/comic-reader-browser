import { h } from 'preact';
import { css } from 'emotion';
import { useContext } from 'preact/hooks';
import { appContext } from '../context/appContext';

export function ComicView() {
  const { currentComic, pageState } = useContext(appContext);

  let images = [];
  if (currentComic) {
    images = [currentComic[pageState.current - 1]];
    if (pageState.amountToView === 2 && currentComic[pageState.current]) {
      images.push(currentComic[pageState.current]);
    }
  }

  function renderImages() {
    return images.map(image => (
      <div className="image-container">
        <img key={image.name} alt={image.name} src={image.imageData} />
      </div>
    ));
  }

  return <div className={styles}>{renderImages()}</div>;
}

const styles = css`
  display: grid;
  grid-template-columns: 1fr 1fr;

  .image-container {
    display: flex;
    justify-content: flex-end;
  }

  .image-container:only-child {
    grid-column: 1/3;
    justify-content: center;
  }

  .image-container + .image-container {
    justify-content: flex-start;
  }

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
`;
