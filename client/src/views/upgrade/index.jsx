import React from 'react';
import NavBar from '../../components/NavBar';
import { Link } from 'react-router-dom';



const Upgrade = (props) => {
  return (
    <div>
      <NavBar user={props.user}/>
      <section className="container">
        <div className="row">
          <div className="col">
            <h1>PLANO 01</h1>
            <Link to="/payment-method/list">
              LINK PARA 01
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
};

export default Upgrade;
