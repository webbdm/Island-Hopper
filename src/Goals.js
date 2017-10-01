import React, { Component } from 'react';
import './App.css';
//import { Link } from 'react-router-dom';
// import { VictoryChart, VictoryBar } from 'victory';
import { Bar } from 'react-chartjs-2';
import { dayTotal } from './Calculations.js';
import firebase from './firebase.js';
import GoalBox from './GoalBox.js';

const MealItem = ({ name, total, addMeal, mealObject, mealId, meal }) => (
    <div className="goals-foods-item white-text">
        <p>{name}</p>
        <p>{total.protein}g P</p>
        <p>{total.fat}g F</p>
        <p>{total.carbs}g C</p>
        <button className="btn-floating waves-effect waves-light red" onClick={() => { addMeal(mealId, meal) }}>+</button>
    </div>
);

const AddedMealItem = ({ name, total, removeMeal, mealObject, mealId, index }) => (
    <div className="goals-foods-item white-text">
        <p>{name}</p>
        <p>{total.protein}g<br/> Protein</p>
        <p>{total.fat}g <br/> Fat</p>
        <p>{total.carbs}g <br/> Carbs</p>
        <button className="btn-floating waves-effect waves-light red" onClick={() => { removeMeal(mealId, index) }}>-</button>
    </div>
);

class Goals extends Component {

    constructor(props) {
        super(props);
        this.state = {
            meals: [],
            addedMeals: [],
            day: {},
            target: {},
            user: props.data.user
        };
    }

    componentWillMount() {
        this.getMeals();
        this.getAddedMeals();
        // this.getTarget();
    }

    componentDidMount() {
        this.getTarget();
    }

    getTarget() {
        const targetRef = firebase.database().ref('days');
        targetRef.once('value').then((snapshot) => {
            let data = snapshot.val();
            let targetData = data.day1.target;

            this.setState({
                target: targetData
            });
        });
    }

    getMeals() {
        const mealsRef = firebase.database().ref('meals');
        mealsRef.once('value').then((snapshot) => {
            let meals = snapshot.val();
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

    getAddedMeals = () => {
        const mealsRef = firebase.database().ref('addedMeals');
        mealsRef.once('value').then((snapshot) => {
            let meals = snapshot.val();

            // Handles when addedMeals is empty in Firebase
            if (meals == null) {
                meals = [{
                    mealname: "Add a Meal",
                    total: {
                        protein: 0,
                        carbs: 0,
                        fat: 0,
                    }
                }];

            }
            let newState = [];
            for (let meal in meals) {
                newState.push({
                    id: meal,
                    total: meals[meal].total,
                    mealname: meals[meal].mealname,
                });
            }

            let total = dayTotal(newState);

            this.setState({
                addedMeals: newState,
                totals: total
            });
        });
    }

    addMeal = (mealId, meal) => {
        const mealsRef = firebase.database().ref('addedMeals');
        mealsRef.push(meal);
        this.getAddedMeals();
    }

    removeMeal = (mealId, index) => {
        let addedMealsArray = this.state.addedMeals;
        addedMealsArray.splice(index, 1);
        const mealsRef = firebase.database().ref('addedMeals');
        mealsRef.set(addedMealsArray);
        this.getAddedMeals();

        this.setState({
            addedMeals: addedMealsArray
        })
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {
        if (this.state.totals === undefined || this.state.target === undefined) {
            return (<p>Loading...</p>)
        }
        return (
            <div className="goals-grid">

                <div className="goals-main">
                    <h1>GOAL</h1>
                    <GoalBox goals={this.state.target} />
                </div>

                <div className="goals-graph">
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
                        <div className="card macro-box">
                            <h1></h1>
                            <p>Total</p>
                        </div>
                    </div>
                    <div className="goals-graph-component">
                        <Bar
                            data={{
                                labels: ['Protein', 'Fat', 'Carbs', 'Total'],
                                datasets: [
                                    {
                                        backgroundColor: this.state.totals.protein >= this.state.target.protein
                                            && this.state.totals.fat >= this.state.target.fat
                                            && this.state.totals.carbs >= this.state.target.carbs ? 'green' : '#FF3134',
                                        hoverBackgroundColor: '#FF3134',
                                        hoverBorderColor: 'rgba(255,99,132,1)',
                                        data: [this.state.totals.protein, this.state.totals.fat, this.state.totals.carbs, 200]
                                    }
                                ]
                            }}
                            width={100}
                            height={300}
                            options={{
                                scales: {
                                    xAxes: [
                                        {
                                            display: false,
                                            barThickness: 150
                                        }
                                    ],
                                    yAxes: [
                                        {
                                            ticks: { min: 0, max: 300 },
                                            display: false
                                        }
                                    ]
                                },
                                legend: false,
                                maintainAspectRatio: false,
                                scaleShowGridLines: false
                            }}
                        />
                    </div>
                </div>

                <div className="goals-foods white-text">
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
                <div className="goals-foods white-text">
                    <h5>{this.state.addedMeals.map((meal, index) => {
                        return (
                            <AddedMealItem
                                key={index}
                                mealId={meal.id}
                                removeMeal={this.removeMeal}
                                index={index}
                                total={meal.total}
                                name={meal.mealname}
                                meal={meal} />
                        )
                    })}</h5>
                </div>
            </div>
        );
    }
}


export default Goals;