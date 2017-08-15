import React, { Component } from 'react';
import './App.css';
import firebase from './firebase.js';

// Components
import Card from './Card.js';

class Islands extends Component {

  constructor(props) {
    super();
    this.state = props.data;
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

  render() {
    console.log(this.state);
    return (
      <div className='main-box'>
        <div className='row'>
          <section className='sidebar col m3 white-text'>
            <form onSubmit={this.handleSubmit}>
              <input type="text" name="islandname" placeholder="Enter Food" onChange={this.handleChange} value={this.state.islandname} />
              <input type="text" name="islandLocation" placeholder="Enter Macros" onChange={this.handleChange.bind(this)} value={this.state.islandLocation} />
              <button className="btn">Add Item</button>
            </form>
          </section>
          <section className='col m9'>
            <div className='card-wrapper row'>
              <div className="">
                {this.state.islands.map((island) => {
                  return (
                    <Card key={island.id} user={this.state.user} content={island} />
                  )
                })}
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}
export default Islands;