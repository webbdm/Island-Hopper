import React, { Component } from 'react';
import './App.css';
import { Link, Route } from 'react-router-dom';
//import firebase, { auth, provider } from './firebase.js';

// Components
import Islands from './Islands.js'

let menuItems = [{ name: "My Profile", id: 0 }, { name: "Meals", id: 1 }, { name: "Item", id: 2 }];


class Menu extends Component {

    constructor(props) {
    super();
    this.state = props.data;  
  }

    render() {
        return (
            <div className="menubox">
                {console.log(this.state)}
                <div className="row menucontainer">

                    <div className="col m3 s12">
                        <div className="card small menu-card">
                            <div className="card-content">
                                <span className="card-title">My Profile</span>

                            </div>
                        </div>
                    </div>

                    <div className="col m3 s12">
                        <div className="card small menu-card">
                            <div className="card-content">
                                <span className="card-title"><Link to="/meals">Meals</Link></span>

                            </div>
                        </div>
                    </div>

                    <div className="col m3 s12">
                        <div className="card small menu-card">
                            <div className="card-content">
                                <span className="card-title"><Link to="/food"> Food</Link></span>

                            </div>
                        </div>
                    </div>

                    <div className="col m3 s12">
                        <div className="card small menu-card">
                            <div className="card-content">
                                <span className="card-title">Plans</span>

                            </div>
                        </div>
                    </div>
                        
                </div>
            </div>
        );
    }

}

export default Menu;