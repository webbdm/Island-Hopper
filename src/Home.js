import React, { Component } from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import firebase, { auth, provider } from './firebase.js';

class Home extends Component {
    render() {
        return (
            <div className='homepage'>
                <h1>Welcome to Island Hopper</h1>
            </div>
        );
    }
}
export default Home;