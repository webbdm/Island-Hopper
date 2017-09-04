import React, { Component } from 'react';
import './App.css';
//import { Route, Link } from 'react-router-dom';
import firebase from './firebase.js';

// Components
import DayCard from './DayCard.js';

const Form = ({ submit, change, dayName }) => (
  <section className='sidebar col m3 white-text'>
    <form onSubmit={submit}>
      <input type="text" name="dayName" placeholder="Name" onChange={change} value={dayName} />
      <button className="btn">Add Day</button>
    </form>
  </section>
);

const ViewDays = ({ submit, change, dayName, dayId, user, days }) => (
  <section>
    <Form
      submit={submit}
      change={change}
      dayName={dayName} />
    <section className='col m9'>
      <div className='card-wrapper row'>
        <div className="">
          {console.log(days)}
          {days.map((day, index) => {
            return (
              <DayCard
                key={index}
                user={user}
                content={day} />
            )
          })}
        </div>
      </div>
    </section>
  </section>

);

class Days extends Component {

  constructor(props) {
    super();
    this.state = props;
    //this.state.dayName = '';
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
          mealsArray: days[day].mealsArray,
          id: day
        });
      }

      this.setState({
        days: newState
      });

      console.log(this.state);
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
    console.log(this.state);
    const day = {
      dayName: this.state.dayName,
      mealsArray: ['']
    }
    daysRef.push(day);
    console.log(day)
    this.setState({
      dayName: ''
    });
  }

  render() {
    if (this.state.days === undefined) {
      return (<p>Loading...</p>)
    }
    return (
      <div className='main-box'>
        <div className='row'>
          {console.log(this.state.days)}
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