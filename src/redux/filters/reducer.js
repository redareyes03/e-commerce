const initialState = {
    filter: 'all',
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_FILTER':
            // state.filter = action.payload
            return {
                ...state, filter: action.payload
            }
        default:
            return state
    }
}

export default reducer