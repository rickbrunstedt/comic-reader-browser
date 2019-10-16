import { h } from 'preact';
import { css } from 'emotion';
import { colors } from '../style/defaultStyles';

const container = css`
  display: grid;
  grid-template-columns: minmax(1rem, 10rem) 1fr minmax(1rem, 10rem);
  align-items: center;

  color: ${colors.primary};
  box-shadow: 0px 0px 6px -2px ${colors.text};
  font-size: 1.2rem;

  button {
    border: none;
    border-radius: 0.3rem;
    background: none;
    color: ${colors.primary};
    height: 100%;
    font-size: inherit;
    padding: 0 1rem;
  }

  .page-controllers {
    height: 100%;
    display: flex;
    justify-content: center;
  }

  .page-number {
    justify-self: flex-end;
    padding: 0 1rem;
  }
`;

export function Navigation({ progress, pageState, actions }) {
  if (progress < 100) {
    return null;
  }

  return (
    <div className={container}>
      <button className="reset-button" onClick={() => actions.handleReset()}>
        {'< Go Back'}
      </button>

      <div className="page-controllers">
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

      <div className="page-number">
        {pageState.current}/{pageState.total}
      </div>
    </div>
  );
}
