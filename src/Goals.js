import React, { Component } from 'react';
import './App.css';
//import { Link } from 'react-router-dom';
import firebase from './firebase.js';

const MealItem = ({ name, total, addMeal, mealObject, mealId, meal }) => (
    <div className="food-item white-text">
        <p>{name}</p>
        <p>{total.protein}g P</p>
        <p>{total.fat}g F</p>
        <p>{total.carbs}g C</p>
        <button onClick={() => { addMeal(mealId, meal) }}>+</button>
    </div>
);

const AddedMealItem = ({ name, total, addMeal, mealObject, mealId }) => (
    <div className="food-item white-text">
        <p>{name}</p>
        <p>{total.protein}g P</p>
        <p>{total.fat}g F</p>
        <p>{total.carbs}g C</p>
        <button onClick={() => { addMeal() }}>+</button>
    </div>
);

class Goals extends Component {

    constructor(props) {
        super();
        this.state = {
            state: "state",
            meals: [],
            day: {},
            user: props.data.user
        };
    }

    componentWillMount() {
        this.getMeals();
        this.getAddedMeals();
        console.log(this.state);
    }

    getMeals() {
        const mealsRef = firebase.database().ref('meals');
        mealsRef.once('value').then((snapshot) => {
            let meals = snapshot.val();
            console.log(meals);
            let newState = [];
            for (let meal in meals) {
                newState.push({
                    id: meal,
                    total: meals[meal].total,
                    mealname: meals[meal].mealname,
                });
            }

            this.setState({
                meals: newState
            });
        });
    }

    getAddedMeals() {
        //console.log("Get Added Foods");
    }

    addMeal(mealId, meal) {
        console.log("add", mealId, meal);
    }

    removeMeal() {
        //console.log("remove");
    }

    render() {
        return (
            <div className="white-text">
                <div className="food-block">
                    <h5>{this.state.meals.map((meal, index) => {
                        return (
                            <MealItem
                                key={index}
                                mealId={meal.id}
                                addMeal={this.addMeal}
                                total={meal.total}
                                name={meal.mealname}
                                meal={meal} />
                        )
                    })}</h5>
                </div>
                <div className="food-block">
                </div>
            </div>
        );
    }
}


export default Goals;