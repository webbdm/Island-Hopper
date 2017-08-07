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
                <input type="text" name="islandname" placeholder="What's the island name?" onChange={handleChange} value={name} />
                <input type="text" name="islandLocation" placeholder="Where is it?" onChange={handleChange} value={location} />
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
            islandname: props.content.islandname,
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

    removeIsland(id) {
        const islandRef = firebase.database().ref(`/islands/${id}`);
        islandRef.remove();
    }

    toggleEdit = () => {
        this.setState({
            editing: !this.state.editing
        });
    }

    saveEdit = (name, location, id) => {
        let newIsland = {
            islandname: name,
            islandLocation: location,
            cardCreator: this.state.cardCreator
        };

        const islandRef = firebase.database().ref(`/islands/${id}`);
        islandRef.set(newIsland);
        this.setState({ newIsland });
        this.setState({ editing: false });
    }

    render() {
        return (this.state.editing === false)
            ? (
                <EditMode
                    name={this.state.islandname}
                    location={this.state.islandLocation}
                    handleEditClick={() => this.toggleEdit()}
                    handleDeleteClick={() => this.removeIsland(this.state.id)}
                />
            )
            : (
                <DefaultMode
                    name={this.state.islandname}
                    location={this.state.islandLocation}
                    handleChange={this.handleChange}
                    handleSaveClick={() => this.saveEdit(this.state.islandname, this.state.islandLocation, this.state.id)}
                />
            );
    }
}

export default Card;