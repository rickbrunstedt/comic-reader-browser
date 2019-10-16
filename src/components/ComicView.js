import { h } from 'preact';
import { css } from 'emotion';

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

export function ComicView({ images }) {
  function renderImages() {
    if (images.length === 1) {
      let firstImage = images[0];
      return (
        <div className="image-container">
          <img
            key={firstImage.name}
            alt={firstImage.name}
            src={firstImage.imageData}
          />
        </div>
      );
    }

    return images.map(image => (
      <div className="image-container">
        <img key={image.name} alt={image.name} src={image.imageData} />
      </div>
    ));
  }

  return <div className={styles}>{renderImages()}</div>;
}
