import React, { Component } from 'react';
import './App.css';
//import { Link } from 'react-router-dom';
import firebase from './firebase.js';

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
        if (this.state.editing === false) {
            return (
                <li>
                    <h3>{this.state.islandname}</h3>
                    <h4>{this.state.islandLocation}</h4>
                    <p>Added by {this.state.cardCreator}</p>
                    {this.state.cardCreator === this.state.user.displayName ?
                        <div className="card">
                            <button className="card-button" onClick={() => this.removeIsland(this.state.id)}>Delete</button>
                            <button className="card-button" onClick={() => this.toggleEdit()}>Edit</button>
                        </div> : null}
                </li>
            );
        } else {
            return (
                <li>
                    <h3><input type="text" name="islandname" placeholder="What's the island name?" onChange={this.handleChange} value={this.state.islandname} /></h3>
                    <h4><input type="text" name="islandLocation" placeholder="Where is it?" onChange={this.handleChange} value={this.state.islandLocation} /></h4>
                    <button className="card-button" onClick={() => this.saveEdit(this.state.islandname, this.state.islandLocation, this.state.id)}>Save</button>
                </li>
            );
        }
    }
}

export default Card;