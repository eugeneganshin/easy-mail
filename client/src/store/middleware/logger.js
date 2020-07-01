const logger = (store) => {
    return (next) => {
        return (action) => {
            // console.log('[Middleware] Dispatching', action)
            if (action.type === 'SERVER: FETCH_USER') {
                console.log('TEST', action)
            }
            const result = next(action)
            // console.log('[Middleware] next state', store.getState())
            return result
        }
    }
}

export default logger