import { h } from 'preact';
import { css } from 'emotion';

const container = css`
  --background: whitesmoke;
  --primary: dimgray;

  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);

  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat(10, 1fr);

  .background-close-btn {
    border: none;
    background: none;
    grid-column: 1/11;
    grid-row: 1/11;
  }

  .menu {
    background: var(--background);
    grid-column: 2/10;
    grid-row: 2/10;
    position: relative;
    box-shadow: 4px 4px 14px 0px rgba(0, 0, 0, 0.5);
    border-radius: 0.3rem;
    padding: 3rem;
    color: var(--primary);
  }

  .close-btn {
    top: 1rem;
    right: 1rem;
    position: absolute;
    border: none;
    background: none;
    font-size: 2rem;
    line-height: 1rem;
    padding: 0.5rem;
    color: var(--primary);
    transform: rotate(45deg);

    &:hover {
      cursor: pointer;
    }
  }

  h2 {
    text-align: center;
  }

  b {
    font-weight: 600;
  }

  .divider {
    margin-top: 4rem;
    border: none;
    width: 100%;
    height: 2px;
    background-color: var(--primary);
  }

  .info-text {
    font-size: 0.8rem;
  }

  .settings-container {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }

  .settings-btn {
    font-size: 1rem;
    color: var(--primary);
    background: none;
    border: 1px solid var(--primary);
    border-radius: 3px;
    padding: 0.3rem 0.6rem;

    &:hover {
      color: var(--background);
      background: var(--primary);
      cursor: pointer;
    }
  }
`;

export function ModalMenu({ actions, pageState }) {
  function handleAmountToView() {
    if (pageState.amountToView === 1) {
      actions.setAmountOfPagesToView(2);
    } else {
      actions.setAmountOfPagesToView(1);
    }
  }

  return (
    <div class={container}>
      <button
        onClick={actions.toggleShowMenu}
        class="background-close-btn"
      ></button>

      <div class="menu">
        <button onClick={actions.toggleShowMenu} class="close-btn">
          +
        </button>

        <h2>Menu</h2>

        <hr class="divider" />
        <p class="info-text">
          This takes you back to start page where you can load new comic. It
          will also remove comic from cache/storage.
        </p>
        <button class="settings-btn" onClick={actions.handleReset}>
          Load new comic
        </button>

        <hr class="divider" />
        <p class="info-text">
          This change if you want to show single double page per view.
        </p>

        <div class="settings-container">
          <button class="settings-btn" onClick={handleAmountToView}>
            Single/Double
          </button>

          <span class="settings-status">
            Current: <b>{pageState.amountToView === 1 ? 'Single' : 'Double'}</b>
          </span>
        </div>
      </div>
    </div>
  );
}
