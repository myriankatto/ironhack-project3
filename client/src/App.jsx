import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
/*VIEWS*/
import Home from './views/home';
import WorkspaceDashboard from './views/workspaceDashboard';
// import PaymentMethodView from './views/paymentMethodList';
// import PaymentMethodCreateView from './views/paymentMethodCreate';
// import CheckoutView from './views/CheckoutView';
// import WorkspaceCreate from './views/workspaceCreate';
import { loadUserInformation } from './services/authentication';
class App extends Component {
  constructor() {
    super();
    this.state = {
      loaded: false,
      user: null
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
    console.log('user info: ' + user);
    this.setState({
      user
    });
  }
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route path="/" exact redirect={'/dashboard'} component={Home} />
            <Route
              path="/dashboard"
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
            {/* <Route exact path="/payment-method/list" 
                          render={props => <PaymentMethodView user={this.state.user} cart={this.state.cart}  {...props}/> }               
                        />
            <Route exact path="/payment-method/create" 
                          render={props => <PaymentMethodCreateView user={this.state.user}  {...props}/> }               
                        />
            <Route exact path="/checkout" 
                          render={props => <CheckoutView user={this.state.user}  {...props}/> }               
                        /> */}
            {/* FINAL ROTAS PARA PAGAMENTO E COMPRA */}
            {/* ROTA PARA WORKSPACE EM SINGLE */}
            {/* <Route
              exact
              path="/dashboard/:id"
              render={props => <WorkspaceCreate user={this.state.user} {...props} />}
            /> */}
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
export default App;
