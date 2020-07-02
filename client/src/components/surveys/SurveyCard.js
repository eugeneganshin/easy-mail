import React, { Component } from 'react'
import { connect } from 'react-redux'

import Choice from './Choice/Choice'

class SurveyCard extends Component {
    renderComponent() {
        if (this.props.surveyData.data !== null) {
            return (
                <div className="card teal darken-1" key={this.props.surveyData.data._id}>
                    <div className="card-content white-text">
                        <span className="card-title">{this.props.surveyData.data.title}</span>
                        <p>{this.props.surveyData.data.body}</p>
                        <p className="right">
                            Sent on: {new Date(this.props.surveyData.data.dateSent).toLocaleDateString()}
                        </p>
                    </div>
                    <div className="card-action">
                        <a>Yes: {this.props.surveyData.data.yes}</a>
                        <a>No: {this.props.surveyData.data.no}</a>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="card teal darken-1" key={this.props._id}>
                    <div className="card-content white-text">
                        <span className="card-title">{this.props.title}</span>
                        <p>{this.props.body}</p>
                        <p className="right">
                            Sent on: {new Date(this.props.dateSent).toLocaleDateString()}
                        </p>
                    </div>
                    <div className="card-action">
                        <a>Yes: {this.props.yes}</a>
                        <a>No: {this.props.no}</a>
                    </div>
                </div>
            )
        }
    }

    render() {
        return this.renderComponent()
    }
}

const mapStateToProps = state => {
    return {
        surveyData: state.socket
    }
}

export default connect(mapStateToProps)(SurveyCard)