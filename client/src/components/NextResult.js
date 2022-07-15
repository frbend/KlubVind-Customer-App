import React from 'react';
// import Axios from 'axios';
//import Search from './Search';



class NextResult extends React.Component{
    constructor(props){
        super(props);
        this.state={
            responseData: []
        };   
    }


    // getData = () => {
    //     Axios.get(`http://localhost:8080/list/Kommune/` + this.state.search)
    //       .then(responseData => {
    //           if(responseData.data.length === 0){
    //             console.warn("No results")
    //           }else{
    //           this.setState({responseData: responseData.data});
    //           console.log(responseData.data[0])
    //             }
    //         }
    //     )
    // }

    // nextItem =() =>{
    //     Axios.get(`http://localhost:8080/list/Kommune/:Kommune/next/`+ this.state.responseData[0].id)
    //     .then(newData =>{
    //         this.setState({responseData: newData.data});
    //         console.log(newData.data[0])
    //     })
    // }




    render(){
        return(
            <div>
                <button onClick={this.nextItem} className="btn btn-primary">Next</button>
            </div>
        );
    }
}

export default NextResult;