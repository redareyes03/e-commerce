import { mapDispatchToProps as filterDispatch, mapStateToProps as filterState } from './filter'
import { mapDispatchToProps as loginDispatch, mapStateToProps as loginProps } from './login'


export const mapStateToProps = (state) => {
    return {
        ...filterState(state),
        ...loginProps(state)
    }
}

export const mapDispatchToProps = (dispatch) => {
    return {
        ...filterDispatch(dispatch),
        ...loginDispatch(dispatch)
    }
}