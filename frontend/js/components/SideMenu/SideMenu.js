import React from 'react';
import { Menu, Icon, Label, Button, Image, Grid } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import RepositoryAddNew from '../RepositoryAddNew';
import './style.scss';

class SideMenu extends React.Component {
  render() {
    const { activeItem } = this.props;

    return (
      <Menu className="main-menu" fixed="left" vertical>
        <Menu.Item as="h3" className="logo" header>
          <Icon name="sitemap" size="large" />
          CommitZ...
        </Menu.Item>

        <Menu.Item className="add-repository">
          <RepositoryAddNew />
        </Menu.Item>

        <Menu.Item active={activeItem === 'commits'} as={Link} name="commits" to="/">
          Commits
          <Icon name="folder" />
        </Menu.Item>

        <Menu.Item
          active={activeItem === 'repositories'}
          as={Link}
          name="repositories"
          to="/repositories"
        >
          Repositórios
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

SideMenu.propTypes = {
  activeItem: PropTypes.bool,
};

export default SideMenu;
