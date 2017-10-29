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
import Days from './Days.js';
//import Plan from './Plan.js';
import Goals from './Goals.js';


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
              {/* <div className="brand-logo"><Link to="/">Macro Tracko</Link></div> */}
              <div id="nav-mobile" className="nav-route-links left">
                {this.state.user ? [
                  <Link key={0} to="/">Home</Link>,
                  <Link key={1} to="/goals">Goals</Link>,
                  <Link key={2} to="/meals">Meals</Link>,
                  <Link key={3} to="/food">Foods</Link>,
                  <span key={4} className="logout btn" onClick={this.logout}>Logout</span>
                ]
                  :
                  <span className="login btn" onClick={this.login}>Login <img className="login-img" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1000px-Google_%22G%22_Logo.svg.png"/></span>
                }
              </div>
              {/* <div id="nav-mobile" className="nav-route-links right">
                {this.state.user ? [
                  <button key={4} className="waves-effect waves-light btn" onClick={this.logout}>Logout</button>]
                  :
                  <button key={5} className="waves-effect waves-light btn" onClick={this.login}>Log In</button>
                }
              </div> */}
            </div>
          </nav>
          {/* Disable Auth for Demo Purpose */}
          {this.state.user ?
            <div>
              <Route exact path="/" component={Menu} />
              <Route exact path="/food" component={() => (<Islands data={this.state} />)} />
              <Route exact path="/goals" component={() => (<Goals data={this.state} />)} />
              <Route exact path="/meals" component={() => (<Meals data={this.state} />)} />
              <Route exact path="/days" component={() => (<Days user={this.state.user} />)} />
              <Route exact path="/meals/:id" component={CreateMeals} />

              <div className='user-profile'>
                {/*<img src={this.state.user.photoURL} alt="User" />*/}
              </div>
            </div>
            :
            <Home/>
          }
        </div>


      </BrowserRouter>
    );
  }
}
export default App;
