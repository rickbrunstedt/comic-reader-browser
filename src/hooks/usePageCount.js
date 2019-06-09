import { useEffect, useReducer } from 'react';

const keyType = {
  LEFT: 37,
  RIGHT: 39,
};

const types = {
  SET_PAGE: 'SET_PAGE',
  SET_TOTAL_PAGES: 'SET_TOTAL_PAGES',
};

const initialState = {
  currentPage: 1,
  totalPages: 1,
};

function pageCountReducer(state, action) {
  switch (action.type) {
    case types.SET_PAGE:
      return { ...state, currentPage: action.page };
    case types.SET_TOTAL_PAGES:
      return { ...state, totalPages: action.totalPages };
    default:
      return state;
  }
}

export function usePageCount() {
  const [state, dispatch] = useReducer(pageCountReducer, initialState);

  function handleSetPage(page) {
    if (page > 0 && page < state.totalPages + 1) {
      dispatch({ type: types.SET_PAGE, page });
    }
  }

  function handleSetNumberOfPages(totalPages) {
    dispatch({ type: types.SET_TOTAL_PAGES, totalPages });
  }

  function changePageEvent(event) {
    const key = event.keyCode;

    switch (key) {
      case keyType.LEFT:
        handleSetPage(state.currentPage - 1);
        return;
      case keyType.RIGHT:
        handleSetPage(state.currentPage + 1);
        return;
      default:
        return;
    }
  }

  useEffect(() => {
    window.addEventListener('keyup', changePageEvent);

    return () => {
      window.removeEventListener('keyup', changePageEvent);
    };
  });

  return [
    { current: state.currentPage, total: state.totalPages },
    { setCurrentPage: handleSetPage, setNumberOfPages: handleSetNumberOfPages },
  ];
}
