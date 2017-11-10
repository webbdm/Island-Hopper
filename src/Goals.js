import React, { Component } from 'react';
import './App.css';
//import { Link } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';

import firebase, {
    getTarget,
    getAddedMeals,
    getMeals,
    updateAddedMeals
} from './firebase.js';
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
        <p>{total.protein}g<br /> Protein</p>
        <p>{total.fat}g <br /> Fat</p>
        <p>{total.carbs}g <br /> Carbs</p>
        <button className="btn-floating waves-effect waves-light red" onClick={() => { removeMeal(mealId, index) }}>-</button>
    </div>
);

let toMeal = (handlers) => (meal, index) => (
    <MealItem
        key={meal.id}
        mealId={meal.id}
        addMeal={handlers.addMeal}
        total={meal.total}
        name={meal.mealname}
        meal={meal} />
);

let toAddedMeal = (handlers) => (meal, index) => (
    <AddedMealItem
        key={index}
        mealId={meal.id}
        removeMeal={handlers.removeMeal}
        index={index}
        total={meal.total}
        name={meal.mealname}
        meal={meal} />
);

let getBarData = ({ totals, target }) => ({
    labels: ['Protein', 'Fat', 'Carbs'],
    datasets: [{
        backgroundColor: totals.protein >= target.protein
            && totals.fat >= target.fat
            && totals.carbs >= target.carbs ? 'green' : '#FF3134',
        hoverBackgroundColor: '#FF3134',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: [totals.protein, totals.fat, totals.carbs]
    }]
});

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
        getMeals(this.setState.bind(this));
        getAddedMeals(this.setState.bind(this));
    }

    componentDidMount() {
        getTarget((target) => this.setState({ target }));
    }

    addMeal = (mealId, meal) => {
        const mealsRef = firebase.database().ref('addedMeals');
        mealsRef.push(meal);
        getAddedMeals(this.setState.bind(this));
    }

    removeMeal = (mealId, index) => {
        let addedMealsArray = this.state.addedMeals;
        addedMealsArray.splice(index, 1);
        updateAddedMeals(addedMealsArray);
        getAddedMeals(this.setState.bind(this));

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
        return (this.state.totals === undefined || this.state.target === undefined)
            ? (<p>Loading...</p>)
            : (
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
                            {/* <div className="card macro-box">
                                <h1></h1>
                                <p>Total</p>
                            </div> */}
                        </div>
                        <div className="goals-graph-component">
                            <Bar
                                data={getBarData(this.state)}
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
                        <h5>{this.state.meals.map(toMeal({ addMeal: this.addMeal }))}</h5>
                    </div>
                    <div className="goals-foods white-text">
                        <h5>{this.state.addedMeals.map(toAddedMeal({ removeMeal: this.removeMeal }))}</h5>
                    </div>
                </div>
            );
    }
}


export default Goals;