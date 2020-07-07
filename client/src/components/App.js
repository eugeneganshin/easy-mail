import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import io from "socket.io-client";


import * as actionCreators from "../store/actions/index";
import Header from "./Header";
import Landing from "./Landing";
import Dashboard from "./Dashboard";
import SurveyNew from "./surveys/SurveyNew";
import { actionTypes } from "redux-form";


class App extends Component {

  componentDidMount() {
    this.props.onFetchUser();
  }

  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Header />
          <Route exact path="/" component={Landing} />
          <Route exact path="/surveys" component={Dashboard} />
          <Route path="/surveys/new" component={SurveyNew} />
          <Route exact path='/telegram' component={() => {
            window.location.href = 'https://t.me/easy_mail_bot';
            return null;
          }} />
        </div>
      </BrowserRouter>
    );
  }
}

const mapdispatchtoprops = (dispatch) => {
  return {
    onFetchUser: () => dispatch(actionCreators.fetchUser())
  };
};

export default connect(null, mapdispatchtoprops)(App);
