import React from 'react'
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import Modal from '../UI/Modal/Modal'
import FIELDS from "./formFields";
import * as actionCreators from "../../store/actions/index";

const SurveyFormReview = (props) => {
  const reviewFields = FIELDS.map((f) => {

    return (
      <div key={f.name}>
        <label>{f.label}</label>
        <div>{props.formValues[f.name]}</div>
      </div>
    );
  });

  return (
    <React.Fragment>
      <Modal show={props.modal.isOpen} hide={props.onHideModal}>
        <p>{props.modal.error}</p>
        <button className='red btn-flat white-text' onClick={() => props.onHideModal()}>HIDE</button>
      </Modal>
      <div>
        <h5>Please confirm your entries!</h5>
        {reviewFields}
        <button
          className="yellow white-text darken-3 btn-flat"
          onClick={props.onCancel}
        >
          Back
        </button>
        <button
          className="green btn-flat right white-text"
          onClick={() => props.onSubmitSurvey(props.formValues, props.history)}

        >
          <i className="material-icons right">email</i>
        Send Survey
        </button>
      </div>
    </React.Fragment>
  )
};

const mapStateToProps = (state) => {
  return {
    formValues: state.form.surveyForm.values,
    modal: state.modal
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSubmitSurvey: (val, history) => dispatch(actionCreators.submitSurvey(val, history)),
    onHideModal: () => dispatch(actionCreators.hideModal())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SurveyFormReview));
