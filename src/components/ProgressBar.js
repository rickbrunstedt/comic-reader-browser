import { h } from 'preact';
import { css } from 'emotion';

const styles = css`
  background: var(--color-util);
  width: 70vw;
  height: 3rem;
  border-radius: 0.5rem;
  overflow: hidden;
  justify-self: center;

  div {
    height: 100%;
    background: var(--color-bg-glare);
    outline: var(--color-bg);

    background-image: linear-gradient(
      45deg,
      rgba(255, 255, 255, 0.15) 25%,
      transparent 25%,
      transparent 50%,
      rgba(255, 255, 255, 0.15) 50%,
      rgba(255, 255, 255, 0.15) 75%,
      transparent 75%,
      transparent
    );

    transition: background-image 0.2s ease-in-out;
  }
`;

export function ProgressBar({ progress }) {
  return (
    <div class={styles}>
      <div
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin="0"
        aria-valuemax="100"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
}
