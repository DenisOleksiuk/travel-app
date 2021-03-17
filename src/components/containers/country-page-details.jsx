import React, { useEffect, useContext } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Context } from '../showplace-service-context';
import { fetchShowplace } from '../../action';
import { CountryList } from '../country-list';
import { Spinner } from '../spinner';
import { ErrorIndicator } from '../error-indicator';

const CountryPageDetails = ({
  showplaces,
  lang,
  loading,
  error,
  fetchShowplaces,
}) => {
  const showplaceService = useContext(Context);
  const { country } = useParams();

  useEffect(() => {
    fetchShowplaces(showplaceService);
  }, [showplaceService, fetchShowplaces]);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <ErrorIndicator />;
  }

  const currentCounrty = showplaces.find(
    ({ name_lang: nameLang }) =>
      nameLang[lang].toLowerCase() === country.toLowerCase()
  );

  return <CountryList lang={lang} currentCounrty={currentCounrty} />;
};

CountryPageDetails.propTypes = {
  showplaces: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchShowplaces: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  lang: PropTypes.string.isRequired,
};

const mapStateToProps = ({
  showplacesList: { showplaces, loading, error, lang },
}) => ({ showplaces, lang, loading, error });

const mapDispatchToProps = (dispatch) => ({
  fetchShowplaces: fetchShowplace(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(CountryPageDetails);
