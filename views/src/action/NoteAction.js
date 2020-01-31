import axios from 'axios';

if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = 'http://localhost:8000';
}

import { GET_NOTES, GET_NOTE } from '../action/ActionType';

export function getNoteAction(noteId) {
  return dispatch => {
    return axios
      .get(`/api/notes/${noteId}`)
      .then(res => {
        dispatch({
          type: GET_NOTE,
          note: res.data.note
        });
      })
      .catch(error => {
        throw error.response;
      });
  };
}

export function getNotesAction() {
  return dispatch => {
    return axios
      .get('/api/notes')
      .then(res => {
        dispatch({
          type: GET_NOTES,
          notes: res.data.notes
        });
      })
      .catch(error => {
        throw error.response;
      });
  };
}

export function saveNoteAction(noteBeingAddedOrEdited) {
  return function(dispatch) {
    return axios
      .post('/api/notes', noteBeingAddedOrEdited)
      .then(() => {
        dispatch(getNotesAction());
      })
      .catch(error => {
        throw error.response;
      });
  };
}

export function deleteNoteAction(noteId) {
  return dispatch => {
    return axios
      .delete(`/api/notes/${noteId}`)
      .then(() => {
        dispatch(getNotesAction());
      })
      .catch(error => {
        throw error.response;
      });
  };
}

export function publishNoteAction(noteId) {
  return dispatch => {
    return axios
      .put(`/api/notes/publish/${noteId}`)
      .then(() => {
        dispatch(getNotesAction());
      })
      .catch(error => {
        throw error.response;
      });
  };
}
