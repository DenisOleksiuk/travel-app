import React from 'react';
import Header from '../header';
import CountryPageDetails from '../containers/country-page-details';
import Footer from '../footer';
import style from './country-page.module.scss';
import AuthPage from '../auth-page';

function CountryPage() {
  return (
    <div className={style.countryPageWrapper}>
      <Header parrent="countryPage" />
      <AuthPage />
      <CountryPageDetails />
      <Footer />
    </div>
  );
}

export { CountryPage };
