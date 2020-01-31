import { GET_NOTES, GET_NOTE } from '../action/ActionType';

const notesReducer = (
  state = { notes: [], selectedNote: undefined },
  action
) => {
  const notes = action.notes ? [...action.notes] : [];

  switch (action.type) {
    case GET_NOTES:
      return { ...state, notes };
    case GET_NOTE:
      return { ...state, selectedNote: action.note };
    default:
      return state;
  }
};

export default notesReducer;
