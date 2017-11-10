import React, { Component } from 'react';
import './App.css';
import firebase from './firebase.js';
import { Modal, Button } from 'react-materialize';
//import { Link } from 'react-router-dom';

const FoodItem = ({ name, protein, fat, carbs, addFood, foodObject, mealId }) => (
    <tr className="">
        <td>{name}</td>
        <td>{protein}g</td>
        <td>{fat}g</td>
        <td>{carbs}g</td>
        <td><button onClick={() => { addFood(foodObject, mealId) }}>+</button></td>
    </tr>
);

const AddedFoodItem = ({ name, protein, fat, carbs, removeFood, index, mealId }) => (
    <tr className="">
        <td>{name}</td>
        <td>{protein}</td>
        <td>{fat}g</td>
        <td>{carbs}g</td>
        <td><button onClick={() => { removeFood(index, mealId) }}>X</button></td>
    </tr>
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
                    foodName: foods[food].foodName
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
        const totalref = firebase.database().ref('meals/' + mealId + '/' + 'total');
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

        totalref.set(total);

        this.setState({
            totals: total,
            addedFoods: foodArray
        });
    }

    removeFood = (index, mealId) => {
        let foodArray = this.state.addedFoods;
        foodArray.splice(index, 1);
        const mealref = firebase.database().ref('meals/' + mealId + '/' + 'foodArray');
        const totalref = firebase.database().ref('meals/' + mealId + '/' + 'total');
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

        totalref.set(total);

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
            <div className="create-meals-wrapper">
                <div className="meal-name">
                    <h1>{this.state.mealName}</h1>
                </div>
                <div className="macro-wrapper">
                    <div className="card macro-box">
                        <h1>{this.state.totals.protein}</h1>
                        <p>Protein</p>
                    </div>
                    <div className="card macro-box">
                        <h1>{this.state.totals.fat}</h1>
                        <p>Fat</p>
                    </div>
                    <div className="card macro-box">
                        <h1>{this.state.totals.carbs}</h1>
                        <p>Carbs</p>
                    </div>
                    {/* <div className="card macro-box">
                        <h1></h1>
                        <p>Total</p>
                    </div> */}
                </div>
                <div className="food-container">
                    <div className="food-block">
                        <table className="centered">
                            <thead>
                                <tr>
                                    <th>Food</th>
                                    <th>Protein</th>
                                    <th>Fat</th>
                                    <th>Carbs</th>
                                </tr>
                            </thead>
                            <tbody>
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
                            </tbody>
                        </table>
                        <div className="center-align">
                            <Modal
                                header={`Add Foods to ${this.state.mealName}`}
                                trigger={<button className="btn modal-trigger">Add Foods to {this.state.mealName}</button>}>
                                <div className="food-block">
                                    <table className="centered">
                                        <thead>
                                            <tr>
                                                <th>Food</th>
                                                <th>Protein</th>
                                                <th>Fat</th>
                                                <th>Carbs</th>
                                            </tr>
                                        </thead>
                                        <tbody>
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
                                        </tbody>
                                    </table>
                                </div>
                            </Modal>
                        </div>
                    </div>
                </div>
            </div >

        );
    }
}
export default CreateMeals;