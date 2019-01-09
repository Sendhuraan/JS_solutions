import React from 'react';
import PropTypes from 'prop-types';

// We created a component with a simple arrow function.
const Header = props => {
  const { title = 'Simple Website', url = 'http://localhost:3000' } = props;

  return (
    <header className="App-header">
      <a href={url}>
        <img src="../../images/logo.svg" className="App-logo" alt="logo" />
      </a>
      <h1 className="App-title">{title}</h1>
    </header>
  );
};

// Even with Functional Components we are able to validate our PropTypes.
Header.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string
};

export default Header;
