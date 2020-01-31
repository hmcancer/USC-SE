import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';

import * as noteAction from '../../action/NoteAction';
import NoteForm from './NoteForm';

export class AddOrEditNoteContainer extends React.Component {
  componentDidMount() {
    this.props.action.getNoteAction(this.props.match.params.id).catch(error => {
      toastr.error(error);
    });
  }

  handleSave = values => {
    const note = {
      _id: values._id,
      title: values.title,
      date: values.date,
      daysToShow: values.daysToShow,
      body: values.body,
      level: values.level,
      group: values.group,
      emails: values.emails,
      numbers: values.numbers
    };

    this.props.action
      .saveNoteAction(note)
      .then(() => {
        toastr.success('Note saved');
        this.props.history.push('/notes');
      })
      .catch(error => {
        toastr.error(error);
      });
  };

  handleCancel = event => {
    event.preventDefault();
    this.props.history.replace('/notes');
  };

  render() {
    const { initialValues } = this.props;
    const heading = initialValues && initialValues._id ? 'Edit' : 'Add';

    return (
      <div className="container">
        <NoteForm
          heading={heading}
          handleSave={this.handleSave}
          handleCancel={this.handleCancel}
          initialValues={this.props.initialValues}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const noteId = ownProps.match.params.id; // from the path '/note/:id'

  if (
    noteId &&
    state.notesReducer.selectedNote &&
    noteId === state.notesReducer.selectedNote._id
  ) {
    return {
      initialValues: state.notesReducer.selectedNote
    };
  } else {
    return {};
  }
};

const mapDispatchToProps = dispatch => ({
  action: bindActionCreators({ ...noteAction }, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddOrEditNoteContainer);
