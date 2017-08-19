import React, { Component } from 'react';
import './App.css';
import firebase from './firebase.js';
//import { Link } from 'react-router-dom';

const foodItem = ({name,protein,fat,carbs}) =>{
    <div>
        <p>{name}</p>
        <p>{protein}</p>
        <p>{fat}</p>
        <p>{carbs}</p>
    </div>
};

class CreateMeals extends Component {

    constructor(props) {
        super();
        this.state = props;
    }

    componentDidMount() {
        let mealId = this.state.match.params.id;
        const mealRef = firebase.database().ref('meals/' + mealId);
        mealRef.on('value', (snapshot) => {
            let meal = snapshot.val();
            this.setState({
                myMeal: {
                    myName: meal.mealname,
                    id: mealId
                }
            });
        });

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

    render() {
        if (this.state.myMeal === undefined || this.state.foods === undefined) {
            return (<p>Loading...</p>)
        }
        return (
            <div>
                <div className="row">
                    <div className="col m4">
                        <h1>{this.state.myMeal.myName}</h1>
                    </div>
                    <div className="col m2">
                        <p>Protein</p>
                    </div>
                    <div className="col m2">
                        <p>Fat</p>
                    </div>
                    <div className="col m2">
                        <p>Carbs</p>
                    </div>
                    <div className="col m2">
                        <p>Total</p>
                    </div>
                </div>
                <div className="row">
                    <h1>Choose Foods</h1>
                    {console.log(this.state.foods)}
                </div>
            </div>

        );
    }
}
export default CreateMeals;