import React, { Component } from 'react'

export default class AddFolder extends Component {
    state = {
        name: null,
        touched: false
    }

    updateFolderName(name) {
        this.setState({ name: name })
    }

    handleSubmit = event => {
        event.preventDefault();
        let name = {name: this.state.name};

        fetch('http://localhost:9090/folders', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',

            },
            body: JSON.stringify(name)
        })
            .then(res => res.json())
            .then(data => {
                this.props.renderFolder();
                this.props.history.push('/');
            })
    }

    render() {
        return (
            <form className="add-folder-form" onSubmit={(e) => this.handleSubmit(e)}>
                <label htmlFor="add-folder">
                    <input type="text" id="add-folder" placeholder="new folder name" onChange={(e) => this.updateFolderName(e.target.value)} />
                </label>
                <button type="submit" className="add-folder-submit" >Add folder</button>
            </form>
        )
    }
}