import { h } from 'preact';
import { useState, useEffect, useContext } from 'preact/hooks';
import { css } from 'emotion';
import { useDB } from '../hooks/useDB';
import { colors } from '../style/defaultStyles';
import { currentComicContext } from '../context/currentComic';

export function ComicListView() {
  const { setComic } = useContext(currentComicContext);
  const [thumbnails, setThumbnails] = useState([]);
  const [db, isInitialized] = useDB();

  useEffect(async () => {
    if (isInitialized) {
      const thumbnails = await db.stores.thumbnails.getAll();
      setThumbnails(thumbnails);
    }
  }, [isInitialized]);

  async function handleSetComic(comicId) {
    const comic = await db.stores.comics.get(comicId);
    setComic(comic.files);
  }

  async function removeComic({ id, comicId }) {
    try {
      await db.stores.comics.delete(comicId);
      await db.stores.thumbnails.delete(id);
      const thumbnails = await db.stores.thumbnails.getAll();
      setThumbnails(thumbnails);
    } catch (error) {
      console.log(error);
    }
  }

  function renderThumnail() {
    return thumbnails.map(thumbnail => {
      return (
        <div class="thumbnail" key={thumbnail.comicId}>
          <button
            class="thumbnail-btn"
            onClick={() => handleSetComic(thumbnail.comicId)}
          >
            <figure class="thumbnail-image">
              <img alt={thumbnail.title} src={thumbnail.image.imageData} />
              <figcaption>{thumbnail.title}</figcaption>
            </figure>
          </button>
          <button class="remove-btn" onClick={e => removeComic(thumbnail)}>
            +
          </button>
        </div>
      );
    });
  }

  return (
    <div class={container}>
      <h1>Comic list view</h1>
      <div class="thumbnail-container">{renderThumnail()}</div>
    </div>
  );
}

const container = css`
  overflow: auto;
  color: ${colors.primary};

  h1 {
    text-align: center;
  }

  .thumbnail-container {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 2rem;
    padding: 2rem;

    @media (max-width: 900px) {
      grid-template-columns: repeat(3, 1fr);
    }

    @media (max-width: 600px) {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  .thumbnail {
    margin: 0;
    padding: 0;
    border: none;
    background: none;
    color: inherit;
    cursor: pointer;
    position: relative;

    :hover,
    :focus {
      .remove-btn {
        opacity: 100;
      }
    }
  }

  .thumbnail-btn {
    margin: 0;
    padding: 0;
    border: none;
    background: none;
    color: inherit;
    cursor: pointer;
  }

  .remove-btn {
    --overflow-spacing: -0.6rem;
    --size: 1.4rem;
    opacity: 0;
    transform: rotate(45deg);
    transition: 200ms ease;
    border-radius: 50%;
    border: none;
    padding: 0;
    background: tomato;
    color: whitesmoke;
    position: absolute;
    cursor: pointer;
    width: var(--size);
    height: var(--size);
    font-size: var(--size);
    display: flex;
    right: var(--overflow-spacing);
    top: var(--overflow-spacing);
    justify-content: center;
    line-height: 100%;
    box-shadow: 0px 2px 10px 2px rgba(10, 10, 10);

    :focus {
      opacity: 100;
    }
  }

  .thumbnail-image {
    margin: 0;
    padding: 0;

    img {
      max-width: 100%;
    }
  }
`;
