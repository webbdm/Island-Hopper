import React, { Component } from 'react';
import './App.css';
import firebase, { auth } from './firebase.js';

class Islands extends Component {

  constructor(props) {
    super();
    this.state = props.islands;
    this.state.editing = false;

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const islandsRef = firebase.database().ref('islands');
    islandsRef.on('value', (snapshot) => {
      let islands = snapshot.val();
      let newState = [];
      console.log("state");
      for (let island in islands) {
        newState.push({
          id: island,
          islandLocation: islands[island].islandLocation,
          islandname: islands[island].islandname,
          cardCreator: islands[island].cardCreator
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

  editIsland(island){
    console.log(this.state, island);
    this.setState({
      editing: true
    });
    const islandRef = firebase.database().ref(`/islands/${island.id}`);
    console.log(this.state, island);
    //islandRef.set(island);
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
                      <p>Added by {island.cardCreator}</p>
                      {island.cardCreator === this.state.user.displayName ?
                      <div className="card">
                        <button className="card-button" onClick={() => this.removeIsland(island.id)}>Delete</button>
                        <button className="card-button" onClick={() => this.editIsland(island)}>Edit</button>  
                      </div> : null}
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