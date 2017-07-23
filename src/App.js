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
          <nav>
            <div className="nav-wrapper">
              <div className="col s12"></div>
              <a href="#" className="brand-logo">Macro Tracko</a>
              <ul id="nav-mobile" className="right">
                {this.state.user ?
                  <button className="waves-effect waves-light btn" onClick={this.logout}>Logout</button>
                  :
                  <button className="waves-effect waves-light btn" onClick={this.login}>Log In</button>
                }
              </ul>
            </div>
          </nav>
          {this.state.user ?
            <div>
              <Islands islands={this.state} />
              <div className='user-profile'>
                {/*<img src={this.state.user.photoURL} alt="User" />*/}
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
