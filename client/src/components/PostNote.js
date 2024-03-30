import React from 'react';
import Axios from 'axios';
import Search from './Search';



class PostNote extends React.Component{
    constructor(props){
        super(props);
        this.state = {
          value: '',
          responseData: ''
      };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleChange(event) {
        this.setState({value: event.target.value});
      }
    
      handleSubmit(event) {
        console.log("Note: " + this.state.value);
        event.preventDefault();
        this.setState({
            value : ''
        })
      }

      //get data from responseData Note
      //check if the note is empty
      //if it isn't get the data and add value to it
      //post into the database
      getNote = () => {
        return console.log("Note is: " + this.state.value + this.state.responseData[0].Note)
    }


    render(){
        return(
            <form>
            <label>
              Add a note:
              <input type="text" value={this.state.value} onChange={this.handleChange} />
            </label>
            <button type="submit" value="Submit" onClick={this.getNote}>Post Note</button>
          </form>
        );
    }
}

export default PostNote;