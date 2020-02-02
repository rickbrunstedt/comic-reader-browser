import { h } from 'preact';
import { css } from 'emotion';
import { colors } from '../style/defaultStyles';
import { useContext } from 'preact/hooks';
import { appContext } from '../context/appContext';

export function Navigation({ actions }) {
  const { pageState, pageActions } = useContext(appContext);

  return (
    <div className={container}>
      <button className="reset-button" onClick={actions.toggleShowMenu}>
        Menu
      </button>

      <div className="page-controllers">
        <button className="page-button" onClick={pageActions.prevPage}>
          Prev Page
        </button>
        <button className="page-button" onClick={pageActions.nextPage}>
          Next Page
        </button>
      </div>

      <div className="page-number">
        {pageState.current}/{pageState.total}
      </div>
    </div>
  );
}

const container = css`
  display: grid;
  grid-template-columns: auto 1fr auto;
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
