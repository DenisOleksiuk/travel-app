const weatherData = (state, action) => {
  if (state === undefined) {
    return {
      weather: {},
      loading: true,
      error: false,
    }
  }
  switch (action.type) {
    case 'FETCH_WEATHER_REQUEST': {
      return {
        ...state.weatherData,
        loading: true,
      }
    }

    case 'FETCH_WEATHER_SUCCESS': {
      return {
        ...state.weatherData,
        weather: action.payload,
        loading: false,
        error: false,
      }
    }

    case 'FETCH_WEATHER_FAILURE': {
      return {
        ...state.weatherData,
        weather: {},
        loading: false,
        error: action.payload
      }
    }

    default:
      return state.weatherData;
  }
};

export {
  weatherData
};
