import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Link } from 'react-router-dom';

// Components
import Home from './Home.js';
import Islands from './Islands.js';

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <div className='app'>
          <header>
            <div className='wrapper'>
              <h1>Island Hopper<i className="fa fa-plane" aria-hidden="true"></i></h1>
              <ul className='nav-links pull-right'>
                <Link to="/"><li>Home</li></Link>
                <li>Logout</li>
              </ul>
            </div>
          </header>
          <body>
            <Route exact path="/" component={Home} />
            <Route path="/islands" component={Islands} />
          </body>
        </div>
      </BrowserRouter>
    );
  }
}
export default App;
