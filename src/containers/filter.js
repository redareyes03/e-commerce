import {setFilter} from '../redux/filters/actions';

function mapDispatchToProps(dispatch) {
  return {
    handleFilter: (e) => dispatch(setFilter(e)),
  };
}

function mapStateToProps({filter}) {
  return {
    currentFilter: filter.filter,
  };
}


export {
    mapDispatchToProps,
    mapStateToProps,
}