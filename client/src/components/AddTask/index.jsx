import React, { Component , Fragment } from 'react';
import { Form, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';

import { create, single }  from './../../services/task';
import './style.scss';


class AddTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      level: 'easy', 
      urgency:false,
      category:'Kitchen',
      personal:false,
      frequency: '',
      description: '',
      workspace:'',
      howlong: '',
      repetition: false,
      forever:false
      
    };

    console.log('STATE ',this.state.forever);

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmission = this.handleFormSubmission.bind(this);
    this.changePersonal = this.changePersonal.bind(this);
    this.changeUrgency = this.changeUrgency.bind(this);
    this.resetTotal = this.resetTotal.bind(this);
    this.changeRepetition=this.changeRepetition.bind(this);
    this.handleRepeatChange=this.handleRepeatChange.bind(this);
  }

  handleInputChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });

    
  }

  changePersonal(){
    this.setState( previousState => ({
      personal: !previousState.personal
    }));
  };

  handleRepeatChange(){
    this.setState( previousState => ({
      forever: !previousState.forever,
      howlong: 10000
    }));

    console.log('HANDLE',this.state.forever);
  }

  changeRepetition(){
    this.setState( previousState => ({
      repetition: !previousState.repetition
    }));
  }


  changeUrgency(){
    this.setState( previousState => ({
      urgency: !previousState.urgency
    }));
  }

  
  handleFormSubmission(event) {
    event.preventDefault();

    const name = this.state.name;
    const level = this.state.level;
    const urgency = this.state.urgency;
    const personal = this.state.personal;
    const category = this.state.category;
    const frequency = Number(this.state.frequency);
    const description = this.state.description;
    const howlong = this.state.howlong;
    const repetition = this.state.repetition;
    const approved =  this.props.user._id === this.props.workspaceOperator;
  
    const id = this.props.idWorkspace;
   
    //if (!name || !level || !urgency || !category || !personal) return;
    
    create({id,name, level, urgency, personal, category, frequency, description, approved, howlong, repetition })
      .then()
      .catch(error => {
        console.log(error);
      });

      this.setState({
        name: '',
        level: 'easy', 
        urgency:false,
        category:'Kitchen',
        personal:false,
        frequency: '',
        description: '',
        workspace:'',
        howlong: '',
        repetition: '',
        forever:false
      });

  };

  resetTotal(){
    this.setState({
      name: '',
        level: 'easy', 
        urgency:false,
        category:'Kitchen',
        personal:false,
        frequency: '',
        description: '',
        workspace:'',
        howlong: '',
        repetition: '',
        forever:false
    });

  
  }

 
  render() {
    return (
      <form onSubmit={this.handleFormSubmission}>
        {/*Task's name */}
        <input type="text" 
          id="fname" 
          name="name"
          value={this.state.name}
          onChange={this.handleInputChange}
          placeholder="Your task name"
          autoComplete="off"
          required
        ></input>

        {/* Frequency */}
        <p>Frequency - Terá</p>
         
        <input
          className="react-switch-checkbox"
          id={`react-switch-03`}
          type="checkbox"
          onChange={this.changeRepetition}
          required
        />
        <label
          style={{ background: this.state.repetition && '#06D6A0' }}
          className="react-switch-label"
          htmlFor={`react-switch-03`}
        >
          <span className={`react-switch-button`} />
        </label>

        { this.state.repetition && 

          <Fragment>
            <input 
                type="number"
                name="frequency"
                min="1"
                max="20"
                value={this.state.frequency}
                onChange={this.handleInputChange}
                placeholder="Set frequency"
                autoComplete="off"
              ></input>
            
            { /* until when */ }
            
            { !this.state.forever ?
              <input 
                type="number"
                name="howlong"
                min="1"
                value={this.state.howlong}
                onChange={this.handleInputChange}
                placeholder="Until when will it repeat"
                autoComplete="off"
              ></input> : ''
            }

            <Form.Group controlId="formBasicCheckbox" onClick={this.handleRepeatChange}>
              <Form.Check type="checkbox" label="Para sempre" onClick={this.handleRepeatChange} />
            </Form.Group>

          </Fragment>
        }


        {/* Level */}
        <select 
          as="select"
          name="level"
          value={this.state.level}
          onChange={this.handleInputChange}
          required>
            <option>easy</option>
            <option>medium</option>
            <option>hard</option>
        </select>


        {/* Pessoal ou Geral*/}
        <p>Personal:</p>
        <input
          className="react-switch-checkbox"
          id={`react-switch-02`}
          type="checkbox"
          onChange={this.changePersonal}
        />
        <label
          style={{ background: this.state.personal && '#06D6A0' }}
          className="react-switch-label"
          htmlFor={`react-switch-02`}
        >
          <span className={`react-switch-button`} />
        </label>

        {/* Checkbox para Urgência*/}
        <p>Urgency:</p>
        <input
          
          className="react-switch-checkbox"
          id={`react-switch-01`}
          type="checkbox"
          onChange={this.changeUrgency}
        />
        <label
          style={{ background: this.state.urgency && '#06D6A0' }}
          className="react-switch-label"
          htmlFor={`react-switch-01`}
        > 
          <span className={`react-switch-button`} />
        </label>

         {/*Category*/}
        <select 
          as="select"
          name="category"
          value={this.state.category}
          onChange={this.handleInputChange}>
            <option>Kitchen</option>
            <option>Laundry</option>
            <option>Clean up</option>
        </select>

        {/*Description*/}
        <textarea id="w3mission"
          rows="4" 
          cols="50"  
          type="text"
          name="description"
          value={this.state.description}
          onChange={this.handleInputChange}
          placeholder="Your description"
          autoComplete="off">
        </textarea>

        <input type="submit" value="Submit"> 
        </input>

        <button type="reset" onClick={this.resetTotal}>| Reset form</button>

      </form>




     
    );
  }
}

export default AddTask;