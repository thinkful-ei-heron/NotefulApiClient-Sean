import React from 'react'
import NotesContext from '../NotesContext';
import { findNote } from '../notes-helpers.js';
import PropTypes from 'prop-types'
import Note from '../Note/Note'
import './NotePageMain.css'

export default class NotePageMain extends React.Component {

  static contextType = NotesContext;

  render() {
    const note = findNote(this.context.notes, 
                        this.props.match.params.noteId) || {};
    return (
      <section className='NotePageMain'>
         <Note
          id={note.id}
          name={note.name}
          modified={note.modified}
          history={this.props.history}
          path={this.props.match.path}
        />
        
        <div className='NotePageMain__content'>
          {note.content && note.content.split(/\n \r|\n/).map((para, i) =>
            <p key={i}>{para}</p>
          )}
        </div> 
      </section>
    )
  }
}

NotePageMain.propTypes = {
  match: PropTypes.shape({
    history: PropTypes.object,
    params: PropTypes.object
  })
}

NotePageMain.defaultProps = {
  note: {
    content: '',
  }
}
