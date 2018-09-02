import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Modal from '../src/components/modal';
import logo from './logo.svg';
import './App.css';
import CardContainer from '../src/components/nodes';

var contName;
class App extends Component {
  modalTitle;
  newFolder;
  newFile;
  optValue;
  placeholder;
  btnName = "add";
  Nodes = {
    component: [
      {
        name: "Home",
        type: "file",
        compName: "Home",
        path: "home"
      },
      {
        name: "About",
        type: "folder",
        compName: "About",
        path: "about",
        files: [
          {
            name: "About1",
            path: "about1"
          },
          {
            name: "About2",
            path: "about2"
          }
        ]
      },
      {
        name: "Topic",
        type: "file",
        compName: "Topics",
        path: "topics"
      }
    ]

  }
  showList = false;
  state = { show: false };


  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };
  addFolder = async () => {
    this.modalTitle = "Add Folder";
    this.placeholder = "Enter folder name...";
    this.showList = false;
    this.showModal();
  }
  addFile = async () => {
    this.modalTitle = "Add File";
    this.placeholder = "Enter file name...";
    this.showList = true;
    this.showModal();
  }
  edit = async () => {
    this.modalTitle = String("Edit "+contName+" name");
    this.placeholder = "Enter the new name...";
    this.btnName = "edit"
    this.showModal();
  }
  delete = async () => {
    alert(contName);
    for (var i = 0; i < this.Nodes.component.length; i++) {
      if (this.Nodes.component[i].path == contName) {
        this.Nodes.component.splice(i, 1);
      }
      else if(this.Nodes.component[i].type=="folder"){
        for (var j = 0; j < this.Nodes.component[i].files.length; j++) {
          if (this.Nodes.component[i].files[j].path == contName){
            this.Nodes.component[i].files.splice(j,1);
          }
        }
      }
    }
  }
  getNodeName = async (e) => {
    e.preventDefault();
    if (this.modalTitle == "Add Folder") {
      this.newFolder = e.target.elements.name.value;
      this.Nodes.component.push({
        name: this.newFolder,
        type: "folder",
        compName: "Home",
        path: String("/" + this.newFolder),
        files: []
      })
    }
    else if (this.modalTitle == "Add File") {
      this.newFile = e.target.elements.name.value;
      this.optValue = e.target.elements.option.value;
      for (var i = 0; i < this.Nodes.component.length; i++) {
        if (this.Nodes.component[i].type == "folder" && this.Nodes.component[i].name == this.optValue) {
          this.Nodes.component[i].files.push({
            name: this.newFile,
            path: String("/" + this.newFile)
          })
        }
      }
    }
    else if(this.modalTitle == String("Edit "+contName+" name")){
      var newName = e.target.elements.name.value;
      for (var i = 0; i < this.Nodes.component.length; i++) {
        if (this.Nodes.component[i].path == contName) {
          this.Nodes.component[i].name= newName;
          this.Nodes.component[i].path= newName;
        }
        else if(this.Nodes.component[i].type=="folder"){
          for (var j = 0; j < this.Nodes.component[i].files.length; j++) {
            if (this.Nodes.component[i].files[j].path == contName){
              this.Nodes.component[i].files[j].name=newName;
              this.Nodes.component[i].files[j].path=newName;
            }
          }
        }
      }
    }
    this.hideModal();
  }
  render() {
    return (
      <Router>
        <div className="wrapper">
          <div className="container">
            <div className="vertical-menu">
              <div className="verticalTitle">
                React Dashboard
            </div>
              <div className="editor">
                <button className="btnSty" onClick={this.addFolder}>+ folder</button>
                <button className="btnSty1" onClick={this.addFile}>+ file</button>
              </div>
              <CardContainer nodes={this.Nodes}></CardContainer>
            </div>
            <div className="content">
              <Route exact path="/:id" component={Topic} />
              <div className="editCont">
                <button className="btnSty edbtn" onClick={this.edit}>edit</button>
                <button className="btnSty1 edbtn" onClick={this.delete}>delete</button>
              </div>
            </div>
          </div>
          <Modal show={this.state.show} handleClose={this.hideModal}>
            <h2>{this.modalTitle}</h2>
            <form onSubmit={this.getNodeName}>
              <input type="text" name="name" placeholder={this.placeholder}></input>
              <br /><br />
              <List nodes={this.Nodes} show={this.showList}></List>
              <br /><br />
              <button type="submit" className="btnSty add">{this.btnName}</button>
            </form>
          </Modal>
        </div>

      </Router>
    );
  }
}

const Topic = ({ match }) => {
  contName = match.params.id;
  return (<div>
    <h2>{match.params.id}</h2>
  </div>);
}

const List = props => {
  const showHideClassName = props.show ? "display-block" : "display-none";
  var Nodes = props.nodes;
  var ele = [];
  for (var i = 0; i < Nodes.component.length; i++) {
    if (Nodes.component[i].type == "folder") {
      ele.push(
        <option value={Nodes.component[i].name}>{Nodes.component[i].name}</option>
      )
    }
  }
  return (
    <div className={showHideClassName}>
      <select name="option">
        <option>Select Folder</option>
        {ele}
      </select>
    </div>
  )
}

export default App;

