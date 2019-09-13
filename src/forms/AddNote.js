import React, {Component} from 'react'
import { fips } from 'crypto';

export default class AddNote extends Component {

    state = {
        name:'',
        folderName:'',
        content:'',
    };

    validateName(){
        if(!this.state.name){
            return ("Note must have a name");
        }
    }

    updateNameState(name){
        // let newStateObject = {
        //     value : name
        //    // touched:true
        // }
        //  this.setState({name:newStateObject})
        name = name.trim();
        console.log(name);
        this.setState({name:name});
    }

    updateContentState(content){
        // let newContentObject = {
        //     value:content
        //     //touched:true
        // }
        // this.setState({content:newContentObject})
        this.setState({content:content});
    }

    updateFolderState(folder){
        // let newFolderObject = {
        //     value:folder
        //     //touched:true
        // }
        // this.setState({folder:newFolderObject})
        this.setState({folder:folder});
    }

    handleSubmit(e){
        e.preventDefault();
        let tempObject={
            name:this.state.name,
            modified:Date.now(),
            content:this.state.content,
            folder:this.state.folderName,

        }
        console.log(tempObject);
        fetch('http://localhost:9090/notes', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',

            },
            body: JSON.stringify(tempObject)
        })
            .then(res => res.json())
            .then(data => {
                this.props.renderNote();
                this.props.history.push('/');
            })
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
                <label htmlFor="note-folder">
                    <input type="text" id="note-folder" placeholder="enter a folder name" onChange={(e) => this.updateFolderState(e.target.value)}/>
                </label>
                <button type="submit" className="add-folder-submit">Add note</button>
            </form>
        )
    }
}