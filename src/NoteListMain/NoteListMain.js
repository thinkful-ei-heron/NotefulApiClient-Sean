import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Note from '../Note/Note'
import CircleButton from '../CircleButton/CircleButton'
import './NoteListMain.css'
import NotesContext from '../NotesContext'
import { getNotesForFolder } from '../notes-helpers'
import PropTypes from 'prop-types'

export default class NoteListMain extends React.Component {
  static contextType = NotesContext;

  render() {
    const notes = this.context.notes && this.context.notes.length>0 ? getNotesForFolder(this.context.notes, this.props.match.params.folderId) : null
    return (
      <section className='NoteListMain'>
        <ul>
          {(notes !==null && notes.length> 0 ) ? notes.map((note, index) =>
            <li key={index}>
              <Note
                id={note.id}
                name={note.name}
                modified={note.modified}
              />
            </li>
          ):null}
        </ul>
        <div className='NoteListMain__button-container'>
          <CircleButton
            tag={Link}
            to='/add-note'
            type='button'
            className='NoteListMain__add-note-button'
          >
            <FontAwesomeIcon icon='plus' />
            <br />
            Note
        </CircleButton>
        </div>
      </section>
    )
  }
}

NoteListMain.propTypes = {
  match: PropTypes.object
}

NoteListMain.defaultProps = {
  notes: [],
}
