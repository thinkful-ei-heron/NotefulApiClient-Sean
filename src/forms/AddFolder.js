import React, { Component } from 'react';
import { API_URL, API_KEY }from '../config';
import PropTypes from 'prop-types';

export default class AddFolder extends Component {
    
    state = {
        name: null,
        touched: false
    }

    validateName(){
        if(!this.state.name){
            return ("Folder must have a name");
        }
    }

    updateFolderName(name) {
        name=name.trim();
        this.setState({ name: name })
    }

    handleSubmit = event => {
        event.preventDefault();
        let name = {name: this.state.name};

        fetch(API_URL + '/api/folders', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`

            },
            body: JSON.stringify(name)
        })
            //.then(res => res.json())
            .then(data => {
                this.props.renderFolder();
                this.props.history.push('/');
            })
    }

    render() {
        return (
            <form className="add-folder-form" onSubmit={(e) => this.handleSubmit(e)}>
                <label htmlFor="add-folder">
                    <p className="error">{this.validateName()}</p> 
                    <input type="text" id="add-folder" placeholder="new folder name" onChange={(e) => this.updateFolderName(e.target.value)} 
                    required minLength='3' maxLength='10'/>
                </label>
                <button type="submit" className="add-folder-submit" >Add folder</button>
            </form>
        )
    }
}

AddFolder.propTypes = {
    renderFolder: PropTypes.func,
    history: PropTypes.object,
}