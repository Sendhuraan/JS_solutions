import React, { Component } from 'react';
import Home from './Home/Home';
import Header from './shared/layout/Header';
import Content from './shared/layout/Content';
import Footer from './shared/layout/Footer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header title="Welcome to Codejobs" />

        <Content>
          <Home />
        </Content>
        
        <Footer />
      </div>
    );
  }
}

export default App;
