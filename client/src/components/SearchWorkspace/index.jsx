import React, { Component } from 'react';

import './style.scss';

import { list } from './../../services/workspace';

class SearchWorkspace extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workspaces: [],
      query: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
    this.listWorkspaces();
  }

  listWorkspaces() {
    list()
      .then(workspaces => {
        this.setState({
          workspaces
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  get filteredWorkspaces() {
    const filteredWorkspaces = this.state.workspaces.filter(workspace => {
      return workspace.name.toLowerCase().includes(this.state.query.toLowerCase());
    });
    return filteredWorkspaces;
  }

  render() {
    return (
      <React.Fragment>
        <div className="workspace__search__form">
          <form className="workspace__search__form">
            <input
              className="workspace__input__form"
              type="search"
              name="query"
              value={this.state.query}
              onChange={this.handleInputChange}
              placeholder="Search for a Workspace.."
              autoComplete="off"
            />
          </form>
        </div>
      
        <ul className="workspaces__list">
          {this.filteredWorkspaces.map(workspace => (
            <li key={workspace._id} className="workspace__item">
              {workspace.name}
              <button className="workspace__btn">+</button>
            </li>
          ))}
        </ul>
      </React.Fragment>
    );
  }
}

export default SearchWorkspace;
