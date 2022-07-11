import './App.css';
import React from 'react';
// import { useState } from 'react';
// import Axios from 'axios';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {apiResponse:""};
    //const [callList, setCallList] = useState([]);
  }
  // callAPI(){
  //   fetch("http://localhost:8080/list/Kommune/Randers")
  //   .then(res => res.text())
  //   .then(res => this.setState({apiResponse: res}))
  // }
  // componentDidMount(){
  //   this.callAPI();
  // }

 

  //  getList = () =>{
  //   Axios.get("http://localhost:8080/list").then((response) =>{
  //     console.log(response);
  //     setCallList(response.data)
  //   })
  // }


  async getData(){
    const url = "http://localhost:8080/list";
    const resp = await fetch(url);
    const data = await resp.json();
    return this.setState({
      list : data 
    })
  };

  componentDidMount() {
    this.getData().then(() => console.log("received data: ", this.state.list));
}

 
//TODO: DISPLAY DATA ON THE PAGE IN LIST ITEMS
//DATA IS ALREADY FETCHED FROM SQL ON COMPONENTDITMOUNT (DATA DISPLAYED IN CONSOLE --> GET IT ON THE PAGE)



  render(){
    return (
      <div className="App">
        <header className="App-header">
          <h2>Importing MySQL data to React</h2><br />
        </header>
        <div className="Body">
          <div className="table-container">
            <label>Kommune: </label>
            <input type="text" />
            <button className="searchButton" onClick={this.getData}>Search</button>

          </div>
        </div>
      </div>
    );
  }
}
export default App;
