import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';

import * as noteAction from '../../action/NoteAction';
import NoteList from './NoteList';

export class NoteListContainer extends React.Component {
  state = { selectedNoteId: undefined };

  componentDidMount() {
    this.props.action.getNotesAction().catch(error => {
      toastr.error(error);
    });
  }

  handleAddNote = () => {
    this.props.history.push('/note');
  };

  handleEditNote = () => {
    const selectedNoteId = this.state.selectedNoteId;

    if (selectedNoteId) {
      this.setState({ selectedNoteId: undefined });
      this.props.history.push(`/note/${selectedNoteId}`);
    }
  };

  handlePublish = () => {
    const selectedNoteId = this.state.selectedNoteId;

    if (selectedNoteId) {
      this.props.action
        .publishNoteAction(selectedNoteId)
        .then(() => this.props.history.push('/'));
    }
  };

  handleDelete = () => {
    const selectedNoteId = this.state.selectedNoteId;

    if (selectedNoteId) {
      this.setState({ selectedNoteId: undefined });
      this.props.action.deleteNoteAction(selectedNoteId).catch(error => {
        toastr.error(error);
      });
    }
  };

  handleRowSelect = (row, isSelected) => {
    if (isSelected) {
      this.setState({ selectedNoteId: row._id });
    }
  };

  render() {
    const { notes } = this.props;

    if (!notes) {
      return <div>Loading...</div>;
    }

    return (
      <div className="container-fluid">
        <div className="row mt-3">
          <div className="col">
            <h1>Notifications</h1>
          </div>
        </div>

        <div className="row mt-3">
          <div className="col">
            <div className="btn-group" role="group">
              <button
                type="button"
                className="btn btn-primary"
                onClick={this.handleAddNote}
              >
                <i className="fa fa-plus" aria-hidden="true" /> New
              </button>

              <button
                type="button"
                className="btn btn-warning ml-2"
                onClick={this.handleEditNote}
              >
                <i className="fa fa-pencil" aria-hidden="true" /> Edit
              </button>

              <button
                type="button"
                className="btn btn-info ml-2"
                onClick={this.handlePublish}
              >
                <i className="fa fa-upload" aria-hidden="true" /> Publish Now
              </button>

              <button
                type="button"
                className="btn btn-danger ml-2"
                onClick={this.handleDelete}
              >
                <i
                  className="fa fa-trash-o"
                  aria-hidden="true"
                  onClick={this.handleDelete}
                />{' '}
                Delete
              </button>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <NoteList notes={notes} handleRowSelect={this.handleRowSelect} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  notes: state.notesReducer.notes
});

const mapDispatchToProps = dispatch => ({
  action: bindActionCreators(noteAction, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(NoteListContainer);
