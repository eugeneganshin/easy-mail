const INITIAL_STATE = {
    data: null
}

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SOCKET_SERVER: CLIENT_CHOICE':
            // FOR LATER USE
            return state

        default:
            return state;
    }
}

export default reducer