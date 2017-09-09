import React, { Component } from 'react';
import './App.css';
//import { Link } from 'react-router-dom';
import firebase from './firebase.js';

class Goals extends Component {

    constructor(props) {
        super();
        this.state = {
            state: "state"
        };
    }

    componentWillMount(){
        console.log("WILL");

    }

    render() {
        return (
            <div>
                {console.log("hi")}
                <p>Goals</p>
            </div>
        );
    }
}


export default Goals;