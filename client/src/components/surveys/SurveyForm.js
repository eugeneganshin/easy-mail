import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { Link } from "react-router-dom";

import SurveyField from "./SurveyField";
import validateEmails from "../../utils/validateEmails";
import FIELDS from "./formFields";

class SurveyForm extends Component {
  renderFields() {
    return (
      <div>
        {FIELDS.map((f) => (
          <Field
            key={f.name}
            type="text"
            component={SurveyField}
            name={f.name}
            label={f.label}
          />
        ))}
      </div>
    );
  }

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {this.renderFields()}
          <Link to="/surveys" className="red btn-flat white-text">
            Cancel
          </Link>
          <button type="submit" className="teal btn-flat right white-text">
            Next
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    );
  }
}

const validate = (values) => {
  let errors = {};

  errors.recipients = validateEmails(values.recipients || "");

  FIELDS.forEach((el) => {
    if (!values[el.name]) {
      errors[el.name] = `You must provide a value`;
    }
  });

  return errors;
};

export default reduxForm({
  validate,
  form: "surveyForm",
  destroyOnUnmount: false,
})(SurveyForm);
