import React, {Component} from 'react';
import PropTypes from 'prop-types';
import config from '../config'

export default class AddNote extends Component {

    state = {
        name:'',
        folderId:'',
        content:'',
    };

    validateName(){
        if(!this.state.name){
            return ("Note must have a name");
        }
    }

    updateNameState(name){
        name = name.trim();
        this.setState({name:name});
    }

    updateContentState(content){
        this.setState({content:content});
    }

    updateFolderState(folder){
        this.setState({folderId:folder});
    }

    handleSubmit(e){
        e.preventDefault();
        let date = new Date(Date.now());
        let tempObject= {
            name:this.state.name,
            modified: date,
            folder_id:this.state.folderId,
            content:this.state.content,
        }
        //console.log(tempObject)

        fetch('http://localhost:8000/api/notes', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${config.API_KEY}`
            },
            body: JSON.stringify(tempObject)
        })
            .then(res => res.json()) 
            .then(data => {
                this.props.renderNote();
                this.props.history.push('/');
            })
    }

    generateFolderList() {
        
        let newArray = this.props.folders
        let temp = []
        temp.push(<option key='-1' value="" disabled selected>Choose</option>)
        temp.push.apply(temp, newArray)
        let folderList = temp.map((folder, index) => {
            return <option key={index} value={folder.id}>{folder.name}</option>
        }) 
        return folderList;
    }

    render() {
        return (
            <form className="add-note-form" onSubmit={(e) => this.handleSubmit(e)}>
                <label htmlFor="note-name">
                    <p className="error">{this.validateName()}</p> 
                    <input type="text" id="note-name" placeholder="new note name" onChange={ (e) => this.updateNameState(e.target.value)} 
                     minLength='3' maxLength='10' required/>
                </label>
                <label htmlFor="note-content">
                    <textarea type="text" id="note-content" placeholder="enter note content" onChange={(e) => this.updateContentState(e.target.value)} />
                </label>

                <select selected='' className="folder-select" onChange={(e) => this.updateFolderState(e.target.value)}>
                    {this.generateFolderList()}
                </select>
                <button type="submit" className="add-folder-submit">Add note</button>
            </form>
        )
    }
}

AddNote.propTypes = {
    renderNote: PropTypes.func,
    history: PropTypes.object,
}