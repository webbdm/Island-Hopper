import React, { Component } from 'react';
import './App.css';
//import { Link } from 'react-router-dom';
//import firebase, { auth, provider } from './firebase.js';

let menuItems = [{ name: "My Profile", id: 0 }, { name: "Meals", id: 1 }, { name: "Item", id: 2 }];


class Menu extends Component {
    render() {
        return (
            <div className="menubox">
                <div className="row menucontainer">
                    {/* <div className=""></div> */}
                    {menuItems.map((menuItem, index) => {
                        return (
                            <div key={menuItem.id} className="">
                                <div className="card small menu-card">
                                    <div className="card-content">
                                        <span className="card-title">{menuItem.name}</span>

                                    </div>

                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        );
    }

}

export default Menu;