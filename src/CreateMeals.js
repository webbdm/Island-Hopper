import React, { Component } from 'react';
import './App.css';
import firebase from './firebase.js';
//import { Link } from 'react-router-dom';

const FoodItem = ({ name, protein, fat, carbs, addFood, foodObject, mealId }) => (
    <div>
        <p>{name}    {protein}    {fat}    {carbs} <button onClick={() => { addFood(foodObject, mealId) }}>+</button></p>

    </div>
);

const AddedFoodItem = ({ name, protein, fat, carbs, removeFood, index, mealId }) => (
    <div>
        <p>{name}    {protein}    {fat}    {carbs} <button onClick={() => { removeFood(index, mealId) }}>X</button></p>

    </div>
);

class CreateMeals extends Component {
    constructor(props) {
        super();
        this.state = {
            router: props,
            myMeal: {},
            addedFoods: []
        };
    }

    componentDidMount() {
        let mealId = this.state.router.match.params.id;
        const mealRef = firebase.database().ref('meals/' + mealId);
        let mealX;
        mealRef.on('value', (snapshot) => {
            let meal = snapshot.val();
            mealX = meal.foodArray;
            this.setState({
                addedFoods: meal.foodArray,
                mealName: meal.mealname,
                id: mealId
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

            let pTotal = 0;
            let fTotal = 0;
            let cTotal = 0;
            mealX.forEach((input, index) => {
                pTotal += parseInt(input.protein);
                fTotal += parseInt(input.fat);
                cTotal += parseInt(input.carbs);
            });

            let total = {
                protein: pTotal,
                fat: fTotal,
                carbs: cTotal
            };

            this.setState({
                foods: newState,
                totals: total
            });
        });


    }

    componentDidUpdate() {
    }

    componentWillUnmount() {
        const mealRef = firebase.database().ref('meals/' + this.state.id);
        mealRef.off('value');
    }

    addFood = (clickedFood, mealId) => {
        let foodArray = this.state.addedFoods;
        foodArray.push(clickedFood);
        const mealref = firebase.database().ref('meals/' + mealId + '/' + 'foodArray');
        mealref.set(foodArray);

        let pTotal = 0;
        let fTotal = 0;
        let cTotal = 0;
        foodArray.forEach((input, index) => {
            pTotal += parseInt(input.protein);
            fTotal += parseInt(input.fat);
            cTotal += parseInt(input.carbs);
        });

        let total = {
            protein: pTotal,
            fat: fTotal,
            carbs: cTotal
        };

        this.setState({
            totals: total,
            addedFoods: foodArray
        });
    }

    removeFood = (index, mealId) => {
        let foodArray = this.state.addedFoods;
        foodArray.splice(index, 1);
        const mealref = firebase.database().ref('meals/' + mealId + '/' + 'foodArray');
        mealref.set(foodArray);

        let pTotal = 0;
        let fTotal = 0;
        let cTotal = 0;
        foodArray.forEach((input, index) => {
            pTotal += parseInt(input.protein);
            fTotal += parseInt(input.fat);
            cTotal += parseInt(input.carbs);
        });

        let total = {
            protein: pTotal,
            fat: fTotal,
            carbs: cTotal
        };
        this.setState({
            totals: total,
            addedFoods: foodArray
        });
    }

    render() {
        if (this.state.myMeal === undefined || this.state.foods === undefined) {
            return (<p>Loading...</p>)
        }
        return (
            <div>
                <div className="row macro-wrapper">
                    <div className="">
                        <h1>{this.state.mealName}</h1>
                    </div>
                    <div className="card macro-box">
                        <h2>{this.state.totals.protein}</h2>
                        <p>Protein</p>
                    </div>
                    <div className="card macro-box">
                        <h2>{this.state.totals.fat}</h2>
                        <p>Fat</p>
                    </div>
                    <div className="card macro-box">
                        <h2>{this.state.totals.carbs}</h2>
                        <p>Carbs</p>
                    </div>
                    <div className="card macro-box">
                        <h2></h2>
                        <p>Total</p>
                    </div>
                </div>
                <div className="row food-container">
                    <div className="col m3 food-block">
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
                                    mealId={this.state.id}
                                />
                            )
                        })}
                    </div>
                    <div className="col m7 food-block">
                        <h1>Added Foods</h1>
                        {this.state.addedFoods.map((food, index) => {
                            if (this.state.addedFoods === undefined) {
                                return (
                                    <p>Add Foods</p>
                                )
                            }
                            return (
                                <AddedFoodItem
                                    name={food.foodName}
                                    protein={food.protein}
                                    fat={food.fat}
                                    carbs={food.carbs}
                                    key={index}
                                    foodObject={food}
                                    index={index}
                                    removeFood={this.removeFood}
                                    mealId={this.state.id}
                                />
                            )
                        })}
                    </div>
                </div>
            </div>

        );
    }
}
export default CreateMeals;