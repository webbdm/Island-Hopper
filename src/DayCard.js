import React, { Component } from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import firebase from './firebase.js';

let DayEditMode = ({
    name,
    id,
    location,
    handleEditClick,
    handleDeleteClick
}) => (
        <div className="card small island-card col l3 m4 s12 white-text">
            <div className="card-content">
                <span className="card-title"><Link to={"days/" + id}>{name}</Link></span>
                <p className="card-content_text">{location}</p>
                <div className="card-action">
                    <a className="card-button" onClick={handleDeleteClick}>Delete</a>
                    <a className="card-button" onClick={handleEditClick}>Edit</a>
                </div>
            </div>
        </div>
    );

let DayDefaultMode = ({
    name,
    cancel,
    id,
    location,
    handleChange,
    handleSaveClick
}) => (
        <div className="card small island-card col l3 m3 s12 white-text">
            <div className="card-content">
                <input type="text" name="dayName" placeholder="Day Name?" onChange={handleChange} value={name} />
                <div className="card-action">
                    <a className="card-button" onClick={handleSaveClick}>Save</a>
                    <a className="card-button" onClick={cancel}>Cancel</a>
                </div>
            </div>
        </div>
    );

class DayCard extends Component {

    constructor(props) {
        super();
        this.state = {
            id: props.content.id,
            cardCreator: props.content.cardCreator,
            dayName: props.content.dayName,
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
        const thisdayRef = firebase.database().ref(`/days/${id}`);
        console.log("day ref", thisdayRef, id);
        thisdayRef.remove();
    }

    toggleEdit = () => {
        this.setState({
            editing: !this.state.editing
        });
    }

    saveEdit = (name, id) => {
        const dayRef = firebase.database().ref('days/' + id + '/' + 'dayName');
        dayRef.set(name);
        this.setState({ dayName: name });
        this.setState({ editing: false });
    }

    cancel = () => {
        this.setState({ editing: false });
    }

    render() {
        return (this.state.editing === false)
            ? (
                <DayEditMode
                    name={this.state.dayName}
                    id={this.state.id}
                    handleEditClick={() => this.toggleEdit()}
                    handleDeleteClick={() => this.removeMeal(this.state.id)}
                />
            )
            : (
                <DayDefaultMode
                    name={this.state.dayName}
                    id={this.state.id}
                    handleChange={this.handleChange}
                    handleSaveClick={() => this.saveEdit(this.state.dayName, this.state.id)}
                    cancel={this.cancel}
                />
            );
    }
}

export default DayCard;