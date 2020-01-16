import React from 'react';
import { Form, Input, Message } from 'semantic-ui-react';

import RepositoryService from 'services/RepositoryService';

import './style.scss';

class RepositoryAddNew extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fullName: '',
      loadingForm: false,
      visibleMessage: false,
      errorMessage: '',
      successMessage: '',
    };

    this.handleFullNameChange = this.handleFullNameChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleDismissMessage = this.handleDismissMessage.bind(this);
  }

  handleDismissMessage() {
    this.setState({ visibleMessage: false });
  }

  handleFormSubmit(event) {
    const { fullName } = this.state;

    this.setState({ loadingForm: true, errorMessage: '', successMessage: '' });

    RepositoryService.registerNewRepository(fullName)
      .then((res) => {
        this.setState({
          loadingForm: false,
          visibleMessage: true,
          successMessage: res.data.message,
        });
        return res;
      })
      .catch((error) => {
        if (error.response.status === 400) {
          this.setState({
            loadingForm: false,
            visibleMessage: true,
            errorMessage: error.response.data.full_name || error.response.data.message,
          });
        } else {
          this.setState({
            loadingForm: false,
            visibleMessage: true,
            errorMessage: 'Um erro inesperado ocorreu. Por favor, contate o suporte.',
          });
          throw new Error(error);
        }
      });

    event.preventDefault();
  }

  handleFullNameChange(e) {
    this.setState({ fullName: e.target.value });
  }

  render() {
    const { loadingForm, errorMessage, successMessage, visibleMessage } = this.state;
    let message;

    if (visibleMessage && errorMessage !== '') {
      message = (
        <Message content={errorMessage} error header="Erro" onDismiss={this.handleDismissMessage} />
      );
    } else if (visibleMessage && successMessage !== '') {
      message = (
        <Message
          content={successMessage}
          header="Concluído"
          success
          onDismiss={this.handleDismissMessage}
        />
      );
    }

    return (
      <Form
        className="repository-form"
        error={!!errorMessage}
        success={!!successMessage}
        onSubmit={this.handleFormSubmit}
      >
        <Form.Field>
          <Input
            action="Add repo"
            disabled={loadingForm}
            fluid
            iconPosition={loadingForm ? 'left' : ''}
            loading={loadingForm}
            placeholder="Ex: django/django"
            onChange={this.handleFullNameChange}
          />
          {message}
        </Form.Field>
      </Form>
    );
  }
}

export default RepositoryAddNew;
