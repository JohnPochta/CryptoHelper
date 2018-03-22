const initialState = {stats : [], id_of_set_interval : ''};

export default function Info(state = initialState, action) {
  if (action.type === 'SELECT_STATISTIC_TO_MANAGER_PAGE') {
    return{
    	...state, stats : action.payload
    };
  }
  else if (action.type === 'NEW_INTERVAL') {
    return{
    	...state, id_of_set_interval: action.payload
    };
  }
  return state;
}