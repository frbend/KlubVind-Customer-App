import React from 'react';



class NextResult extends React.Component{
    constructor(props){
        super(props);
        //Might not need??
        this.updateState = this.updateState.bind(this);
    }


//TODO: Need IDs in the database to switch to next one????

  updateState() {
    //this.updateState({responseData: responseData.data +1})
    console.log("Clicked the next button");
}
//return console.log("pressed next button")


    render(){
        return(
            <div>
                <button onClick={this.updateState}>Next</button>
            </div>
        );
    }
}

export default NextResult;