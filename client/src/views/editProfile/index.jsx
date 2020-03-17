import React, { Component } from 'react';

import { editUserInformation } from './../../services/authentication';

import './style.scss';

class EditProfileView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      picture: ''
    };

    console.log(this.state.user);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmission = this.handleFormSubmission.bind(this);
    this.handleFileInputChange = this.handleFileInputChange.bind(this);
  }

  componentDidMount() {
    this.setState({
      name: this.props.user.name,
      email: this.props.user.email,
      picture: null
    });
  }

  async handleFormSubmission(event) {
    event.preventDefault();
    const { name, email, picture } = this.state;
    try {
      const user = await editUserInformation({
        name,
        email,
        picture
      });
      this.props.updateUserInformation(user);
      this.props.history.push('/dashboard');
    } catch (error) {
      console.log(error);
    }
  }

  handleFileInputChange(event) {
    console.dir(event.target);
    const { name, files } = event.target;
    this.setState({
      [name]: files[0]
    });
  }

  handleInputChange(event) {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  }

  render() {
    const user = this.props.user;
    return (
      <div className="edit__profile">
        <h1>Edit Your Profile</h1>

        <figure>
          <img
            style={{ width: '50%', margin: '0 auto', borderRadius: '50%' }}
            src={user.picture}
            alt={user.name}
          />
        </figure>

        <form className="editProfile__form" onSubmit={this.handleFormSubmission}>
        <label htmlFor="name">Name</label>
          <input
            className="editProfile__input"
            id="name"
            name="name"
            type="text"
            placeholder="Name"
            onChange={this.handleInputChange}
            value={this.state.name}
          />
          <label htmlFor="email">Email</label>

          <input
            className="editProfile__input"
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            onChange={this.handleInputChange}
            value={this.state.email}
          />
          <label htmlFor="picture">Profile Picture</label>
          <input
            className="editProfile__input"
            type="file"
            id="picture"
            name="picture"
            onChange={this.handleFileInputChange}
          />
          <button className="editProfile__btn">Update Profile</button>
        </form>
      </div>
    );
  }
}

export default EditProfileView;
