import React from 'react';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';
import { Widgets } from '../widgets';
import { Gallery } from './gallery';
import style from './country-list.module.scss';

const CountryList = (props) => {
  const { currentCounrty, lang,  } = props;
  const {
    name_lang: title,
    attraction,
    img: countryImg,
    capital,
    description: countryDesc,
    video,
  } = currentCounrty;
  const capitalTxt = {
    ua: 'Столиця',
    en: 'Capital',
    ru: 'Столица',
  };

  return (
    <div className={style.countryContent}>
      <div
        className={style.countryDescription}
        style={{ background: `url("${countryImg}")` }}
      >
        <h2 className={style.countryTitle}>{title[lang]}</h2>
        <div className={style.countryText}>
          <span
            className={style.countryCapital}
          >{`${capitalTxt[lang]}: ${capital[lang]}`}</span>
          <span>{countryDesc[lang]}</span>
        </div>
        <div className={style.widgetsBlock}>
          <Widgets />
        </div>
      </div>
      <div className={style.video}>
        <ReactPlayer url={video} />
      </div>
      <Gallery
        attraction={attraction}
        lang={lang}
        currentCounrty={currentCounrty}
      />
    </div>
  );
};

CountryList.propTypes = {
  currentCounrty: PropTypes.objectOf(PropTypes.any).isRequired,
  lang: PropTypes.string.isRequired,
};

export default CountryList;
