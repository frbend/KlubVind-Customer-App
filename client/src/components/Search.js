import React from 'react';
import Axios from 'axios';
//import NextResult from './NextResult';



class Search extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            responseData: [],
            search: "",
            value: '',
        };
    }

    //for search

    getData = () => {
        Axios.get('https://klubvind-call-list.herokuapp.com/list/Kommune/' + this.state.search)
          .then(responseData => {
              if(responseData.data.length === 0){
                console.warn("No results")
              }else{
              this.setState({responseData: responseData.data, search: ""});
              console.log(responseData.data[0])
                }
            }
        )
    }

    onChange = event => {
        this.setState({ search: event.target.value});
        //console.log(event.target.value);
    }

    //To search using enter
     onEnter=(event)=> {
         if(this.state.search === "" && event.keyCode === 13){
             console.log("empty search")
         }
        else if (event.keyCode === 13) {
            this.getData();
        }
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
        if(this.state.responseData[0].Note === null){
            console.log("Note is empty, adding current input: " + this.state.value)
            Axios.post('http://localhost:8080/list/Kommune/'+ this.state.responseData[0].Kommune + '/' + this.state.responseData[0].id + '/Note/' + this.state.value)
                .then(newNote =>{
                    this.setState({Note : newNote})
                    console.log(newNote.data.message + " Note added : " + this.state.value)
                })

        }else{
        console.log("Note is: " + this.state.value + ' , ' + this.state.responseData[0].Note);
        Axios.post('http://localhost:8080/list/Kommune/'+ this.state.responseData[0].Kommune + '/' + this.state.responseData[0].id + '/Note/' + this.state.value)
            .then(updatedNote =>{
                this.setState({Note: this.state.value + ' , ' + this.state.responseData[0].Note});
                console.log(this.updatedNote);
            })
        }
    }





    render(){
        return(
        <div>
            <div className="search-bar">
                <label className="searchHeading">Search by Kommune:&nbsp;&nbsp;&nbsp;</label>
                <input type="text" onChange={this.onChange} value={this.state.search} onKeyDown={(e) => this.onEnter(e) }/>&nbsp;&nbsp;
                <button onClick={this.getData} className="primary-button" type="submit">Search</button><br />
            </div>
            <div className="button-box col-lg-12">
            &nbsp;&nbsp;&nbsp;&nbsp;<button onClick={this.prevItem} className="primary-button">Previous</button>&nbsp;&nbsp;
                <button onClick={this.nextItem} className="primary-button">Next</button>
            </div>
            <table className="table">
                <thead>
                    <tr>
                    <th scope="col">Kommune</th>
                    <th scope="col">Forening</th>
                    <th scope="col">Kontakt</th>
                    <th scope="col">Telefon</th>  
                    <th scope="col">Email</th>             
                    </tr>
                </thead>
                <tbody>
                    {this.state.responseData.map(responseData =>(
                        <tr key={responseData.id}>
                        <td className="col content">{responseData.Kommune}</td>
                        <td className="col content">{responseData.Forening}</td>
                        <td className="col content">{responseData.Kontakt_skrab}</td>
                        <td className="col content">{responseData.Telefon_skrab}</td>
                        <td className="col content">{responseData.Mail_skrab}</td> 
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
              Add a note:&nbsp;&nbsp;
              <input type="text" value={this.state.value} onChange={this.handleChange} />
            </label>&nbsp;&nbsp;
            <button onClick={this.getNote} className="primary-button">Post Note</button>
          </div>
        </div>
        );
    }
}

export default Search;
