import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';

import * as noteAction from '../../action/NoteAction';

class Section extends React.Component {
  state = { level: '', groups: new Set(), group: '' };

  componentDidMount() {
    this.props.action
      .getNotesAction()
      .then(() => {
        const groups = new Set();
        this.props.notes.forEach(note => {
          groups.add(note.group);
        });

        this.setState({ groups });
      })
      .catch(error => {
        toastr.error(error);
      });
  }

  handleLevelChange = e => {
    this.setState({ level: e.target.value });
  };

  handleGroupChange = e => {
    this.setState({ group: e.target.value });
  };

  renderGroupsSelect = () => {
    const g = [];
    this.state.groups.forEach(group => {
      g.push(
        <option key={group} value={group}>
          {group}
        </option>
      );
    });

    return (
      <select
        value={this.state.group}
        onChange={this.handleGroupChange}
        className="custom-select mr-sm-2"
      >
        <option value="">گروه...</option>
        {g}
      </select>
    );
  };

  renderNotes = () => {
    const { notes } = this.props;
    const noteElements = [];
    const now = new Date().getTime();

    notes.forEach(note => {
      const noteDate = new Date(note.date).getTime();
      const daysToShowDate = new Date(note.date).setDate(
        new Date(note.date).getDate() + note.daysToShow
      );

      if (noteDate <= now && now <= daysToShowDate) {
        const n = (
          <div className="col-md-6 col-lg-3" key={note._id}>
            <div className="card">
              <div className="card-block">
                <h3 className="card-title">{note.title}</h3>
                <p>{note.body}</p>
              </div>
            </div>
          </div>
        );

        if (this.state.level && this.state.group) {
          if (
            this.state.level === note.level &&
            this.state.group === note.group
          ) {
            noteElements.push(n);
          }
        } else if (this.state.level && this.state.level === note.level) {
          noteElements.push(n);
        } else if (this.state.group && this.state.group === note.group) {
          noteElements.push(n);
        } else if (!this.state.level && !this.state.group) {
          noteElements.push(n);
        }
      }
    });

    return noteElements;
  };

  render() {
    if (this.props.notes.length === 0) return null;

    return (
      <div style={{ textAlign: 'center' }}>
        <div
          style={{ display: 'block', marginBottom: '30px' }}
          className="form-inline"
        >
          <select
            className="custom-select mr-sm-2"
            value={this.state.level}
            onChange={this.handleLevelChange}
          >
            <option value="">سطح...</option>
            <option value="uni">دانشگاه</option>
            <option value="faculty">دانشکده</option>
            <option value="dorm">خوابگاه</option>
          </select>

          {this.renderGroupsSelect()}
        </div>
        <section className="row">{this.renderNotes()}</section>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  notes: state.notesReducer.notes
});

const mapDispatchToProps = dispatch => ({
  action: bindActionCreators({ ...noteAction }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Section);
