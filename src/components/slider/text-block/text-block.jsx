import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import style from './text-block.module.scss';

function TextBlock({ data, ind, slideClasses }) {
  const moveTitleRef = useRef(null);
  const [blockHeight, setHeight] = useState(0);

  function generateItems(arr, name, cls) {
    return arr.map((item, i) => (
      <div
        key={`${arr[i].title}-${name}`}
        className={`${style[name]} ${style[cls[i]]}`}
      >
        {arr[i][name]}
      </div>
    ));
  }

  useEffect(() => {
    if (moveTitleRef.current) {
      setHeight(moveTitleRef.current.offsetHeight);
    }
  }, [moveTitleRef]);

  return (
    <div className={style.sliderTextBlock}>
      <div className={style.titleBlock} ref={moveTitleRef}>
        <div className={style.mover} style={{ top: `${ind * -blockHeight}px` }}>
          {generateItems(data, 'title', slideClasses)}
        </div>
      </div>
      <div className={style.textBlock}>
        <div className={style.mover} style={{ top: `${ind * -blockHeight}px` }}>
          {generateItems(data, 'text', slideClasses)}
        </div>
      </div>
    </div>
  );
}

export { TextBlock };

TextBlock.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  ind: PropTypes.number,
  slideClasses: PropTypes.arrayOf(PropTypes.string),
};

TextBlock.defaultProps = {
  data: null,
  ind: null,
  slideClasses: null,
};
