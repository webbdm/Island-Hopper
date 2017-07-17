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

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);

  }

  componentDidMount() {

  }

  login() {
    auth.signInWithPopup(provider)
      .then((result) => {
        const user = result.user;
        this.setState({
          user
        });
      });
  }

  logout() {
    auth.signOut()
      .then(() => {
        this.setState({
          user: null
        });
      });
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
                  <button onClick={this.logout}>Log Out</button>
                  :
                  <button onClick={this.login}>Log In</button>
                }
              </ul>
            </div>
          </header>
          <div>
            <Islands islands={this.state} />
            {/*<Route exact path="/" component={Home} />*/}
            {/*<Route path="/islands" render={() => <Islands islands={this.state} />} />*/}
          </div>
        </div>
      </BrowserRouter>
    );
  }
}
export default App;
