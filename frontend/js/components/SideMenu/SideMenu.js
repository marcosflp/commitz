import React from 'react';
import { Menu, Icon, Label, Button, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import RepositoryAddNew from '../RepositoryAddNew';

import './style.scss';

class SideMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeItem: 'commits',
    };

    this.handleMenuItemClick = this.handleMenuItemClick.bind(this);
  }

  handleMenuItemClick(e, { name }) {
    this.setState({ activeItem: name });
  }

  render() {
    const { activeItem } = this.state;

    return (
      <Menu className="main-menu" fixed="left" vertical>
        <Menu.Item as="h3" className="logo" header>
          <Icon name="sitemap" size="large" />
          CommitZ...
        </Menu.Item>

        <Menu.Item className="add-repository">
          <RepositoryAddNew />
        </Menu.Item>

        <Menu.Item
          active={activeItem === 'commits'}
          as={Link}
          name="commits"
          to="/"
          onClick={this.handleMenuItemClick}
        >
          Home
          <Icon name="folder" />
        </Menu.Item>

        <Menu.Item className="logout" position="right">
          <div className="user">
            <Label as="a" image>
              <Image src="https://react.semantic-ui.com/images/avatar/small/elliot.jpg" />
              Nome do usuário
            </Label>
          </div>

          <Link to="/logout">
            <Button circular floated="right" icon="log out" />
          </Link>
        </Menu.Item>
      </Menu>
    );
  }
}

export default SideMenu;
