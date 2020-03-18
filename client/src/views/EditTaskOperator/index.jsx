import React, { Component } from 'react'
import { edit, single }  from './../../services/task';
import { Link } from 'react-router-dom';

export default class EditTaskOperator extends Component {
  

  constructor(props){
    super(props);
    this.state={
      name: '',
      level: '', 
      urgency:'',
      category:'',
      personal:'',
      frequency: '',
      description: '',
      workspace:''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmission = this.handleFormSubmission.bind(this);
    this.changePersonal = this.changePersonal.bind(this);
    this.changeUrgency = this.changeUrgency.bind(this);
    this.resetTotal = this.resetTotal.bind(this);
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
          workspace: beforeTask.workspace
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
  }

  changePersonal(){
    this.setState( previousState => ({
      personal: !previousState.personal
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
     
    edit({id,name, level, urgency, personal, category, frequency, description })
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
          workspace:beforeTask.workspace
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
        <input 
          type="number"
          name="frequency"
          value={this.state.frequency}
          onChange={this.handleInputChange}
          placeholder="Set frequency"
          autoComplete="off"
        ></input>

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