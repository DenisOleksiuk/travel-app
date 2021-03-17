import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { ErrorIndicator } from '../error-indicator';

class ErrorBoundry extends Component {
  state = {
    hasError: false
  }

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;
    if (hasError) {
      return <ErrorIndicator />
    }
    return (
      children
    )
  }
}

ErrorBoundry.propTypes = {
  children: PropTypes.node
}

ErrorBoundry.defaultProps = {
  children: PropTypes.null
};

export { ErrorBoundry };
