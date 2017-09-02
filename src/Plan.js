import React, { Component } from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import firebase from './firebase.js';

const MealItem = ({addmeal,meal,mealObject,mealId,total}) => (
    <div className="food-item">
        <p>{mealObject.mealName}</p>
        <p>protein {total.protein}</p>
        <p>fat {total.fat}</p>
        <p>carbs {total.carbs}</p>
        <button onClick={() => {addmeal(mealObject,mealId)}}>+</button>
    </div>
);

const AddedMealItem = () => (
    <div className="food-item">
        <p>name</p>
        <p>protein g P</p>
        <p>fat g F</p>
        <p> carbs g C</p>
        <button onClick={() => { console.log("Remove Meal")}}>X</button>
    </div>
);

class Plan extends Component {
    constructor(props) {
        super();
        this.state = {
            router: props,
            addedMeals: []
        };
    }

    componentDidMount() {
        //let dayId = this.state.router.match.params.id;
        const dayRef = firebase.database().ref('day');
        //let dayX;
        dayRef.on('value', (snapshot) => {
            let day = snapshot.val();
            console.log(day);
            //dayX = day.foodArray;
            this.setState({
                dayName: "Day",
                dayTotal: {}
            });


        });


        const mealsRef = firebase.database().ref('meals');
        mealsRef.on('value', (snapshot) => {
            let meals = snapshot.val();
            let newState = [];
            for (let meal in meals) {
                newState.push({
                    id: meal,
                    // protein: meals[meal].protein,
                    // fat: meals[meal].fat,
                    // carbs: meals[meal].carbs,
                    total: meals[meal].total,
                    mealName: meals[meal].mealname,
                    cardCreator: meals[meal].cardCreator
                });
            }

            // let pTotal = 0;
            // let fTotal = 0;
            // let cTotal = 0;
            // dayX.forEach((input, index) => {
            //     pTotal += parseInt(input.protein);
            //     fTotal += parseInt(input.fat);
            //     cTotal += parseInt(input.carbs);
            // });

            // let total = {
            //     protein: pTotal,
            //     fat: fTotal,
            //     carbs: cTotal
            // };

            this.setState({
                meals: newState
                // totals: total
            });
        });


    }

    componentDidUpdate() {
    }

    componentWillUnmount() {
        // const dayRef = firebase.database().ref('day');
        // mealRef.off('value');
    }

    addMeal = (clickedMeal, mealId) => {
        // console.log(clickedMeal, mealId);
        // console.log(this.state);
        // let foodArray = this.state.addedMeals;
        // foodArray.push(clickedMeal);
        //const mealref = firebase.database().ref('meals/' + mealId + '/' + 'foodArray');
        //mealref.set(foodArray);

        // let pTotal = 0;
        // let fTotal = 0;
        // let cTotal = 0;
        // foodArray.forEach((input, index) => {
        //     pTotal += parseInt(input.protein);
        //     fTotal += parseInt(input.fat);
        //     cTotal += parseInt(input.carbs);
        // });

        // let total = {
        //     protein: pTotal,
        //     fat: fTotal,
        //     carbs: cTotal
        // };

        this.setState({
            // totals: total,
            // addedMeals: foodArray
        });
    }

    removeMeal = (index, mealId) => {
        let foodArray = this.state.addedMeals;
        foodArray.splice(index, 1);
        //const mealref = firebase.database().ref('meals/' + mealId + '/' + 'foodArray');
        //mealref.set(foodArray);

        // let pTotal = 0;
        // let fTotal = 0;
        // let cTotal = 0;
        // foodArray.forEach((input, index) => {
        //     pTotal += parseInt(input.protein);
        //     fTotal += parseInt(input.fat);
        //     cTotal += parseInt(input.carbs);
        // });

        // let total = {
        //     protein: pTotal,
        //     fat: fTotal,
        //     carbs: cTotal
        // };

        this.setState({
            // totals: total,
            addedMeals: foodArray
        });
    }

    render() {
        if (this.state === undefined || this.state.meals === undefined) {
            return (<p>Loading...</p>)
        }
        return (
            <div className="row">
                <div className="col md 4">
                {console.log(this.state)}
                    <div className="row">
                        <h1>{this.state.dayName}</h1>
                    </div>
                    <div className="row">
                        <h1>Meals</h1>
                        {this.state.meals.map((meal, index) => {
                            return (
                                <MealItem
                                    name={meal.mealName}
                                    protein={meal.protein}
                                    fat={meal.fat}
                                    carbs={meal.carbs}
                                    key={index}
                                    addmeal={this.addMeal}
                                    mealObject={meal}
                                    mealId={meal.id}
                                    total={meal.total}
                                />
                            )
                        })}
                    </div>
                </div>

                <div className="col md 8">
                    <div className="row macro-wrapper">
                        <div className="card macro-box">
                        </div>
                        <div className="card macro-box">
                        </div>
                        <div className="card macro-box">
                        </div>
                        <div className="card macro-box">
                        </div>
                    </div>
                    <div className="row">
                        <h1>Added Meals</h1>
                        {this.state.addedMeals}
                    </div>
                </div>
            </div>

        );
    }
}

export default Plan;