const showplacesList = (state, action) => {
  if (!state) {
    return {
      showplaces: [],
      loading: true,
      error: false,
      lang: 'ua',
      isShowAuth: false,
      isAuthorized: false,
      currentUser: null,
    };
  }

  switch (action.type) {
    case 'FETCH_SHOWPLACE_REQUEST': {
      return {
        ...state.showplacesList,
        loading: true,
      };
    }

    case 'FETCH_SHOWPLACE_SUCCESS': {
      return {
        ...state.showplacesList,
        showplaces: action.payload,
        copyShoplaces: action.payload,
        loading: false,
        error: false,
      };
    }

    case 'FETCH_SHOWPLACE_FAILURE': {
      return {
        ...state.showplacesList,
        showplaces: [],
        loading: false,
        error: action.payload,
      };
    }

    case 'SEARCH_COUNTRIES': {
      return {
        ...state.showplacesList,
        showplaces: action.payload,
      }
    }

    case 'SET_SHOW_AUTH': {
      return {
        ...state.showplacesList,
        isShowAuth: action.payload,
      };
    }

    case 'SET_AUTHORIZED': {
      return {
        ...state.showplacesList,
        isAuthorized: action.payload,
      };
    }

    case 'SET_CURRENT_USER': {
      return {
        ...state.showplacesList,
        currentUser: action.payload,
      };
    }

    case 'SET_LANG': {
      return {
        ...state.showplacesList,
        lang: action.payload,
      };
    }

    default:
      return state.showplacesList;
  }
};

export {
  showplacesList
};
