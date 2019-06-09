import React from 'react';
import { css } from 'emotion';
import { colors } from '../style/defaultStyles';

export function Navigation({ progress, pageState, actions }) {
  if (progress < 100) {
    return null;
  }

  return (
    <div
      className={css`
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: ${colors.text};
        padding: 0 1rem;
        box-shadow: 0px 0px 6px -2px ${colors.text};
        font-size: 1rem;

        button {
          border: none;
          border-radius: 0.3rem;
          background: none;
          height: 100%;
          font-size: inherit;
        }

        .controllers {
          height: 100%;
        }

        .page-button {
          color: ${colors.primary};
          padding: 0 1rem;
        }
      `}
    >
      <button className="reset-button" onClick={() => actions.handleReset()}>
        {'< Go Back'}
      </button>

      <div className="controllers">
        <button
          className="page-button"
          onClick={() => actions.setCurrentPage(pageState.current - 1)}
        >
          Prev Page
        </button>
        <button
          className="page-button"
          onClick={() => actions.setCurrentPage(pageState.current + 1)}
        >
          Next Page
        </button>
      </div>

      <span className="page-number">
        {pageState.current}/{pageState.total}
      </span>
    </div>
  );
}
