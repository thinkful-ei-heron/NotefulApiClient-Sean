import React, {Component} from 'react'

export default class AddNote extends Component {

    render() {
        return (
            <form className="add-note-form">
                <label htmlFor="note-name"> 
                    <input type="text" id="note-name" placeholder="new note name" />
                </label>
                <label htmlFor="note-content">
                    <textarea type="text" id="note-content" placeholder="enter note content" />
                </label>
                <label htmlFor="note-folder">
                    <input type="text" id="note-folder" placeholder="enter a folder name" />
                </label>
                <button type="submit" className="add-folder-submit">Add note</button>
            </form>
        )
    }
}