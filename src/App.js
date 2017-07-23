import React, { Component } from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { auth, provider } from './firebase.js';

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
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      }
    });
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
            <div className="wrapper">
              <h1>Island Hopper<i className="fa fa-plane" aria-hidden="true" /></h1>
              <div className="pull-right">
                {this.state.user ?
                  <button onClick={this.logout}>Logout</button>
                  :
                  <button onClick={this.login}>Log In</button>
                }
              </div>
            </div>
          </header>
          {this.state.user ?
            <div>
              <Islands islands={this.state} />
              <div className='user-profile'>
                <img src={this.state.user.photoURL} alt="User" />
              </div>
            </div>
            :
            <Home />
          }
          <div>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}
export default App;
