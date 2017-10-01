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
            <div className="menu-wrapper">
                <div className="menubox">
                    <div className="card small menu-card">
                        <div className="card-content">
                            <span className="card-title"><Link to="/goals">Goals</Link></span>
                            <i className="large material-icons">insert_chart</i>

                        </div>
                    </div>


                    <div className="card small menu-card">
                        <div className="card-content">
                            <span className="card-title"><Link to="/meals">Meals</Link></span>
                            <i className="large material-icons">restaurant</i>

                        </div>
                    </div>


                    <div className="card small menu-card">
                        <div className="card-content">
                            <span className="card-title"><Link to="/food"> Food</Link></span>
                            <i className="large material-icons">local_pizza</i>

                        </div>
                    </div>

                    <div className="card small menu-card">
                        <div className="card-content">
                            <span className="card-title">Stats & Logs</span>
                            <span>Coming Soon</span><br />

                        </div>
                    </div>

                </div>

            </div>
        );
    }

}

export default Menu;