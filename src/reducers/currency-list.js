const currencyList = (state, action) => {
  if (!state) {
    return {
      currencyList: {},
      loading: true,
      error: false,
    };
  };

  switch (action.type) {
    case 'FETCH_CURRENCY_REQUEST': {
      return {
        ...state.currencyList,
        loading: true,
      }
    }

    case 'FETCH_CURRENCY_SUCCESS': {
      return {
        ...state.currencyList,
        currencyList: action.payload,
        loading: false,
        error: false,
      }
    }

    case 'FETCH_CURRENCY_FAILURE': {
      return {
        ...state.currencyList,
        currencyList: {},
        loading: false,
        error: action.payload
      }
    }

    default:
      return state.currencyList;
  }
};

export {
  currencyList
};
