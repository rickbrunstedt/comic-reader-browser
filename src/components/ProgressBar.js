import React from 'react';
import { css } from 'emotion';
import { colors } from '../style/defaultStyles';

const styles = css`
  display: flex;
  flex-grow: 1;
  justify-content: center;
  align-items: center;

  progress {
    flex: 0 1 300px;
    margin: 0 1rem;
    overflow: hidden;
    border-radius: 0.2rem;
  }

  progress::-webkit-progress-bar {
    background: ${colors.grayLight};
  }

  progress::-webkit-progress-value {
    /* border-radius: 0.1rem; */
    /* background-size: 35px 20px, 100% 100%, 100% 100%; */

    background-image: -webkit-linear-gradient(
        top,
        rgba(255, 255, 255, 0.25),
        rgba(0, 0, 0, 0.25)
      ),
      -webkit-linear-gradient(right, #09c, #f44);

    transition: background-image 0.2s ease-in-out;
  }
`;

export function ProgressBar({ progress }) {
  return (
    <div className={styles}>
      <progress value={progress} max="100" />
    </div>
  );
}
