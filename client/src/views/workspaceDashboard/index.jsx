import React, { Component } from 'react';

import NavBar from '../../components/NavBar';


export default class WorkspaceDashboard extends Component {
  constructor(props){
    super(props);
  };

  
  render() {
    return (
      <div>
         <NavBar user={this.props.user}/>

          NOME DO USUÁRIO: <br></br>

          {
            this.props.user ? this.props.user.name : 'NADA'
          }<br></br>

          NOME DA PAGINA: <br></br>
          DASHBOARD

      </div>
    )
  }
}





