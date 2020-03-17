import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
/*VIEWS*/
import Home from './views/home';
import WorkspaceDashboard from './views/workspaceDashboard';
import PaymentMethodView from './views/paymentMethodList';
import PaymentMethodCreateView from './views/paymentMethodCreate';
import CheckoutView from './views/CheckoutView';
import WorkspaceCreate from './views/workspaceCreate';
import { loadUserInformation } from './services/authentication';

import ProtectedRoute from './components/ProtectedRoute';

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null
    };
    this.updateUserInformation = this.updateUserInformation.bind(this);
  }

  componentDidMount() {
    loadUserInformation()
      .then(user => {
        console.log(user);
        return this.updateUserInformation(user);
      })
      .catch(error => {
        console.log(error);
      });
  }

  updateUserInformation(user) {
    console.log(user);
    this.setState({
      user
    });
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <ProtectedRoute
              path="/"
              exact
              authorized={!this.state.user}
              redirect={'/dashboard'}
              render={props => (
                <Home {...props} updateUserInformation={this.updateUserInformation} />
              )}
            />
            <ProtectedRoute
              path="/dashboard"
              authorized={this.state.user}
              redirect={'/'}
              exact
              render={props => (
                <WorkspaceDashboard
                  user={this.state.user}
                  {...props}
                  updateUserInformation={this.updateUserInformation}
                />
              )}
            />

            {/* ROTAS PARA PAGAMENTO E COMPRA */}
            <ProtectedRoute
              exact
              authorized={this.state.user}
              redirect={'/'}
              path="/payment-method/list"
              render={props => (
                <PaymentMethodView user={this.state.user} cart={this.state.cart} {...props} />
              )}
            />
            <ProtectedRoute
              exact
              authorized={this.state.user}
              redirect={'/'}
              path="/payment-method/create"
              render={props => <PaymentMethodCreateView user={this.state.user} {...props} />}
            />

            <ProtectedRoute
              exact
              authorized={this.state.user}
              redirect={'/'}
              path="/checkout"
              render={props => <CheckoutView user={this.state.user} {...props} />}
            />
            {/* FINAL ROTAS PARA PAGAMENTO E COMPRA */}

            {/* ROTA PARA WORKSPACE EM SINGLE */}
            <ProtectedRoute
              exact
              authorized={this.state.user}
              redirect={'/'}
              path="/dashboard/:id"
              render={props => <WorkspaceCreate user={this.state.user} {...props} />}
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
export default App;
