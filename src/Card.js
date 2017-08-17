import React, { Component } from 'react';
import './App.css';
//import { Link } from 'react-router-dom';
import firebase from './firebase.js';

let EditMode = ({
    name,
    protein,
    fat,
    fiber,
    handleEditClick,
    handleDeleteClick
}) => (
        <div className="card small island-card col l3 m4 s12 white-text">
            <div className="card-content">
                <span className="card-title">{name}</span>
                <p className="card-content_text">Protein: {protein}g</p>
                <p className="card-content_text">Fat: {fat}g</p>
                <p className="card-content_text">Fiber: {fiber}g</p>
                <div className="card-action">
                    <a className="card-button" onClick={handleDeleteClick}>Delete</a>
                    <a className="card-button" onClick={handleEditClick}>Edit</a>
                </div>
            </div>
        </div>
    );

let DefaultMode = ({
    name,
    protein,
    fat,
    fiber,
    handleChange,
    handleSaveClick
}) => (
        <div className="card small island-card col l3 m3 s12 white-text">
            <div className="card-content">
                <input type="text" name="foodName" placeholder="What's the food name?" onChange={handleChange} value={name} />
                <input type="text" name="protein" placeholder="Protein Amount?" onChange={handleChange} value={protein} />
                <input type="text" name="fat" placeholder="Fat Amount?" onChange={handleChange} value={fat} />
                <input type="text" name="fiber" placeholder="Fiber Amount?" onChange={handleChange} value={fiber} />
                <div className="card-action">
                    <a className="card-button" onClick={handleSaveClick}>Save</a>
                </div>
            </div>
        </div>
    );

class Card extends Component {

    constructor(props) {
        super();
        this.state = {
            id: props.content.id,
            cardCreator: props.content.cardCreator,
            foodName: props.content.foodName,
            protein: props.content.protein,
            fat: props.content.fat,
            fiber: props.content.fiber,
            editing: false,
            user: props.user
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    removeFood(id) {
        const foodRef = firebase.database().ref(`/foods/${id}`);
        foodRef.remove();
    }

    toggleEdit = () => {
        this.setState({
            editing: !this.state.editing
        });
    }

    saveEdit = (name, protein, fat, fiber, id) => {
        let newIsland = {
            foodName: name,
            protein: protein,
            fat: fat,
            fiber: fiber,
            cardCreator: this.state.cardCreator
        };

        const foodRef = firebase.database().ref(`/foods/${id}`);
        foodRef.set(newIsland);
        this.setState({ newIsland });
        this.setState({ editing: false });
    }

    render() {
        return (this.state.editing === false)
            ? (
                <EditMode
                    name={this.state.foodName}
                    protein={this.state.protein}
                    fat={this.state.fat}
                    fiber={this.state.fiber}
                    handleEditClick={() => this.toggleEdit()}
                    handleDeleteClick={() => this.removeFood(this.state.id)}
                />
            )
            : (
                <DefaultMode
                    name={this.state.foodName}
                    protein={this.state.protein}
                    fat={this.state.fat}
                    fiber={this.state.fiber}
                    handleChange={this.handleChange}
                    handleSaveClick={() => this.saveEdit(this.state.foodName, this.state.protein, this.state.fat, this.state.fiber, this.state.id)}
                />
            );
    }
}

export default Card;