import React, { Component } from 'react';
import './App.css';
//import { Route, Link } from 'react-router-dom';
import firebase from './firebase.js';

// Components
//import MealCard from './MealCard.js';

const Form = ({ submit, change, dayName }) => (
  <section className='sidebar col m3 white-text'>
    <form onSubmit={submit}>
      <input type="text" name="mealname" placeholder="Name" onChange={change} value={dayName} />
      <button className="btn">Add Day</button>
    </form>
  </section>
);

const ViewDays = ({ submit, change, dayName, dayId, user, dayss }) => (
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
    const daysRef = firebase.database().ref('days');
    daysRef.on('value', (snapshot) => {
      let days = snapshot.val();
      let newState = [];
      for (let day in days) {
        newState.push({
          dayName: days[day].dayName,
          id: day
        });
      }

      this.setState({
        days: newState
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
    const daysRef = firebase.database().ref('days');
    const day = {
      dayName: this.state.dayname,
      foodArray: ['']
    }
    daysRef.push(day);
    console.log(day)
    this.setState({
      dayName: ''
    });
  }

  render() {
    return (
      <div className='main-box'>
        <div className='row'>
          <ViewDays
            submit={this.handleSubmit}
            change={this.handleChange}
            dayName={this.state.dayName}
            dayId={this.state.dayId}
            user={this.state.user}
            days={this.state.days} />
        </div>
      </div>
    );
  }
}
export default Days;
