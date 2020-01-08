import React from 'react';
import { Form, Input } from 'semantic-ui-react';

import RepositoryService from 'services/RepositoryService';

import './style.scss';

class RepositoryAddNew extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fullName: '',
    };

    this.handleFullNameChange = this.handleFullNameChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(event) {
    const { fullName } = this.state;

    RepositoryService.registerNewRepository(fullName)
      .then((res) => {
        alert(res.data.message);
        return null;
      })
      .catch((error) => {
        if (error.response.status === 400) {
          alert(error.response.data.full_name || error.response.data.message);
        } else {
          throw new Error(error);
        }
      });

    event.preventDefault();
  }

  handleFullNameChange(e) {
    this.setState({ fullName: e.target.value });
  }

  render() {
    return (
      <Form className="repository-form" onSubmit={this.handleFormSubmit}>
        <Input
          fluid
          icon="search"
          placeholder="Add new repository..."
          onChange={this.handleFullNameChange}
        />
      </Form>
    );
  }
}

export default RepositoryAddNew;
