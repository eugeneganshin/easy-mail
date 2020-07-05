import React, { Component } from 'react'
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import FIELDS from "./formFields";
import * as actions from "../../store/actions/index";

const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {
  const reviewFields = FIELDS.map((f) => {
    return (
      <div key={f.name}>
        <label>{f.label}</label>
        <div>{formValues[f.name]}</div>
      </div>
    );
  });

  return (
    <div>
      <h5>Please confirm your entries!</h5>
      {reviewFields}
      <button
        className="yellow white-text darken-3 btn-flat"
        onClick={onCancel}
      >
        Back
        </button>
      <button
        className="green btn-flat right white-text"
        onClick={() => submitSurvey(formValues, history)}
      >
        <i className="material-icons right">email</i>
        Send Survey
        </button>
    </div>
  )
};

const mapStateToProps = (state) => {
  return {
    formValues: state.form.surveyForm.values
  };
};

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));
