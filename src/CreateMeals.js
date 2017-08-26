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
        console.log("routeId", this.state.router.match.params.id);
        let mealId = this.state.router.match.params.id;
        const mealRef = firebase.database().ref('meals/' + mealId);
        console.log(mealRef);
        mealRef.on('value', (snapshot) => {
            let meal = snapshot.val();
            console.log(meal);
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

            this.setState({
                foods: newState
            });
        });
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
        this.setState({
            addedFoods: foodArray
        });

    }

    removeFood = (index, mealId) => {
        let foodArray = this.state.addedFoods;
        foodArray.splice(index, 1);
        const mealref = firebase.database().ref('meals/' + mealId + '/' + 'foodArray');
        mealref.set(foodArray);
        this.setState({
            addedFoods: foodArray
        });
    }

    calculateTotals = () => {
        // let inputs = this.state.addedFoods;
        // inputs.forEach((input, index) => {
        //     let pTotal = 0;
        //     let fTotal = 0;
        //     let cTotal = 0;
        //     console.log(input.protein, input.fat, input.carbs);
        //     pTotal += parseInt(input.protein);
        //     fTotal += parseInt(input.fat);
        //     cTotal += parseInt(input.carbs);
        //     console.log(pTotal,"p");
        //     console.log(fTotal,"f");
        //     console.log(cTotal,"c");
        // });

        console.log('Test');
    }



    render() {
        if (this.state.myMeal === undefined || this.state.foods === undefined) {
            return (<p>Loading...</p>)
        }
        return (
            <div>
                {this.calculateTotals()}
                <div className="row">
                    <div className="col m4">
                        <h1>{this.state.mealName}</h1>
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
                                    mealId={this.state.id}
                                />
                            )
                        })}
                    </div>
                    <div className="col m8">
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