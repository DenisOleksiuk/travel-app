import React from 'react';
import PropTyps from 'prop-types';

const CurrnecyWidget = ({
  currency: { currencyList },
  lang,
  currentCounrty: { currencyInfo },
}) => {
  const { currency_symbol: currencySymbol, flag, currency } = currencyInfo;
  const value = currencyList[currency].toFixed(2);
  const clazz = `flag ${flag}`;

  return (
    <div className="widget-currency-point">
      <p className="currency__paragraph">{currencyInfo.text[lang]}</p>
      <span>{`1$ = ${value}`}</span>
      <span>{currencySymbol}</span>
      <ul className="f32 currency__flag">
        <li className={clazz} />
      </ul>
    </div>
  );
};

CurrnecyWidget.propTypes = {
  currency: PropTyps.objectOf(PropTyps.any).isRequired,
  currentCounrty: PropTyps.objectOf(PropTyps.any).isRequired,
  lang: PropTyps.string.isRequired,
};

export { CurrnecyWidget };
