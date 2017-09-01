import React, { Component } from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import firebase from './firebase.js';

let MealEditMode = ({
    name,
    id,
    location,
    handleEditClick,
    handleDeleteClick
}) => (
        <div className="card small island-card col l3 m4 s12 white-text">
            <div className="card-content">
                <span className="card-title"><Link to={"meals/" + id}>{name}</Link></span>
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
    cancel,
    id,
    location,
    handleChange,
    handleSaveClick
}) => (
        <div className="card small island-card col l3 m3 s12 white-text">
            <div className="card-content">
                <input type="text" name="mealname" placeholder="Meal Name?" onChange={handleChange} value={name} />
                <div className="card-action">
                    <a className="card-button" onClick={handleSaveClick}>Save</a>
                    <a className="card-button" onClick={cancel}>Cancel</a>
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
        console.log(id)
        const thisMealRef = firebase.database().ref(`/meals/${id}`);
        console.log("meal ref", thisMealRef, id);
        thisMealRef.remove();
    }

    toggleEdit = () => {
        this.setState({
            editing: !this.state.editing
        });
    }

    saveEdit = (name, id) => {
        const mealRef = firebase.database().ref('meals/' + id + '/' + 'mealname');
        mealRef.set(name);
        this.setState({ mealname: name });
        this.setState({ editing: false });
    }

    cancel = () => {
        this.setState({ editing: false });
    }

    render() {
        return (this.state.editing === false)
            ? (
                <MealEditMode
                    name={this.state.mealname}
                    id={this.state.id}
                    handleEditClick={() => this.toggleEdit()}
                    handleDeleteClick={() => this.removeMeal(this.state.id)}
                />
            )
            : (
                <MealDefaultMode
                    name={this.state.mealname}
                    id={this.state.id}
                    handleChange={this.handleChange}
                    handleSaveClick={() => this.saveEdit(this.state.mealname, this.state.id)}
                    cancel={this.cancel}
                />
            );
    }
}

export default MealCard;