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
    const foodsRef = firebase.database().ref('foods');
    foodsRef.on('value', (snapshot) => {
      let foods = snapshot.val();
      let newState = [];
      for (let food in foods) {
        newState.push({
          id: food,
          protein: foods[food].protein,
          fat: foods[food].fat,
          carbs: foods[food].carbs,
          foodName: foods[food].foodName,
          cardCreator: foods[food].cardCreator
        });
      }

      this.setState({
        foods: newState
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
    const foodsRef = firebase.database().ref('foods');
    const food = {
      protein: this.state.protein,
      fat: this.state.fat,
      carbs: this.state.carbs,
      foodName: this.state.foodName,
      cardCreator: this.state.user.displayName
    }
    foodsRef.push(food);
    this.setState({
      protein: '',
      fat: '',
      carbs: '',
      foodName: ''
    });
  }

  render() {
    console.log(this.state);
    return (
      <div className='main-box'>
        <div className='row'>
          <section className='sidebar col m3 white-text'>
            <form onSubmit={this.handleSubmit}>
              <input type="text" name="foodName" placeholder="Enter Food" onChange={this.handleChange} value={this.state.foodName} />
              <input type="text" name="protein" placeholder="Protein" onChange={this.handleChange.bind(this)} value={this.state.protein} />
              <input type="text" name="fat" placeholder="Fat" onChange={this.handleChange.bind(this)} value={this.state.fat} />
              <input type="text" name="carbs" placeholder="Carbs" onChange={this.handleChange.bind(this)} value={this.state.carbs} />
              <button className="btn">Add Item</button>
            </form>
          </section>
          <section className='col m9'>
            <div className='card-wrapper row'>
              <div className="">
                {this.state.foods.map((food) => {
                  return (
                    <Card key={food.id} user={this.state.user} content={food} />
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