import React from 'react'
import { withRouter } from 'react-router';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import NotesContext from '../NotesContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Note.css'

class Note extends React.Component {


  static contextType = NotesContext;

  handleDelete(noteId, callback) {
    fetch(`http://localhost:9090/notes/${noteId}`, {
      method: 'DELETE',
      headers: {
          'content-type': 'application/json'
      },
    })
    .then(res => res.json())
    .then(data => {

      if (this.props.path === '/note/:noteId') {
        this.props.history.push('/')
      };

      callback(noteId);
    })
  }


  render() {
    return (
      <div className='Note'>
        <h2 className='Note__title'>
          <Link to={`/note/${this.props.id}`}>
            {this.props.name}
          </Link>
        </h2>
        <button 
          className='Note__delete' 
          type='button' 
          onClick={(id) => this.handleDelete(this.props.id, this.context.deleteNote)}>
          <FontAwesomeIcon icon='trash-alt' />
          {' '}
          remove
      </button>
        <div className='Note__dates'>
          <div className='Note__dates-modified'>
            Modified
          {' '}
            <span className='Date'>
              {format(this.props.modified, 'Do MMM YYYY')}
            </span>
          </div>
        </div>
      </div>
    )
  }
}

Note.propTypes = {
  path: PropTypes.string,
  history: PropTypes.object,
  name: PropTypes.string,
  id: PropTypes.string,
  modified: PropTypes.string,
}


export default Note;