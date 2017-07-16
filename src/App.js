import React, { Component } from 'react';
import './App.css';
import firebase from './firebase.js';

class App extends Component {

  constructor() {
    super();
    this.state = {
      islandLocation: '',
      islandname: '',
      islands: []
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const islandsRef = firebase.database().ref('islands');
    islandsRef.on('value', (snapshot) => {
      let islands = snapshot.val();
      let newState = [];
      for (let island in islands) {
        newState.push({
          id: island,
          islandLocation: islands[island].islandLocation,
          islandname: islands[island].islandname
        });
      }
      this.setState({
        islands: newState
      });
    });
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const islandsRef = firebase.database().ref('islands');
    const island = {
      islandLocation: this.state.islandLocation,
      islandname: this.state.islandname
    }
    islandsRef.push(island);
    this.setState({
      islandLocation: '',
      islandname: ''
    });
  }

  render() {
    return (
      <div className='app'>
        <header>
          <div className='wrapper'>
            <h1>Island Hopper</h1>

          </div>
        </header>
        <div className='container'>
          <section className='add-item'>
            <form onSubmit={this.handleSubmit}>
              <input type="text" name="islandname" placeholder="What's the island name?" onChange={this.handleChange} value={this.state.islandname} />
              <input type="text" name="islandLocation" placeholder="Where is it?" onChange={this.handleChange} value={this.state.islandLocation} />
              <button>Add Island</button>
            </form>
          </section>
          <section className='display-item'>
            <div className='wrapper'>
              <ul>
                {this.state.islands.map((island) => {
                  return (
                    <li key={island.id}>
                      <h3>{island.islandname}</h3>
                      <p>{island.islandLocation}</p>
                    </li>
                  )
                })}
              </ul>
            </div>
          </section>
        </div>
      </div>
    );
  }
}
export default App;
