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
                <div className="card island-card col l3 m4 s12 white-text">
                    <span className="card-title">{this.state.islandname}</span>
                    <h5>{this.state.islandLocation}</h5>
                    <div className="card-action">
                     <span>Added by {this.state.cardCreator}</span>
                    </div>
                    {this.state.cardCreator === this.state.user.displayName ?
                        <div className="card-action">
                            <a className="card-button" onClick={() => this.removeIsland(this.state.id)}>Delete</a>
                            <a className="card-button" onClick={() => this.toggleEdit()}>Edit</a>
                        </div> : null}
                </div>
            );
        } else {
            return (
                <div className="card island-card col l3 m3 s12 white-text">
                    <h3><input type="text" name="islandname" placeholder="What's the island name?" onChange={this.handleChange} value={this.state.islandname} /></h3>
                    <h4><input type="text" name="islandLocation" placeholder="Where is it?" onChange={this.handleChange} value={this.state.islandLocation} /></h4>
                    <button className="btn" onClick={() => this.saveEdit(this.state.islandname, this.state.islandLocation, this.state.id)}>Save</button>
                </div>
            );
        }
    }
}

export default Card;