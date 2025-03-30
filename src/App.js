import React, { Component } from 'react';
import { Provider } from 'react-redux'
import { createStore } from 'redux'



import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      
      <div className="App">
        <div className="col-12">
          <h1>Foreign Exchange Rates</h1>
        </div>
      </div>
      
    );
  }
}

export default App;
