import React, { Component } from 'react';
import './App.css';
//import { Link } from 'react-router-dom';
//import firebase, { auth, provider } from './firebase.js';

class Home extends Component {

    constructor(props) {
        super();
        console.log(props)
        this.state = {
            user: null
        }
    }
    render() {
        return (
            <div className="homepage">
                <div className="login-container">
                    <div className="login-box">
                        <h3>Macro Tracker</h3>
                        <p>Login with Google to get started!</p>
                        {/* <h6>Helpful Links:</h6><br/>
                        <a href="">Tiger Fitness</a><br/>
                        <a href="">Gregg Plitt</a> */}
                    </div>
                </div>

                {/* <div className="login-banner">
                    <p>Hi</p>
                </div> */}

            </div>
        );
    }
}
export default Home;