import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { MainPage, CountryPage } from '../pages';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route exact path="/:country" 
          component={CountryPage}
        />
        <Route render={() => <h2>Error, you made a mistake in the url path  </h2>} />
      </Switch>
    </Router>
  );
}

export { App };
