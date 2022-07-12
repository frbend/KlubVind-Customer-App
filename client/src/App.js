import './App.css';
import React from 'react';
// import { useState } from 'react';
 //import Axios from 'axios';
 import Search from './components/Search';
 import InitialRender from './components/InitialRender';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
    data : [],
    nextData: [],
    };

  }


  render(){
    return (
      <div className="App">
        <header className="App-header">
          <h2>Importing MySQL data to React</h2><br />
        </header>
        <div className="Body">
          <div className="table-container">
              <Search /> <br />
              <InitialRender /> 
          </div>
        </div>
      </div>
    );
  }
}
export default App;
