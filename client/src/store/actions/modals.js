import * as actionTypes from './actionTypes'

export const showModal = ({ modalProps, modalType }) => dispatch => {
    dispatch({
        type: actionTypes.SHOW_MODAL,
        modalProps,
        modalType
    })
}

export const hideModal = () => dispatch => {
    dispatch({
        type: actionTypes.HIDE_MODAL
    })
}