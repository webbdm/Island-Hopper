import React, { Component } from 'react';
import './App.css';
import { Link } from 'react-router-dom';
//import firebase, { auth, provider } from './firebase.js';

// Components

class Menu extends Component {

    constructor(props) {
        super();
        this.state = props.data;
    }

    render() {
        return (
            <div className="menubox">
                <div className="card small menu-card">
                    <div className="card-content">
                        <span className="card-title"><Link to="/goals">My Profile</Link></span>

                    </div>
                </div>


                <div className="card small menu-card">
                    <div className="card-content">
                        <span className="card-title"><Link to="/meals">Meals</Link></span>

                    </div>
                </div>


                <div className="card small menu-card">
                    <div className="card-content">
                        <span className="card-title"><Link to="/food"> Food</Link></span>

                    </div>
                </div>

                <div className="card small menu-card">
                    <div className="card-content">
                        <span className="card-title">Day Plans</span>

                    </div>
                </div>

            </div>
        );
    }

}

export default Menu;