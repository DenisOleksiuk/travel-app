import {
  showplacesList
} from "./showplacesList";
import {
  weatherData
} from "./weather";
import {
  currencyList
} from './currency-list';

const reducer = (state, action) => ({
  showplacesList: showplacesList(state, action),
  weatherData: weatherData(state, action),
  currencyList: currencyList(state, action)
});

export default reducer;
