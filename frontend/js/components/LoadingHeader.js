import React from 'react';
import { Header, Placeholder } from 'semantic-ui-react';

const LoadingHeader = () => {
  return (
    <Header as="h1" className="header-page">
      <Placeholder>
        <Placeholder.Line length="full" />
      </Placeholder>
    </Header>
  );
};

export default LoadingHeader;
