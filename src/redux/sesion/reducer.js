const initialState = {
    login: false,
    modal: false
};

const reducer = (state = initialState, action) => {

    const {type, payload} = action;

    switch (type) {
        case 'LOGIN':
            return {
                ...state,
                login: true,
            };
        case 'LOGOUT':
            return {
                ...state,
                login: false,
            };

        case 'TOGGLE_MODAL':
            return {
                ...state,
                modal: payload
            }
        default:
            return state;
    }
}

export default reducer;