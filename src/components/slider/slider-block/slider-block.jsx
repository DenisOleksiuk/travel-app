import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import style from './slider-block.module.scss';

function SliderBlock({ data, changeSlide, slideClasses, ind }) {
  const moveCardRef = useRef(null);
  const [cardWidth, setWidth] = useState(0);

  const initCardOpacity = (arr) => (
    arr.map(() => 'show')
  );

  const [cardOpacity, setOpacity] = useState(() => initCardOpacity(data));

  useEffect(() => {
    if (moveCardRef.current) {
      setWidth(moveCardRef.current.offsetWidth + 20); // 20 is card's margin-right
    }
  }, [moveCardRef]);
  
  useEffect(() => {
    const arr = cardOpacity.map((_, i) => i >= ind ? 'show' : 'hide');
    setOpacity(arr);
  }, [ind]);

  function generateCards(arr, cls) {
    return arr.map((item, i) => (
      <Link
        ref={moveCardRef}
        key={`${item.title}-carousel`}
        className={`${style.slideCard} ${style[cls[i]]} ${
          style[cardOpacity[i]]
        }`}
        style={{ background: `url("${item.miniature}")` }}
        to={{
          pathname: item.title, // '/country',
          propsCountry: item.title,
          propsAttractions: item.attractions,
        }}
      >
        <div className={style.title}>{item.title}</div>
        <div className={style.subtitle}>{item.subtitle}</div>
      </Link>
    ));
  }

  return (
    <div className={style.sliderBlock}>
      <div className={style.carousel} style={{ left: `${ind * -cardWidth}px` }}>
        {generateCards(data, slideClasses)}
      </div>
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
  );
}

export { SliderBlock };

SliderBlock.propTypes = {
  changeSlide: PropTypes.func,
  data: PropTypes.arrayOf(PropTypes.object),
  slideClasses: PropTypes.arrayOf(PropTypes.string),
  ind: PropTypes.number,
};

SliderBlock.defaultProps = {
  changeSlide: null,
  data: null,
  slideClasses: null,
  ind: null,
};
