import React from 'react';
import Axios from 'axios';
//import NextResult from './NextResult';



class Search extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            responseData: [],
            search: ""
        };
    }
    //store ID in a state




    getData = () => {
        Axios.get(`http://localhost:8080/list/Kommune/` + this.state.search)
          .then(responseData => {
              if(responseData.data.length === 0){
                console.warn("No results")
              }else{
              this.setState({responseData: responseData.data});
              console.log(responseData.data[0])
                }
            }
        )
    }
    onChange = event => {
        this.setState({ search: event.target.value});
        //console.log(event.target.value);
    }

    //save responseData[].id in a state

    prevItem =() =>{
        Axios.get(`http://localhost:8080/list/Kommune/:Kommune/prev/`+ this.state.responseData[0].id)
        .then(prevData =>{
            this.setState({responseData: prevData.data});
            console.log(prevData.data[0])
        })
}

    nextItem =() =>{
        Axios.get(`http://localhost:8080/list/Kommune/:Kommune/next/`+ this.state.responseData[0].id)
        .then(newData =>{
            this.setState({responseData: newData.data});
            console.log(newData.data[0])
        })
    }


    render(){
        return(
        <div>
            <label className="searchHeading">Search by Kommune:</label>
            <input type="text" onChange={this.onChange} value={this.state.search}/>
            <button onClick={this.getData} className="btn btn-primary">Search</button><br />
            <div className="button-box col-lg-12">
                <button onClick={this.nextItem} className="btn btn-primary ">Next</button>
                <button onClick={this.prevItem} className="btn btn-primary ">Previous</button>
            </div>
            <table className="table">
                <thead>
                    <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Kommune</th>
                    <th scope="col">Forening</th>
                    <th scope="col">Kontakt skrab</th>
                    <th scope="col">Kontakt</th>
                    <th scope="col">Email</th>
                    <th scope="col">Telefon</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.responseData.map(responseData =>(
                        <tr key={responseData.id}>
                        <td>{responseData.id}</td>
                        <td>{responseData.Kommune}</td>
                        <td>{responseData.Forening}</td>
                        <td>{responseData.Kontakt_skrab}</td>
                        <td>{responseData.Kontakt}</td>
                        <td>{responseData.Mail_skrab}</td> 
                        <td>{responseData.Telefon_skrab}</td> 
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        );
    }
}

export default Search;
