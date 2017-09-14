import React, { Component } from 'react';
import './App.css';
//import { Link } from 'react-router-dom';
import firebase from './firebase.js';


const FoodItem = ({ name }) => (
    <div className="white-text">
        <p>{name}</p>
    </div>
);

class Goals extends Component {

    constructor(props) {
        super();
        this.state = {
            state: "state",
            foods: [],
            day: {},
            user: props.data.user
        };
    }

    componentWillMount() {
        this.getFoods();
        this.getAddedFoods();
        console.log(this.state);
    }

    getFoods() {
        const foodsRef = firebase.database().ref('foods');
        foodsRef.once('value').then((snapshot) => {
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

    getAddedFoods() {
        console.log("Get Added Foods");
    }

    render() {
        return (
            <div className="white-text">
                <p>Goals</p>

                <div>
                    <h3>{this.state.foods.map((food, index) => {
                        return (
                            <FoodItem
                                key={index}
                                name={food.foodName} />
                        )
                    })}</h3>
                </div>
            </div>
        );
    }
}


export default Goals;