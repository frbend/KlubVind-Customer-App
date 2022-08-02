import './App.css';
import React from 'react';
// import { useState } from 'react';
 //import Axios from 'axios';
import Search from './components/Search';
//import InitialRender from './components/InitialRender';
//import PostNote from './components/PostNote';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {};

  }


  render(){
    return (
      <div className="App">
        <header className="App-header">
          <h2>React mySQL Call List App</h2><br />
        </header>
        <div className="Body">
          <div className="table-container">
              <Search /> <br />
          </div>
        </div>
      </div>
    );
  }
}
export default App;
