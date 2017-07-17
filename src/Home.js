import React, { Component } from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import firebase, { auth, provider } from './firebase.js';

class Home extends Component {
    render() {
        return (
            <div className='homepage'>
                <h1>Welcome to Island Hopper</h1>
                <Link to="/islands"><button>Island Hop!</button></Link>
            </div>
        );
    }
}
export default Home;