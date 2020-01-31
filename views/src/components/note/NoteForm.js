import React from 'react';
import { Field, reduxForm } from 'redux-form';
import FieldInput from '../common/FieldInput';
import TextArea from '../common/TextArea';
import SelectInput from '../common/SelectInput';

const levelOptions = [
  { value: 'uni', text: 'دانشگاه' },
  { value: 'faculty', text: 'دانشکده' },
  { value: 'dorm', text: 'خوابگاه' }
];

export const NoteForm = ({
  handleSubmit,
  pristine,
  reset,
  submitting,
  heading,
  handleSave,
  handleCancel
}) => {
  return (
    <form onSubmit={handleSubmit(handleSave)}>
      <h1>{heading}</h1>

      <Field
        type="text"
        name="title"
        label="Title"
        placeholder="Title of the note"
        component={FieldInput}
      />

      <Field
        type="datetime-local"
        name="date"
        label="Date"
        placeholder="Date of the note"
        component={FieldInput}
      />

      <Field
        type="text"
        name="daysToShow"
        label="Days To Show"
        placeholder="Number of days to show the note"
        component={FieldInput}
      />

      <Field
        name="body"
        label="Body"
        placeholder="Body of the note"
        component={TextArea}
      />

      <Field
        name="level"
        label="Level"
        defaultOption="select"
        options={levelOptions}
        component={SelectInput}
      />

      <Field
        type="text"
        name="group"
        label="Group"
        placeholder="Group of note"
        component={FieldInput}
      />

      <Field
        name="emails"
        label="Emails"
        placeholder="Comma seprated list of emails"
        component={TextArea}
      />

      <Field
        name="numbers"
        label="Phone Numbers"
        placeholder="Comma seprated list of phone numbers"
        component={TextArea}
      />

      <div>
        <button type="submit" disabled={submitting} className="btn btn-primary">
          <i className="fa fa-paper-plane-o" aria-hidden="true" /> Submit
        </button>

        {heading === 'Add' && (
          <button
            style={{ marginLeft: '20px' }}
            type="button"
            disabled={pristine || submitting}
            onClick={reset}
            className="btn btn-default"
          >
            Clear Values
          </button>
        )}

        <button
          style={{ marginLeft: '20px' }}
          type="button"
          className="btn btn-default"
          onClick={handleCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

const validate = values => {
  const errors = {};

  if (!values.title) {
    errors.title = 'Required';
  }

  // if (values.date && new Date(values.date) < new Date()) {
  //   errors.date = 'Date must be greater than current date';
  // }

  if (values.daysToShow && Number(values.daysToShow) <= 0) {
    errors.daysToShow = 'Days to show must be number and greater than 0';
  }

  if (!values.daysToShow) {
    errors.daysToShow = 'Required';
  }

  if (!values.body) {
    errors.body = 'Required';
  }

  return errors;
};

export default reduxForm({
  form: 'NoteForm',
  validate
})(NoteForm);
