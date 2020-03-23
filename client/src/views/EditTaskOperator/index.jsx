import React, { Component, Fragment } from 'react'
import { edit, single }  from './../../services/task';
import { Form, Button } from 'react-bootstrap';

import { Link } from 'react-router-dom';

export default class EditTaskOperator extends Component {
  

  constructor(props){
    super(props);
    this.state={
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
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmission = this.handleFormSubmission.bind(this);
    this.changePersonal = this.changePersonal.bind(this);
    this.changeUrgency = this.changeUrgency.bind(this);
    this.resetTotal = this.resetTotal.bind(this);
    this.handleRepeatChange=this.handleRepeatChange.bind(this);
    this.changeRepetition=this.changeRepetition.bind(this);
  };

  componentDidMount() {
    this.fetchData();
  };

  fetchData() {
    const id = this.props.match.params.idTask;

    single(id)
      .then(beforeTask => {
        
        this.setState({ 
          name: beforeTask.name,
          level: beforeTask.level,
          urgency: beforeTask.urgency,
          category: beforeTask.category,
          personal: beforeTask.personal,
          frequency: beforeTask.frequency,
          description: beforeTask.description,
          workspace: beforeTask.workspace,
          howlong:beforeTask.beforeTask,
          repetition:beforeTask.repetition
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  
  handleInputChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });

    console.log(this.state);
  };

  handleRepeatChange(){
    this.setState( previousState => ({
      forever: !previousState.forever,
      howlong: 10000
    }));
  };

  changePersonal(){
    this.setState( previousState => ({
      personal: !previousState.personal
    }));
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

  async handleFormSubmission(event) {
    event.preventDefault();
    const id = this.props.match.params.idTask;

    const name = this.state.name;
    const level = this.state.level;
    const urgency = this.state.urgency;
    const personal = this.state.personal;
    const category = this.state.category;
    const frequency = Number(this.state.frequency);
    const description = this.state.description;
    const howlong = this.state.howlong;
    const repetition = this.state.repetition;
     
    edit({id,name, level, urgency, personal, category, frequency, description, howlong, repetition })
      .then()
      .catch(error => {
        console.log(error);
      });

      single(id)
      .then(beforeTask => { 
        this.setState({ 
          name: beforeTask.name,
          level: beforeTask.level,
          urgency: beforeTask.urgency,
          category: beforeTask.category,
          personal: beforeTask.personal,
          frequency: beforeTask.frequency,
          description: beforeTask.description,
          workspace:beforeTask.workspace,
          howlong: beforeTask.howlong,
          repetition:  beforeTask.repetition
     
        });
      })
      .catch(error => {
        console.log(error);
      });

      this.props.history.push(`/dashboard/${this.state.workspace}`);
  };


  resetTotal(){
    const id = this.props.match.params.idTask;

    single(id)
      .then(beforeTask => {
        this.setState({ 
          name: beforeTask.name,
          level: beforeTask.level,
          urgency: beforeTask.urgency,
          category: beforeTask.category,
          personal: beforeTask.personal,
          frequency: beforeTask.frequency,
          description: beforeTask.description,
          workspace:beforeTask.workspace,
          howlong: beforeTask.howlong,
          repetition:  beforeTask.repetition
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
   
    return (
      <div>
        
        <form onSubmit={this.handleFormSubmission}>

        {/*Task's name */}
        <input type="text" 
          id="fname" 
          name="name"
          value={this.state.name}
          onChange={this.handleInputChange}
          placeholder="Your task name"
          autoComplete="off"
        ></input>

        {/* Frequency */}
        <p>Frequency - Terá</p>
         
        <input
          className="react-switch-checkbox"
          id={`react-switch-02`}
          type="checkbox"
          onChange={this.changeRepetition}
          required
        />
        <label
          style={{ background: this.state.repetition && '#06D6A0' }}
          className="react-switch-label"
          htmlFor={`react-switch-02`}
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
          onChange={this.handleInputChange}>
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

        
        <input type="submit" value="Edit Task"> 
        </input>
        
        


        <button type="reset" onClick={this.resetTotal}>| Reset form</button>

      </form>
    </div>
    )
  }

}