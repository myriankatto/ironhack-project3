import React, { Component } from 'react';

import NavBar from '../../components/NavBar';

const WorkspaceDashboard = props => {
  
  return (
          <div>
            <NavBar user={props.user}/>

            NOME DO USUÁRIO: <br></br>

            {
              props.user ? props.user.name : 'NADA'
            }<br></br>
            
            NOME DA PAGINA: <br></br>
            DASHBOARD

          </div>
        );
  
};

export default WorkspaceDashboard;
