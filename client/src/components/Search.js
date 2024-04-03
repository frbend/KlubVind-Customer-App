import React from 'react';
import Axios from 'axios';
//import Button from '@mui/material/Button';
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




    handleChange = event => {
        event.preventDefault();
        this.setState({value: event.target.value})
    }

    //for search

    getData = () => {
        if(this.state.search === ""){
            console.log("empty search")
        }else{
        Axios.get('list/' + this.state.search)
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
        Axios.get('http://localhost:8080/list/Kommune/:Kommune/prev/'+ this.state.responseData[0].id)
        .then(prevData =>{
            this.setState({responseData: prevData.data});
            console.log(prevData.data[0])
        })
}

    nextItem =() =>{
        Axios.get('http://localhost:8080/list/Kommune/:Kommune/next/'+ this.state.responseData[0].id)
        .then(newData =>{
            this.setState({responseData: newData.data});
            console.log(newData.data[0])
        })
    }

    //for adding note

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
                <button onClick={this.getData} className="primary-button" type="submit">Search</button>
            </div>
            <div className="button-box">
            &nbsp;&nbsp;&nbsp;&nbsp;<button onClick={this.prevItem} className="primary-button" type="submit">Previous</button>&nbsp;&nbsp;
                <button onClick={this.nextItem} className="primary-button" type="submit">Next</button>
            </div>

        <div className="search-desktop">
            {/* desktop */}
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
                        <td className="col content">{responseData.Kontakt}</td>
                        <td className="col content">{responseData.Telefon}</td>
                        <td className="col content">{responseData.Email}</td> 
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
                {/* mobile */}
        <div className="search-mobile">
            <table className="table table-striped">
                    {this.state.responseData.map(responseData =>(
                    <tbody key={responseData.id}>

                        <tr><th scope="row">Kommune</th></tr>
                        <tr><td>{responseData.Kommune}</td></tr>

                        <tr><th scope="row">Forening</th></tr>
                        <tr><td>{responseData.Forening}</td></tr>

                        <tr><th scope="row">Kontakt</th></tr>
                        <tr><td>{responseData.Kontakt}</td></tr>

                        <tr><th scope="row">Telefon</th></tr>
                        <tr><td>{responseData.Telefon}</td></tr>
                        
                        <tr><th scope="row">Email</th></tr>
                        <tr><td>{responseData.Email}</td></tr>
                    </tbody>
                    ))}
            </table>
        </div>

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
            <button onClick={this.getNote} className="primary-button-note">Post Note</button>
            <div>
                {/* <Button variant="contained">Hello World</Button> */}
            </div>
          </div>
        </div>
        );
    }
}

export default Search;
