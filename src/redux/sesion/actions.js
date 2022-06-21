export function login() {
    return {
        type: 'LOGIN',
    };
}

export function logout() {
    return {
        type: 'LOGOUT',
    };
}

export function toggleModal(mode){
    return {
        type: 'TOGGLE_MODAL',
        payload: mode
    }
}