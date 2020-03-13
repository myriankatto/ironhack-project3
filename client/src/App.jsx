import React from 'react';
import './App.css';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './views/home';
import workspaceDashboard from './views/workspaceDashboard';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact redirect={'/dashboard'} component={Home} />
          <Route path="/dashboard" component={workspaceDashboard} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
