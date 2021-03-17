import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

import './widgets.scss';

const updateTime = (UTC) => {
  const differenceTime = (new Date().getTimezoneOffset() / 60) + UTC;
  const date = new Date();
  date.setHours(date.getHours() + differenceTime);
  return date;
};

const TimeWidget = ({ lang, UTC }) => {
  let language = lang;
  if (language === 'ua') language = 'uk';
  const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const dateFormatter = new Intl.DateTimeFormat(language, dateOptions);

  const timeFormatter = useMemo(() => {
    const timeOptions = { hour: "numeric", minute: "numeric", second: "numeric" };
    return new Intl.DateTimeFormat(language, timeOptions)
  }, [language]);
  
  const [time, setTime] = useState(timeFormatter.format(updateTime(UTC)));
  
  
  useEffect(() => {
    const timerId = setTimeout(() => {
      setTime(timeFormatter.format(updateTime(UTC)));
    }, 1000);
    return () => {
      clearTimeout(timerId)
    }
  }, [UTC, timeFormatter, time])



  return (
    <div className="widget-date-point">
      <time className="widget__date" dateTime="2021" >{dateFormatter.format(new Date())}</time>
      <time className="widget__time" dateTime={time} >{time}</time>
    </div>
  )
};

TimeWidget.propTypes = {
  lang: PropTypes.string.isRequired,
  UTC: PropTypes.number.isRequired
}

export {
  TimeWidget
};
