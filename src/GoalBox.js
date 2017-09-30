import React, { Component } from 'react';
import './App.css';
//import { Link } from 'react-router-dom';
import firebase from './firebase.js';

let GoalEditMode = ({
    protein,
    fat,
    carbs,
    handleEditClick,
    handleDeleteClick
}) => (
        <div className="white-text">
            <div className="">
            </div>
        </div>
    );

let GoalDefaultMode = ({
    protein,
    fat,
    carbs,
    handleChange,
    handleSaveClick,
    cancel
}) => (
        <div className="white-text">
            <div className="">
            </div>
        </div>
    );

class GoalBox extends Component {

    constructor(props) {
        super();
        this.state = {
            protein: props.protein,
            fat: props.fat,
            carbs: props.carbs,
            editing: false
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    // removeFood(id) {
    //     const foodRef = firebase.database().ref(`/foods/${id}`);
    //     foodRef.remove();
    // }

    toggleEdit = () => {
        this.setState({
            editing: !this.state.editing
        });
    }

    saveEdit = (name, protein, fat, carbs, id) => {
        let newGoal = {
            protein: protein,
            fat: fat,
            carbs: carbs,
        };

        console.log(newGoal);

        // const foodRef = firebase.database().ref(`/foods/${id}`);
        // foodRef.set(newGoal);
        // this.setState({ newGoal });
        this.setState({ editing: false });
    }

    cancel = () => {
        this.setState({ editing: false });
    }

    render() {
        return (this.state.editing === false)
            ? (
                <GoalEditMode
                    protein={this.state.protein}
                    fat={this.state.fat}
                    carbs={this.state.carbs}
                    handleEditClick={() => this.toggleEdit()}
                    handleDeleteClick={() => this.removeFood(this.state.id)}
                />
            )
            : (
                <GoalDefaultMode
                    protein={this.state.protein}
                    fat={this.state.fat}
                    carbs={this.state.carbs}
                    handleChange={this.handleChange}
                    handleSaveClick={() => this.saveEdit(this.state.foodName, this.state.protein, this.state.fat, this.state.carbs, this.state.id)}
                    cancel={this.cancel}
                />
            );
    }
}

export default GoalBox;