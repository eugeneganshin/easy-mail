import React, { Component } from 'react'
import { connect } from 'react-redux'

class Choice extends Component {
    renderComponent() {
        if (this.props.surveyData.data === null) {
            return (
                <div className="card-action">
                    <a>Yes: {this.props.yes}</a>
                    <a>No: {this.props.no}</a>
                </div>
            )
        } else {
            return (
                <div className="card-action">
                    <a>Yes: {this.props.surveyData.data.yes}</a>
                    <a>No: {this.props.surveyData.data.no}</a>
                </div>
            )
        }
    }


    render() {
        return this.renderComponent()
    }
}


const mapStateToProps = (state, ownProps) => {
    return {
        surveyData: state.socket,
        yes: ownProps.yes,
        no: ownProps.no
    }
}

export default connect(mapStateToProps)(Choice)
