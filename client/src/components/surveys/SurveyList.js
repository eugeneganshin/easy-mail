import React, { Component } from "react";
import { connect } from "react-redux";


import * as actionCreators from "../../store/actions/index";

class SurveyList extends Component {
  componentDidMount() {
    this.props.onFetchSurveys();
    this.props.onSocket()
    console.log(this.props)
  }

  renderSurveys() {
    return this.props.surveys.reverse().map((survey) => {
      return (
        <div className="card teal darken-1" key={survey._id}>
          <div className="card-content white-text">
            <span className="card-title">{survey.title}</span>
            <p>{survey.body}</p>
            <p className="right">
              Sent on: {new Date(survey.dateSent).toLocaleDateString()}
            </p>
          </div>
          <div className="card-action">
            <a>Yes: {survey.yes}</a>
            <a>No: {survey.no}</a>
            {/* <p>{}</p> */}
          </div>
        </div>
      );
    });
  }

  render() {
    console.log(this.props)
    return <div>{this.renderSurveys()}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    surveys: state.surveys,
    socket: state.socket,
    choice: state.socket.choice
  };
};

const mapdispatchtoprops = (dispatch) => {
  return {
    onFetchSurveys: () => dispatch(actionCreators.fetchSurveys()),
    onSocket: () => dispatch({ type: 'server/hello', data: 'Hello!' })
  };
};

export default connect(mapStateToProps, mapdispatchtoprops)(SurveyList);
