import React from 'react';
import { Form, Input } from 'semantic-ui-react';

import RepositoryService from 'services/RepositoryService';

import './style.scss';

class RepositoryAddNew extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fullName: '',
      showLoading: false,
    };

    this.handleFullNameChange = this.handleFullNameChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(event) {
    const { fullName } = this.state;

    this.setState({ showLoading: true });

    RepositoryService.registerNewRepository(fullName)
      .then((res) => {
        alert(res.data.message);
        this.setState({ showLoading: false });
        return res;
      })
      .catch((error) => {
        this.setState({ showLoading: false });

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
    const { showLoading } = this.state;

    if (showLoading) {
      return (
        <Form className="repository-form" onSubmit={this.handleFormSubmit}>
          <Form.Field>
            <Input
              action="+ Add repo"
              disabled
              fluid
              iconPosition="left"
              loading
              placeholder="Ex: django/django"
              onChange={this.handleFullNameChange}
            />
          </Form.Field>
        </Form>
      );
    }

    return (
      <Form className="repository-form" onSubmit={this.handleFormSubmit}>
        <Form.Field>
          <Input
            action="+ Add repo"
            fluid
            placeholder="Ex: django/django"
            onChange={this.handleFullNameChange}
          />
        </Form.Field>
      </Form>
    );
  }
}

export default RepositoryAddNew;
