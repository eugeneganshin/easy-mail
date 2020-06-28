const INITIAL_STATE = {}

const reducer = (state = { data: 'YEY' }, action) => {
    switch (action.type) {
        case 'data':
            return Object.assign({}, { data: action.data });
        default:
            return state;
    }
}

export default reducer