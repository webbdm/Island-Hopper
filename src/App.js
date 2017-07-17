import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import firebase, { auth, provider } from './firebase.js';

// Components
import Home from './Home.js';
import Islands from './Islands.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      islandLocation: '',
      islandname: '',
      islands: [],
      user: null
    }

  }

  render() {
    return (
      <BrowserRouter>
        <div className='app'>
          <header>
            <div className='wrapper'>
              <h1>Island Hopper<i className="fa fa-plane" aria-hidden="true"></i></h1>
              <ul className='nav-links pull-right'>
                <Link to="/"><li>Home</li></Link>
                {this.state.user ?
                  <li onClick={this.logout}>Log Out</li>
                  :
                  <li onClick={this.login}>Log In</li>
                }
              </ul>
            </div>
          </header>
          <div>
            <Route exact path="/" component={Home} />
            <Route path="/islands" render={() => <Islands islands={this.state} />} />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}
export default App;
