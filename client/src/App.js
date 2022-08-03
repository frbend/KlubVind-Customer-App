import './App.css';
import React from 'react';
// import { useState } from 'react';
 //import Axios from 'axios';
import Search from './components/Search';
import Logo from './images/Screenshot-2022-08-03.png';
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
         <a href="https://klubvind.dk/" target="_blank" rel="noreferrer noopener"> <img src={Logo} className="Logo-img" alt="fireSpot"/> </a>
          <h2>KlubVind Call List App</h2><br />
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
