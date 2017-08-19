import React, { Component } from 'react';
import './App.css';
//import { Route, Link } from 'react-router-dom';
import firebase from './firebase.js';

// Components
import MealCard from './MealCard.js';

const Form = ({ submit, change, mealname }) => (
  <section className='sidebar col m3 white-text'>
    <form onSubmit={submit}>
      <input type="text" name="mealname" placeholder="Name" onChange={change} value={mealname} />
      <button className="btn">Add Meal</button>
    </form>
  </section>
);

const ViewMeals = ({ submit, change, mealname, mealId, user, meals }) => (
  <section>
    <Form
      submit={submit}
      change={change}
      mealname={mealname} />
    <section className='col m9'>
      <div className='card-wrapper row'>
        <div className="">
          {meals.map((meal, index) => {
            return (
              <MealCard
                key={index}
                user={user}
                content={meal} />
            )
          })}
        </div>
      </div>
    </section>
  </section>

);

class Meals extends Component {

  constructor(props) {
    super();
    this.state = props.data;
    //this.state.mealname = '';
    //this.state.editing = false;


    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const mealsRef = firebase.database().ref('meals');
    mealsRef.on('value', (snapshot) => {
      let meals = snapshot.val();
      let newState = [];
      for (let meal in meals) {
        newState.push({
          mealname: meals[meal].mealname,
          id: meal
        });
      }

      this.setState({
        meals: newState
      });
    });
  }

  handleChange(e) {
    console.log(e);
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const mealsRef = firebase.database().ref('meals');
    const meal = {
      mealname: this.state.mealname,
    }
    mealsRef.push(meal);
    this.setState({
      mealname: ''
    });
  }

  render() {
    return (
      <div className='main-box'>
        <div className='row'>
          <ViewMeals
            submit={this.handleSubmit}
            change={this.handleChange}
            mealname={this.state.mealname}
            mealId={this.state.mealId}
            user={this.state.user}
            meals={this.state.meals} />
        </div>
      </div>
    );
  }
}
export default Meals;

