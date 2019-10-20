import { useEffect, useReducer } from 'preact/hooks';

const keyType = {
  LEFT: 37,
  RIGHT: 39,
};

const types = {
  SET_PAGE: 'SET_PAGE',
  SET_TOTAL_PAGES: 'SET_TOTAL_PAGES',
  SET_AMOUNT_TO_VIEW: 'SET_AMOUNT_TO_VIEW',
};

const initialState = {
  current: 1,
  total: 1,
  amountToView: 1,
};

function pageCountReducer(state, action) {
  switch (action.type) {
    case types.SET_PAGE:
      return { ...state, current: action.page };
    case types.SET_TOTAL_PAGES:
      return { ...state, total: action.total };
    case types.SET_AMOUNT_TO_VIEW:
      return {
        ...state,
        amountToView: action.amount,
        current: action.current,
      };
    default:
      return state;
  }
}

export function usePageCount() {
  const [state, dispatch] = useReducer(pageCountReducer, initialState);

  function setCurrentPage(page) {
    if (page > 0 && page < state.total + 1) {
      dispatch({ type: types.SET_PAGE, page });
    }
  }

  function setNumberOfPages(total) {
    dispatch({ type: types.SET_TOTAL_PAGES, total });
  }

  function setAmountToView(amount) {
    let newCurrent;
    for (let i = 1; i <= state.total; i += 2) {
      if (i > state.current) {
        newCurrent = i - 2;
        break;
      }
    }
    dispatch({ type: types.SET_AMOUNT_TO_VIEW, amount, current: newCurrent });
  }

  function nextPage() {
    setCurrentPage(state.current + state.amountToView);
  }

  function prevPage() {
    setCurrentPage(state.current - state.amountToView);
  }

  function changePageEvent(event) {
    const key = event.keyCode;

    switch (key) {
      case keyType.LEFT:
        prevPage();
        return;
      case keyType.RIGHT:
        nextPage();
        return;
      default:
        return;
    }
  }

  function reset() {
    setNumberOfPages(1);
    setCurrentPage(1);
  }

  useEffect(() => {
    window.addEventListener('keyup', changePageEvent);

    return () => {
      window.removeEventListener('keyup', changePageEvent);
    };
  });

  return [
    state,
    { nextPage, prevPage, setNumberOfPages, reset, setAmountToView },
  ];
}
