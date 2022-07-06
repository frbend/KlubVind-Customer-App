import React, { Component } from 'react';
import { ExcelRenderer} from 'react-excel-renderer';
import {Col, Input, InputGroup, FormGroup, Label, Button, Container, Card } from 'reactstrap';


//React-excel renderer

class Table extends Component {
  constructor(props){
    super(props);
    this.state={
      isOpen: false,
      dataLoaded: false,
      isFormInvalid: false,
      rows: 0,
      cols: '',
    }
    this.fileHandler = this.fileHandler.bind(this);
    this.toggle = this.toggle.bind(this);
    this.openFileBrowser = this.openFileBrowser.bind(this);
    this.renderFile = this.renderFile.bind(this);
    this.fileInput = React.createRef();
    this.state.rows = this.renderFile.bind(this);
    this.nextItem = this.nextItem.bind(this);
  }
  

  renderFile = (fileObj) => {
      //just pass the fileObj as parameter
      ExcelRenderer(fileObj, (err, resp) => {
        if(err){
          console.log(err);            
        }
        else{
          this.setState({
            dataLoaded: true,
            cols: resp.cols,
            rows: resp.rows,
            //rows: resp.rows[1] to show first row
            //firstRow: resp.rows[1]
          });
          console.log(resp.rows[2])
        }
      }); 
  }

  fileHandler = (event) => {    
    if(event.target.files.length){
      let fileObj = event.target.files[0];
      let fileName = fileObj.name;

      
      //check for file extension and pass only if it is .xlsx and display error message otherwise
      if(fileName.slice(fileName.lastIndexOf('.')+1) === "xlsx"){
        this.setState({
          uploadedFileName: fileName,
          isFormInvalid: false
        });
        this.renderFile(fileObj)
      }    
      else{
        this.setState({
          isFormInvalid: true,
          uploadedFileName: ""
        })
      }
    }               
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  openFileBrowser = () => {
    this.fileInput.current.click();
  }

  //for next button --> needs to show next row with all items
  nextItem = (type, resp) =>{
    var x = resp.rows[1];
    var y = resp.rows;
    this.setState(prevState =>{
      return {x: type === 'add' ? prevState.x + y: prevState.x - y}
    })
    console.log(x, y);
  }
  //[4].props.children[3]


    //make a function to fetch specific items from a row

  // nextItem = () =>{
  //   var results = this.state.rows;
  // console.log(results)
  // }




  render() {
    return (
      <div>
        <Container>
        <form>
          <FormGroup row>
            <Label for="exampleFile" xs={6} sm={4} lg={2} size="lg">Upload</Label>          
            <Col xs={4} sm={8} lg={10}>                                                     
              <InputGroup>
                  <Button color="info" style={{color: "white", zIndex: 0}} onClick={this.openFileBrowser.bind(this)}> Browse</Button>
                  <input type="file" hidden onChange={this.fileHandler.bind(this)} ref={this.fileInput} onClick={(event)=> { event.target.value = null }} style={{"padding":"10px"}} />                                
                <Input type="text" className="form-control" value={this.state.uploadedFileName} readOnly invalid={this.state.isFormInvalid} />                                              
              </InputGroup>     
            </Col>                                                   
          </FormGroup>   
        </form>

        {this.state.dataLoaded && 
        <div>
          <Card body outline color="secondary" className="restrict-card">
          <input type='button' onClick={this.nextItem.bind(this, 'add')} value='Next' />
          <input type='button' onClick={this.nextItem.bind(this, 'sub')} value='Previous' />

              {/* <OutTable data={this.state.rows[1]} columns={this.state.cols} tableClassName="ExcelTable" /> */}
              <div className="ExcelResult">
                    <h2>Info: </h2><ul>{this.state.rows[0]}</ul>
                    <h2>Result: </h2>
                    <ol>
                      <li>Kommune: {this.state.rows[2][0]}</li>
                      <li>Forening: {this.state.rows[2][1]}</li>
                      <li>Tel.: {this.state.rows[2][12]}</li>
                      <li>Navn: {this.state.rows[2][11]}</li>
                      <li>Email: {this.state.rows[2][13]}</li>
                    </ol>
              </div> 
          </Card>  
        </div>}
        </Container>
      </div>
    );
  }
}

export default Table;