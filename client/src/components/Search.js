import React from 'react';
import Axios from 'axios';
import NextResult from './NextResult';


class Search extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            responseData: [],
            data : [],
            search: ""
        };
    }

    getData = () => {
        Axios.get(`http://localhost:8080/list/Kommune/` + this.state.search)
          .then(responseData => {
            //   if(responseData === []){
            //       console.warn("Nothing found in the database")
            //   }else{
              this.setState({responseData: responseData.data});
              console.log(responseData.data)
            }
        //   }
          )
    }
    onChange = event => {
        this.setState({ search: event.target.value});
        //console.log(event.target.value);
    }

    render(){
        return(
        <div>
            <label className="searchHeading">Search by Kommune:</label>
            <input type="text" onChange={this.onChange} value={this.state.search}/>
            <button className="searchButton" onClick={this.getData}>Search</button><br/><br/>
            <NextResult />
            <ul className="responseTable">
            {this.state.responseData.map(responseData =>(
                <p>
                  <li key={responseData._id}>Kommune: {responseData.Kommune}</li>
                  <li key={responseData._id}>Forening: {responseData.Forening}</li>
                  <li key={responseData._id}>Kontakt: {responseData.Kontakt_skrab}</li>
                  <li key={responseData._id}>Email: {responseData.Mail_skrab}</li> 
                  <li key={responseData._id}>Number: {responseData.Telefon}</li> 
                </p>
              ))}
            </ul>
        </div>
        );
    }
}

export default Search;
