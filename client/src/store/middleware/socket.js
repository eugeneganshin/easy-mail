import { updateObject } from '../utility'
const INITIAL_STATE = {
    choice: null
}

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SERVER: CLIENT_CHOICE':
            // updateObject(state, action.data)
            console.log(state)
            console.log(action)
            return state
        default:
            return state;
    }
}

export default reducer

// The data from the server that i recieve is just a {data: [choice, email, surveyId]}
// choice, email, surveyID
// So i need to upgdare only one part of a component based on this data.
