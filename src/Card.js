import React, { Component } from 'react';
import './App.css';
//import { Link } from 'react-router-dom';
import firebase from './firebase.js';

let EditMode = ({
    name,
    location,
    handleEditClick,
    handleDeleteClick
}) => (
        <div className="card small island-card col l3 m4 s12 white-text">
            <div className="card-content">
                <span className="card-title">{name}</span>
                <p className="card-content_text">{location}</p>
                <div className="card-action">
                    <a className="card-button" onClick={handleDeleteClick}>Delete</a>
                    <a className="card-button" onClick={handleEditClick}>Edit</a>
                </div>
            </div>
        </div>
    );

let DefaultMode = ({
    name,
    location,
    handleChange,
    handleSaveClick
}) => (
        <div className="card small island-card col l3 m3 s12 white-text">
            <div className="card-content">
                <input type="text" name="foodName" placeholder="What's the food name?" onChange={handleChange} value={name} />
                <input type="text" name="total" placeholder="What is the total?" onChange={handleChange} value={location} />
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
            total: props.content.total,
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

    saveEdit = (name, location, id) => {
        let newIsland = {
            foodName: name,
            total: location,
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
                    location={this.state.total}
                    handleEditClick={() => this.toggleEdit()}
                    handleDeleteClick={() => this.removeFood(this.state.id)}
                />
            )
            : (
                <DefaultMode
                    name={this.state.foodName}
                    location={this.state.total}
                    handleChange={this.handleChange}
                    handleSaveClick={() => this.saveEdit(this.state.foodName, this.state.total, this.state.id)}
                />
            );
    }
}

export default Card;