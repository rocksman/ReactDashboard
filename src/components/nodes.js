import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

var i;
var nodes;
var path;
var fi;
 
class CardContainer extends React.Component {
    render() {
        nodes = this.props.nodes;
        var elements = [];

        for (i = 0; i < nodes.component.length; i++) {
            path = String("/"+nodes.component[i].path);
            if (nodes.component[i].type == "folder") {
                fi = i;
                elements.push(
                    <Link to={path} className="folder" >{nodes.component[i].name}<span>></span></Link>
                );
                if (nodes.component[i].files.length != 0) {
                    elements.push(
                        <Route path={path} component={Files} />
                    )
                }
            }
            else {
                elements.push(
                    <Link to={path}>{nodes.component[i].name}</Link>
                )
            }
        }
        console.log(elements);
        return (
            <div>
                {elements}
            </div>
        )
    }
}

const Files = () => {
    var ele = [];
    console.log(nodes.component[fi].files.length);
    for (var j = 0; j < nodes.component[fi].files.length; j++) {
        path = String("/"+nodes.component[fi].files[j].path);
        ele.push(
            <Link to={path} >{nodes.component[fi].files[j].name}</Link>
        );
    }
    return (
        <div className="file">
            {ele}
        </div>
    )
}

export default CardContainer;