import { h } from 'preact';
import { css } from 'emotion';
import { FileDrop } from './FileDrop';
import { ProgressBar } from './ProgressBar';
import { useContext, useEffect } from 'preact/hooks';
import { appContext } from '../context/appContext';
import { routerContext } from '../lib/Router';

const container = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--color-text-dimmed);

  .content-container {
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export function FileDropView() {
  const { unpackState, addNewComic } = useContext(appContext);
  const router = useContext(routerContext);

  useEffect(() => {
    if (unpackState.progress === 100) {
      router.push('/reader');
    }
  }, [unpackState.progress]);

  function renderView() {
    if (unpackState.progress > 0) {
      return <ProgressBar progress={unpackState.progress} />;
    }

    return <FileDrop addNewComic={addNewComic} />;
  }

  return (
    <div class={container}>
      <h1 class="title">Comic Reader</h1>
      <div class="content-container">{renderView()}</div>
    </div>
  );
}
