/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RatingPage from '../../rating-page';
import style from './gallery.module.scss';

function Gallery({ attraction, lang, currentCounrty }) {
  const [activeId, setActiveId] = useState(0);

  function getInitClasses(data) {
    const arr = [];
    data.forEach((_item, i) => {
      if (i === 0) arr.push('active');
      else arr.push('no-active');
    });
    return arr;
  }

  const [classes, setClasses] = useState(getInitClasses(attraction));

  const changeClasses = (ind, cls) => {
    const arr = [...cls];
    arr.forEach((item, i) => {
      if (i === ind) arr[i] = 'active';
      else arr[i] = 'no-active';
    });
    return arr;
  };

  const changeSlide = (i) => {
    const maxInd = classes.length;
    let ind = activeId + i;
    if (ind < 0) ind = maxInd - 1;
    if (ind === maxInd) ind = 0;
    setActiveId(ind);
    setClasses(changeClasses(ind, classes));
  };

  const clickAttr = (ind) => {
    setActiveId(ind);
    setClasses(changeClasses(ind, classes));
  };

  const getAttrImgs = (arr, cls) =>
    arr.map((i, ind) => (
      <div
        key={`${i.id}-img`}
        className={`${style.image} ${style[cls[ind]]}`}
        style={{ background: `url("${i.img}")` }}
        onClick={() => clickAttr(ind)}
      />
    ));

  return (
    <div className={style.galleryWrapper}>
      <div className={style.attrImg}>
        {getAttrImgs(attraction, classes)}
        <div className={style.attrImgOverlay} />
        <div className={style.pagination}>
          <button
            type="button"
            onClick={() => {
              changeSlide(-1);
            }}
          >
            <i className="fas fa-chevron-left" />
          </button>
          <button type="button" onClick={() => changeSlide(1)}>
            <i className="fas fa-chevron-right" />
          </button>
        </div>
      </div>
      <div className={style.attrDesc}>
        <span className={style.title}>{attraction[activeId].name[lang]}</span>
        <span className={style.description}>
          {attraction[activeId].description[lang]}
        </span>
      </div>
      <div className={style.attrRate}>
        <RatingPage
          rate={attraction[activeId].rate}
          index={activeId}
          currentCounrty={currentCounrty}
        />
      </div>
      <div className={style.attrNav}>
        <div className={style.attrMover}>
          {getAttrImgs(attraction, classes)}
        </div>
      </div>
    </div>
  );
}

Gallery.propTypes = {
  attraction: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentCounrty: PropTypes.objectOf(PropTypes.any).isRequired,
  lang: PropTypes.string.isRequired,
};
export { Gallery };
