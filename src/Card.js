import React, { Component } from 'react';
import './App.css';
//import { Link } from 'react-router-dom';
import firebase, { auth, provider } from './firebase.js';

class Card extends Component {

    constructor(props) {
        super();
        this.state = {
            content: props.content,
            editing: false,
            user: props.user
        }

        // this.handleChange = this.handleChange.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
    }

    removeIsland(islandId) {
        const islandRef = firebase.database().ref(`/islands/${islandId}`);
        islandRef.remove();
    }

    editIsland = (island) => {
        this.setState({
            editing: true
        });
        console.log(this.state.editing, island);
    }

    render() {
        return (
            <li>
                <h3>{this.state.content.islandname}</h3>
                <h4>{this.state.content.islandLocation}</h4>
                <p>Added by {this.state.content.cardCreator}</p>
                {this.state.content.cardCreator === this.state.user.displayName ?
                    <div className="card">
                        <button className="card-button" onClick={() => this.removeIsland(this.state.content.id)}>Delete</button>
                        <button className="card-button" onClick={() => this.editIsland(this.state.content)}>Edit</button>
                    </div> : null}
            </li>
        );
    }
}

export default Card;