import React, { Component } from 'react';
import NotesContext from '../NotesContext';
import { Route, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NoteListNav from '../NoteListNav/NoteListNav';
import NotePageNav from '../NotePageNav/NotePageNav';
import NoteListMain from '../NoteListMain/NoteListMain';
import NotePageMain from '../NotePageMain/NotePageMain';
import AddNote from '../forms/AddNote';
import AddFolder from '../forms/AddFolder';
import './App.css';
import ErrorBoundary from '../errorBoundary'

class App extends Component {
    state = {
        notes: [],
        folders: [],
        deleteNote: this.deleteNote,
    };

    setFolders(folders) {
        this.setState({ folders: folders })
    }
    setNotes(notes) {
        this.setState({ notes: notes })
    }

    componentDidMount() {
        fetch('http://localhost:9090/folders', {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            },
        })
            .then(res => res.json())
            .then(data => this.setFolders(data))

        fetch('http://localhost:9090/notes', {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            },
        })
            .then(res => res.json())
            .then(data => this.setNotes(data))
    }

    deleteNote = (noteId) => {
        const updatedList = this.state.notes.filter(note => note.id !== noteId);
        this.setState({ notes: updatedList });
    }

    addFolder = () => {
        fetch('http://localhost:9090/folders', {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            },
        })
            .then(res => res.json())
            .then(data => this.setFolders(data))
    }

    addNote = () => {
        fetch('http://localhost:9090/notes', {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            },
        })
            .then(res => res.json())
            .then(data => this.setNotes(data))
    }



    renderNavRoutes() {
        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        component={NoteListNav}
                    />
                ))}
                <Route
                    path="/note/:noteId"
                    component={NotePageNav}
                />
                <Route path="/add-folder" render={(routeProps) =>
                    <AddFolder renderFolder={this.addFolder} history={routeProps.history} />} />
                <Route path="/add-note" render={(routeProps) =>
                    <AddNote renderNote={this.addNote} history={routeProps.history} />} />
            </>
        );
    }

    renderMainRoutes() {
        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        component={NoteListMain}
                    />
                ))}
                <Route
                    path="/note/:noteId"
                    component={NotePageMain}
                />
            </>
        );
    }

    render() {
        return (
            <ErrorBoundary>
                <NotesContext.Provider
                    value={{
                        notes: this.state.notes,
                        folders: this.state.folders,
                        deleteNote: this.deleteNote
                    }}>
                    <div className="App">
                        <nav className="App__nav">{this.renderNavRoutes()}</nav>
                        <header className="App__header">
                            <h1>
                                <Link to="/">Noteful</Link>{' '}
                                <FontAwesomeIcon icon="check-double" />
                            </h1>
                        </header>
                        <main className="App__main">{this.renderMainRoutes()}</main>
                    </div>
                </NotesContext.Provider>
            </ErrorBoundary>
        );
    }
}

export default App;
