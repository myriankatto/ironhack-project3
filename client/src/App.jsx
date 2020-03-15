import React, { Component } from 'react';
import './App.css';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

/*VIEWS*/
import Home from './views/home';
import WorkspaceDashboard from './views/workspaceDashboard';
import Upgrade from './views/upgrade';

import { loadUserInformation } from './services/authentication';


class App extends Component {
  constructor() {
    super();
    this.state={
      loaded: false,
      user:null
    };
  }

  componentDidMount() {
    loadUserInformation()
      .then(user => {
        this.updateUserInformation(user);
        this.setState({
          loaded: true
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  updateUserInformation(user) {
    this.setState({
      user
    });
  }



  render(){
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route path="/" exact redirect={'/dashboard'} component={Home} />
            <Route path="/dashboard" 
              render={props => <WorkspaceDashboard user={this.state.user}  {...props}/> }               
            />
            <Route path="/upgrade" 
                          render={props => <Upgrade user={this.state.user}  {...props}/> }               
                        />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
