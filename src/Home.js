import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Link } from 'react-router-dom';

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