import React from 'react';

import plane from './plane.png';
import './error-indicator.scss'

const ErrorIndicator = () => (
  <div className="error__indicator">
    <img className="error__indicator-img" src={plane} alt="error" />
    <span className="error__indicator-sorry">Sorry</span>
    <span>something has go wrong</span>
    <span>(but we already check what&apos;s going on)</span>
  </div>
);

export { ErrorIndicator };
