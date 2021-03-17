import React, { useRef, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Context } from '../../showplace-service-context';
import { fetchShowplace, searchCountries } from '../../../action';
import style from './search.module.scss';

function Search({ parrent }) {
  const showplaceService = useContext(Context);
  const { copyShoplaces, lang } = useSelector(state => state.showplacesList);
  const dispatch = useDispatch();
  
  useEffect(() => {
    fetchShowplace(dispatch)(showplaceService);
  }, [showplaceService, dispatch]);
  
  const inputRef = useRef(null);
  const placeholder = {
    ua: 'пошук країни',
    en: 'search country',
    ru: 'поиск страны',
  };
  
  const handleSearch = (event) => {
    const { key, type } = event;
    if (key === 'Enter' || type === 'click' || type === 'change') {
      const { value } = inputRef.current;
      const showplacesFilterList = copyShoplaces.filter((country) => (
        country.name_lang[lang].toLowerCase().includes(value.toLowerCase())
        || country.capital[lang].toLowerCase().includes(value.toLowerCase())
      ));

      if (showplacesFilterList.length === 0) {
        inputRef.current.style.border = '2px solid #fc0303';
        return;
      }

      inputRef.current.style = '';
      dispatch(searchCountries(showplacesFilterList));
    };
  };

  useEffect(() => {
    if (inputRef.current !== null) inputRef.current.focus();
  }, []);

  if (parrent === 'countryPage') return false;
  return (
    <div>
      <input
        ref={inputRef}
        type="search"
        className={style.searchInput}
        placeholder={placeholder[lang]}
        onKeyUp={(e) => handleSearch(e)}
        onChange={(e) => handleSearch(e)}
        results={0}
      />
      <button type="button"
        className={style.searchButton}
        onClick={(e) => handleSearch(e)}
       >
        <i className="fas fa-search" />
      </button>
    </div>
  );
}

Search.propTypes = {
  parrent: PropTypes.string,
};

Search.defaultProps = {
  parrent: null,
};


export default Search;
