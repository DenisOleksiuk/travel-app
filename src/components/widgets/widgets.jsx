import React, { useContext, useEffect } from 'react';
import {useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Context } from '../showplace-service-context';
import { fetchWeather, fetchCurrency } from '../../action';
import { Spinner } from '../spinner'
import { ErrorIndicator } from '../error-indicator';
import { WeatherWidget } from "./weather-widget";
import { TimeWidget } from './time-widget';
import { CurrnecyWidget } from "./currency-widget";

import './widgets.scss'

const Widgets = () => {
  const showplaceService = useContext(Context);
  const { country } = useParams();
  const { showplacesList, weatherData, currencyList } = useSelector(state => state);
  const dispatch = useDispatch();
  const { lang } = showplacesList;
  const currentCounrty = showplacesList.showplaces.find(({name_lang: nameLang}) => nameLang[lang].toLowerCase() === country.toLowerCase());
  const { name, capital, UTC } = currentCounrty;
  const { weather, loading, error } = weatherData;

  useEffect(() => {
    fetchWeather(dispatch)(showplaceService, name, lang);
    fetchCurrency(dispatch)(showplaceService);
  }, [showplaceService, dispatch, name, lang])

  if (loading) {
    return <Spinner />
  }

  if (error) {
    return <ErrorIndicator />
  }

  return (
    <div className="widgets"> 
      <WeatherWidget lang={lang} capital={capital} weather={weather} />
      <TimeWidget lang={lang} UTC={UTC} />
      <CurrnecyWidget lang={lang} currency={currencyList} currentCounrty={currentCounrty} />
    </div>  
  )
};

export {
  Widgets
};
