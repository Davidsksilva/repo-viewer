import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Main from './pages/Main';
import Repository from './pages/Repository';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route component={Main} exact path="/" />
        <Route component={Repository} exact path="/repository/:repository" />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
