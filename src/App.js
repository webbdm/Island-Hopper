import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { auth, provider } from './firebase.js';

// Components
import Home from './Home.js';
import Islands from './Islands.js';
import Meals from './Meals.js';
import Menu from './Menu.js';
import CreateMeals from './CreateMeals.js';
import Plan from './Plan.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      total: '',
      foodname: '',
      foods: [],
      meals: [],
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
              <div className="brand-logo"><Link to="/">Macro Tracko</Link></div>
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
              <Route exact path="/" component={Menu} />
              <Route exact path="/food" component={() => (<Islands data={this.state} />)} />
              <Route exact path="/meals" component={() => (<Meals data={this.state} />)} />
              <Route exact path="/plan" component={() => (<Plan data={this.state} />)} />
              <Route exact path="/meals/:id" component={CreateMeals} />

              <div className='user-profile'>
                {/*<img src={this.state.user.photoURL} alt="User" />*/}
              </div>
            </div>
            :
            <Home />
          }
        </div>


      </BrowserRouter>
    );
  }
}
export default App;
