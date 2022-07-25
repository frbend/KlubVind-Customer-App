import React from 'react';
import Axios from 'axios';

class IntialRender extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data : []
        }
    }


  componentDidMount() {
    Axios.get("https://klubvind-call-list.herokuapp.com/list/")
      .then(res =>{
        this.setState({data: res.data});
        console.log(this.state.data);
      })
  }

  render(){
      return(
          <div>
            {/* <ul className="table">
                {this.state.data.map(data =>(
                    <p>
                    <li key={data._id}>Kommune: {data.Kommune}</li>
                    <li key={data._id}>Forening: {data.Forening}</li>
                    <li key={data._id}>Kontakt: {data.Kontakt_skrab}</li>
                    <li key={data._id}>Email: {data.Mail_skrab}</li>                    
                    </p>
                ))}
            </ul> */}
          </div>
      )
  }

}
export default IntialRender;