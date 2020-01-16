import React from 'react';
import { Menu, Icon, Label, Button, Image, Grid } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import RepositoryAddNew from '../RepositoryAddNew';
import './style.scss';
import UserService from '../../services/UserService';

class SideMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      avatarUrl: '',
    };
  }

  componentDidMount() {
    this.getUserData();
  }

  getUserData() {
    UserService.fetchCurrentUser().then((res) => {
      this.setState({
        username: res.data.results[0].name || res.data.results[0].username,
        avatarUrl: res.data.results[0].githubprofile.avatar_url,
      });
      return res;
    });
  }

  render() {
    const { username, avatarUrl } = this.state;
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
            <Label image>
              <Image src={avatarUrl} />
              {username}
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
