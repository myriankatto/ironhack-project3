import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';

import { create }  from './../../services/task';






class AddTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      level: '', 
      urgency: '',
      category:'',
      personal:'',
      frequency: '',
      description: '',
      checked: false
      
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmission = this.handleFormSubmission.bind(this);
    this.changePersonal = this.changePersonal.bind(this);
    this.changeUrgency = this.changeUrgency.bind(this);
  }

  handleInputChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });

    
  }

  changePersonal(){
    this.setState({
      personal: true
    });
  }

  changeUrgency(){
    this.setState({
      urgency: true
    });
  }

  // changeCheckPersonal(){
  //   this.setState( previousState => 
  //      {checkedPersonal: !previousState.checkedPersonal}
  //     );
  // }

  handleFormSubmission(event) {
    event.preventDefault();

    const name = this.state.name;
    const level = this.state.level;
    const urgency = this.state.urgency;
    const personal = this.state.personal;
    const category = this.state.category;
    const frequency = Number(this.state.frequency);
    const description = this.state.description;
    
    console.log('STATE', this.state);
    //console.log('typeof frequency', typeof frequency);

    const id = this.props.idWorkspace;
   
    //if (!name || !level || !urgency || !category || !personal) return;
    
    create({id,name, level, urgency, personal, category, frequency, description })
      .then()
      .catch(error => {
        console.log(error);
      });

      this.setState({
        name: '',
        level: '', 
        urgency: '',
        category:'',
        personal:'',
        frequency: '',
        description: '',
        checked: false
      });
  };

 
    
  


  render() {
    return (
      <Form onSubmit={this.handleFormSubmission}>
        <Form.Group controlId="formBasicName">

          {/*Task's name */}
          <Form.Control
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleInputChange}
            placeholder="Your task name"
            autoComplete="off"
          />

          {/* Frequency */}
         <Form.Control
            type="number"
            name="frequency"
            value={this.state.frequency}
            onChange={this.handleInputChange}
            placeholder="Set frequency"
            autoComplete="off"
          /> 

          {/* Level */}
          <Form.Label>Example select</Form.Label>
          <Form.Control 
            as="select"
            name="level"
            value={this.state.level}
            onChange={this.handleInputChange}>
            <option>easy</option>
            <option>medium</option>
            <option>hard</option>
          </Form.Control>

          {/* Pessoal ou Geral*/}
          <Form.Check 
            type="checkbox"
            label="Personal"
            //checked={this.state.checked}
            isSelected={this.changePersonal}
            onChange={this.changePersonal}
          />

          {/* Checkbox para Urgência*/}
          <Form.Check 
            type="checkbox"
            label="Urgency"
            //checked={this.state.checked}
            isSelected={this.changeUrgency}
            onChange={this.changeUrgency}
          />

           {/*Category*/}
          <Form.Label>Select the Category</Form.Label>
          <Form.Control 
            as="select"
            name="category"
            value={this.state.category}
            onChange={this.handleInputChange}>
              <option>Kitchen</option>
              <option>Laundry</option>
              <option>Clean up</option>
          </Form.Control>

          <Form.Label>Description</Form.Label>
          <Form.Control 
            as="textarea" 
            rows="3"
            type="text"
            name="description"
            value={this.state.description}
            onChange={this.handleInputChange}
            placeholder="Your description"
            autoComplete="off" />
          

          


          <Button variant="primary" type="submit">
            Create
          </Button>
        </Form.Group>
      </Form>
    );
  }
}

export default AddTask;