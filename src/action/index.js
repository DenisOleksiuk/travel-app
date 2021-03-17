const showplaceRequested = () => ({
  type: 'FETCH_SHOWPLACE_REQUEST',
});

const showplaceLoaded = (showplaces) => ({
  type: 'FETCH_SHOWPLACE_SUCCESS',
  payload: showplaces,
});

const showplaceFetchError = (error) => ({
  type: 'FETCH_SHOWPLACE_FAILURE',
  payload: error,
});

const weatherRequested = () => ({
  type: 'FETCH_WEATHER_REQUEST'
});

const weatherLoaded = (weather) => ({
  type: 'FETCH_WEATHER_SUCCESS',
  payload: weather
});

const weatherFetchError = (error) => ({
  type: 'FETCH_WEATHER_FAILURE',
  payload: error
});

const currencyRequested = () => ({
  type: 'FETCH_CURRENCY_REQUEST'
});

const currencyLoaded = (currency) => ({
  type: 'FETCH_CURRENCY_SUCCESS',
  payload: currency
});

const currencyFetchError = (error) => ({
  type: 'FETCH_CURRENCY_FAILURE',
  payload: error
});

const setShowAuth = (value) => ({
  type: 'SET_SHOW_AUTH',
  payload: value,
});

const setAuthorized = (value) => ({
  type: 'SET_AUTHORIZED',
  payload: value,
});

const setCurrentUser = (value) => ({
  type: 'SET_CURRENT_USER',
  payload: value,
});

const setLanguage = (value) => ({
  type: 'SET_LANG',
  payload: value,
});

const searchCountries = (countries) => ({
  type: 'SEARCH_COUNTRIES',
  payload: countries,
});

const fetchShowplace = (dispatch) => async (showplaceService) => {
  dispatch(showplaceRequested());
  try {
    const data = await showplaceService.getAllCountries();
    // (data[3].attraction);
    await dispatch(showplaceLoaded(data));
  } catch (error) {
    dispatch(showplaceFetchError(error))
  }
}

const fetchWeather = (dispatch) => async (showplaceService, country, lang) => {
  dispatch(weatherRequested());
  try {
    const data = await showplaceService.getWeather(country, lang);
    await dispatch(weatherLoaded(data))
  } catch (error) {
    dispatch(weatherFetchError(error))
  }
}

const fetchCurrency = (dispatch) => async (showplaceService) => {
  dispatch(currencyRequested());
  try {
    const data = await showplaceService.getCurrencyTest();
    await dispatch(currencyLoaded(data))
  } catch (error) {
    dispatch(currencyFetchError(error))
  }
}

export {
  fetchShowplace,
  fetchWeather,
  fetchCurrency,
  setShowAuth,
  setAuthorized,
  setCurrentUser,
  setLanguage,
  searchCountries,
};
