import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import style from './slider.module.scss';
import { VControl } from './v-control';
import { TextBlock } from './text-block';
import { SliderBlock } from './slider-block';

const  getInitClasses = (data) => (
  data.map((_, i) => i === 0 ? 'active' : 'no-active'
));

function generateMainImgs(data, cls) {
  return data.map((item, i) => (
    <div
      key={`${data[i].title}-main-img`}
      className={`${style.mainImg} ${style[cls[i]]}`}
      style={{ background: `url("${data[i].img}")` }}
    />
  ));
}

const changeClasses = (ind, cls) => (
  [...cls].map((item, i) => i === ind ? 'active' : 'no-active')
);

function generateSliderData(arr, lang) {
  return arr.map((country) => ({
    title: country.name_lang[lang],
    subtitle: country.capital[lang],
    text: country.description[lang],
    img: country.img,
    miniature: country.attraction[0].img,
    attractions: country.attraction,
  }));
}

function Slider({ showplaces, lang }) {
  const sliderData = useMemo(() => generateSliderData(showplaces, lang), [showplaces, lang]);
  
  const [activeInd, setActiveInd] = useState(0);
  const [slideClasses, setSlideClasses] = useState(getInitClasses(sliderData));
  
  useEffect(() => {
    setSlideClasses(getInitClasses(sliderData))
  }, [sliderData])
  
  const changeSlide = (i) => {
    const maxInd = slideClasses.length;
    let ind = activeInd + i;
    if (ind < 0) ind = maxInd - 1;
    if (ind >= maxInd) ind = 0;
    setActiveInd(ind);
    setSlideClasses(changeClasses(ind, slideClasses));
  };

  const selectCountry = (i) => {
    setActiveInd(i);
    setSlideClasses(changeClasses(i, slideClasses));
  };

  return (
    <div className={style.slider}>
      {generateMainImgs(sliderData, slideClasses)}
      <div className={style.overlay} />
      <VControl
        data={sliderData}
        ind={activeInd}
        slideClasses={slideClasses}
        selectCountry={selectCountry}
      />
      <TextBlock data={sliderData} ind={activeInd} slideClasses={slideClasses} />
      <SliderBlock
        data={sliderData}
        changeSlide={changeSlide}
        slideClasses={slideClasses}
        ind={activeInd}
      />
    </div>
  );
}

export { Slider };

Slider.propTypes = {
  showplaces: PropTypes.arrayOf(PropTypes.any),
  lang: PropTypes.string,
};

Slider.defaultProps = {
  showplaces: null,
  lang: null,
};
