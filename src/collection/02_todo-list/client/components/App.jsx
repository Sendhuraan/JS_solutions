import React, { Component } from 'react';
import Todo from './Todo/Todo';
import Header from './shared/layout/Header';
import Content from './shared/layout/Content';
import Footer from './shared/layout/Footer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header title="Todo List" />

        <Content>
          <Todo />
        </Content>
        
        <Footer />
      </div>
    );
  }
}

export default App;
