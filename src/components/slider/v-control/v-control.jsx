import React from 'react';
import PropTypes from 'prop-types';
import style from './v-control.module.scss';

function VControl({ data, slideClasses, selectCountry }) {
  function generateItems(arr, name, cls) {
    return arr.map((item, i) => (
      <button
        type="button"
        key={`${arr[i].title}-${name}-vcontrol`}
        className={`${style[name]} ${style[cls[i]]}`}
        data-id={i}
        onClick={() => {
          selectCountry(i);
        }}
      >
        {arr[i][name]}
      </button>
    ));
  }

  return (
    <div className={style.vcontrol}>
      {generateItems(data, 'title', slideClasses)}
    </div>
  );
}

export { VControl };

VControl.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  slideClasses: PropTypes.arrayOf(PropTypes.string),
  selectCountry: PropTypes.func,
};

VControl.defaultProps = {
  data: null,
  slideClasses: null,
  selectCountry: null,
};
