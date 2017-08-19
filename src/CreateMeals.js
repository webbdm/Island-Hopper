import React, { Component } from 'react';
import './App.css';
import firebase from './firebase.js';
//import { Link } from 'react-router-dom';

const FoodItem = ({ name, protein, fat, carbs, addFood, foodObject }) => (
    <div>
        <p>{name}    {protein}    {fat}    {carbs} <button onClick={()=>{addFood(foodObject)}}>+</button></p>

    </div>
);

class CreateMeals extends Component {

    constructor(props) {
        super();
        this.state = {
            router: props,
            myMeal: {
                addedFoods: []
            }
        };

    }

    componentDidMount() {
        let mealId = this.state.router.match.params.id;
        const mealRef = firebase.database().ref('meals/' + mealId);
        mealRef.on('value', (snapshot) => {
            let meal = snapshot.val();
            this.setState({
                myMeal: {
                    myName: meal.mealname,
                    id: mealId,
                    addedFoods: []
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

    addFood = (clickedFood) => {
        let newArray = this.state.myMeal.addedFoods;
        newArray.push(clickedFood);
        console.log(newArray);
        // this.setState({
        //     myMeal: 
        // });
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
                    <div className="col m4">
                        <h1>Choose Foods</h1>
                        {this.state.foods.map((food, index) => {
                            return (
                                <FoodItem
                                    name={food.foodName}
                                    protein={food.protein}
                                    fat={food.fat}
                                    carbs={food.carbs}
                                    key={index}
                                    addFood={this.addFood}
                                    foodObject={food}
                                />
                            )
                        })}
                    </div>
                    <div className="col m8">
                        <p>Added Foods</p>
                    </div>
                </div>
            </div>

        );
    }
}
export default CreateMeals;