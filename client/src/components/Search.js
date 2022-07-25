import React from 'react';
import Axios from 'axios';
//import NextResult from './NextResult';



class Search extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            responseData: [],
            search: "",
            value: ''
        };
    }
    //store ID in a state


    //for search

    getData = () => {
        Axios.get('https://klubvind-call-list.herokuapp.com/list/Kommune/' + this.state.search)
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

    //for switching between previous and next line

    prevItem =() =>{
        Axios.get('https://klubvind-call-list.herokuapp.com/list/Kommune/:Kommune/prev/'+ this.state.responseData[0].id)
        .then(prevData =>{
            this.setState({responseData: prevData.data});
            console.log(prevData.data[0])
        })
}

    nextItem =() =>{
        Axios.get('https://klubvind-call-list.herokuapp.com/list/Kommune/:Kommune/next/'+ this.state.responseData[0].id)
        .then(newData =>{
            this.setState({responseData: newData.data});
            console.log(newData.data[0])
        })
    }

    //for adding note

    handleChange = event => {
        event.preventDefault();
        this.setState({value: event.target.value})
    }

    ///list/Kommune/:Kommune/:id/Note/:Note

    getNote = () => {
        if(this.state.responseData[0].Note !== null){
            console.log("Note is: " + this.state.value + ' , ' + this.state.responseData[0].Note);
            Axios.post('http://localhost:8080/list/Kommune/'+ this.state.responseData[0].Kommune + '/' + this.state.responseData[0].id + '/Note/' + this.state.value)
                .then(updatedNote =>{
                    this.setState({Note: updatedNote + this.state.responseData[0].Note});
                    console.log(updatedNote);
                })
        }else{
            console.log("Note is empty, adding current input: " + this.state.value)
                Axios.post('http://localhost:8080/list/Kommune/'+ this.state.responseData[0].Kommune + '/' + this.state.responseData[0].id + '/Note/' + this.state.value)
                    .then(newNote =>{
                        this.setState({Note : newNote})
                        console.log(newNote.data.message + " Note added : " + this.state.value)
                    })
        }
    }


    render(){
        return(
        <div>
            <label className="searchHeading">Search by Kommune:</label>
            <input type="text" onChange={this.onChange} value={this.state.search}/>
            <button onClick={this.getData} className="btn btn-primary">Search</button><br />
            <div className="button-box col-lg-12">
                <button onClick={this.prevItem} className="btn btn-primary ">Previous</button>
                <button onClick={this.nextItem} className="btn btn-primary ">Next</button>
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
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Note</th>
                    </tr>
                </thead>
            <tbody>
            {this.state.responseData.map(responseData =>(
                        <tr key={responseData.id}>
                            <td>{responseData.Note}</td>
                        </tr>
                    ))}
            </tbody>
            </table>
            <div>
            <label>
              Add a note:
              <input type="text" value={this.state.value} onChange={this.handleChange} />
            </label>
            <button onClick={this.getNote}>Post Note</button>
          </div>
        </div>
        );
    }
}

export default Search;
