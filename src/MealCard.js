import React, { Component } from 'react';
import './App.css';
//import { Link } from 'react-router-dom';
import firebase from './firebase.js';

let MealEditMode = ({
    breakfast,
    location,
    handleEditClick,
    handleDeleteClick
}) => (
        <div className="card small island-card col l3 m4 s12 white-text">
            <div className="card-content">
                <span className="card-title">{breakfast}</span>
                <p className="card-content_text">{location}</p>
                <div className="card-action">
                    <a className="card-button" onClick={handleDeleteClick}>Delete</a>
                    <a className="card-button" onClick={handleEditClick}>Edit</a>
                </div>
            </div>
        </div>
    );

let MealDefaultMode = ({
    name,
    location,
    handleChange,
    handleSaveClick
}) => (
        <div className="card small island-card col l3 m3 s12 white-text">
            <div className="card-content">
                <input type="text" name="mealname" placeholder="Meal Name?" onChange={handleChange} value={name} />
                <input type="text" name="islandLocation" placeholder="Where is it?" onChange={handleChange} value={location} />
                <div className="card-action">
                    <a className="card-button" onClick={handleSaveClick}>Save</a>
                </div>
            </div>
        </div>
    );

class MealCard extends Component {

    constructor(props) {
        super();
        this.state = {
            id: props.content.id,
            cardCreator: props.content.cardCreator,
            mealname: props.content.mealname,
            islandLocation: props.content.islandLocation,
            editing: false,
            user: props.user
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    removeMeal(id) {
        const mealRef = firebase.database().ref(`/meals/${id}`);
        mealRef.remove();
    }

    toggleEdit = () => {
        this.setState({
            editing: !this.state.editing
        });
    }

    saveEdit = (name, location, id) => {
        let newMeal = {
            mealname: name,
            islandLocation: location,
            cardCreator: this.state.cardCreator
        };

        const mealRef = firebase.database().ref(`/meals/${id}`);
        mealRef.set(newMeal);
        this.setState({ newMeal });
        this.setState({ editing: false });
    }

    render() {
        return (this.state.editing === false)
            ? (
                <MealEditMode
                    name={this.state.mealname}
                    location={this.state.islandLocation}
                    handleEditClick={() => this.toggleEdit()}
                    handleDeleteClick={() => this.removeMeal(this.state.id)}
                />
            )
            : (
                <MealDefaultMode
                    name={this.state.mealname}
                    location={this.state.islandLocation}
                    handleChange={this.handleChange}
                    handleSaveClick={() => this.saveEdit(this.state.mealname, this.state.islandLocation, this.state.id)}
                />
            );
    }
}

export default MealCard;