import React, { Component } from 'react';
import './App.css';
import firebase from './firebase.js';

// Components
import Card from './Card.js';

class Islands extends Component {

  constructor(props) {
    super();
    this.state = props.islands;
    //this.state.editing = false;

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
          islandname: islands[island].islandname,
          cardCreator: islands[island].cardCreator
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

  editIsland = (island) => {
    this.setState({
      editing: true
    });
    //const islandRef = firebase.database().ref(`/islands/${island.id}`);
    console.log(this.state.editing, island);
    //islandRef.set(island);
  }


  render() {
    return (
      <div className='islandbox'>
        <div className='container'>
          <section className='add-item'>
            <form onSubmit={this.handleSubmit}>
              <input type="text" name="islandname" placeholder="What's the island name?" onChange={this.handleChange} value={this.state.islandname} />
              <input type="text" name="islandLocation" placeholder="Where is it?" onChange={this.handleChange.bind(this)} value={this.state.islandLocation} />
              <button>Add Island</button>
            </form>
          </section>
          <section className='display-item'>
            <div className='wrapper'>
              <ul>
                {this.state.islands.map((island) => {
                  return (
                    <Card key={island.id} user={this.state.user} content={island} delete={this.removeIsland.bind(this)} edit={this.editIsland}/>
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