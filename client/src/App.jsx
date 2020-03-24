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
import EditWorkspace from './views/EditWorkspace';
import ShareWorkspace from './views/ShareWorkspace';
import { loadUserInformation } from './services/authentication';

import ProtectedRoute from './components/ProtectedRoute';
import RouteShareWorkspace from './components/RouteShareWorkspace/index';

import EditProfileView from './views/editProfile';
import ListWorkspaceUsers from './views/ListWorkspaceUsers';
import EditTaskOperator from './views/EditTaskOperator';

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      loaded: false,
      workspaceId: '' //this workspaceId will be connecting the component workspacedropdownmenu and the view workspace crete with the edit and list and
    };
    this.updateUserInformation = this.updateUserInformation.bind(this);
    this.updateWorkspaceIdInformation = this.updateWorkspaceIdInformation.bind(this);
  }

  componentDidMount() {
    loadUserInformation()
      .then(user => this.updateUserInformation(user))
      .catch(error => {
        console.log(error);
      });
  }

  updateUserInformation(user) {
    this.setState({
      loaded: true,
      user
    });
  }

  //this function will catch the workspaceId info from the component workspacedropdownmenu and the view workspace create
  updateWorkspaceIdInformation(workspaceId) {
    this.setState({
      workspaceId
    });
  }

  render() {
    return (
      <div className="App">
        {this.state.loaded && (
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
              {/* routes from the NavBarToggleWorkspace */}
              <ProtectedRoute
                path="/editWorkspace"
                authorized={this.state.user}
                redirect={'/'}
                exact
                render={props => (
                  <EditWorkspace
                    user={this.state.user}
                    {...props}
                    workspaceId={this.state.workspaceId}
                  />
                )}
              />
              <ProtectedRoute
                path="/listWorkspaceUsers"
                authorized={this.state.user}
                redirect={'/'}
                exact
                render={props => (
                  <ListWorkspaceUsers
                    user={this.state.user}
                    {...props}
                    workspaceId={this.state.workspaceId}
                  />
                )}
              />
              <ProtectedRoute
                path="/shareWorkspace"
                authorized={this.state.user}
                redirect={'/'}
                exact
                render={props => (
                  <ShareWorkspace
                    user={this.state.user}
                    {...props}
                    workspaceId={this.state.workspaceId}
                  />
                )}
              />
              {/* end of routes from the NavBarToggleWorkspace */}

              {/* This route will lead the QRCode. the user will go for workspace approval */}
              <ProtectedRoute
                path="/forWorkspaceApproval/:workspaceId"
                authorized={this.state.user}
                redirect={`/`}
                exact
                render={props => <RouteShareWorkspace user={this.state.user} {...props} />}
              />

              {/* ROTA PARA EDITAR PERFIL */}
              <ProtectedRoute
                path="/edit"
                exact
                authorized={this.state.user}
                redirect={'/dashboard'}
                render={props => (
                  <EditProfileView
                    {...props}
                    user={this.state.user}
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
                render={props => (
                  <WorkspaceCreate
                    user={this.state.user}
                    updateWorkspaceIdInformation={this.updateWorkspaceIdInformation}
                    updateUserInformation={this.updateUserInformation}
                    {...props}
                  />
                )}
              />
              {/* FINAL ROTA PARA WORKSPACE EM SINGLE */}

              {/* ROTA PARA EDITAR TASK */}
              <ProtectedRoute
                exact
                authorized={this.state.user}
                redirect={'/'}
                path="/edit/task/:idTask"
                render={props => <EditTaskOperator user={this.state.user} {...props} />}
              />
            </Switch>
          </BrowserRouter>
        )}
      </div>
    );
  }
}
export default App;
