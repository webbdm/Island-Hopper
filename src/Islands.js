import React, { Component } from 'react';
import './App.css';
import firebase, { auth, provider } from './firebase.js';

class Islands extends Component {

  constructor(props) {
    super();
    this.state = props.islands;

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

    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      }
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
      islandname: this.state.islandname,
      cardCreator: this.state.user.displayName
    }
    islandsRef.push(island);
    this.setState({
      islandLocation: '',
      islandname: ''
    });
  }

  removeIsland(islandId) {
    const islandRef = firebase.database().ref(`/islands/${islandId}`);
    islandRef.remove();
  }

  render() {
    return (
      <div className='islandbox'>
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
                      <h4>{island.islandLocation}</h4>
                      <p>Added by {this.state.user.displayName}</p>
                      {this.state.user.displayName === this.state.user.displayName || island.user === this.state.user.email ?
                        <button onClick={() => this.removeisland(island.id)}>Delete</button> : null}
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
export default Islands;