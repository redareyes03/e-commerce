import { login, logout, toggleModal } from "../redux/sesion/actions";

function mapStateToProps({login}) {
  return {
    isLogged: login.login,
    modalState: login.modal
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loginUser: () => dispatch(login()),
    logoutUser: () => dispatch(logout()),
    toggleModal: (mode) => dispatch(toggleModal(mode))
  };
}

export {
    mapStateToProps,
    mapDispatchToProps
}