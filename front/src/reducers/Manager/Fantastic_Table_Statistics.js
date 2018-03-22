const initialState = {stats : [], deleted_elem : ''};

export default function Info(state = initialState, action) {
  if (action.type === 'SELECT_STATISTIC_TO_FANTASTIC_TABLE'){
    return{
    	...state, stats : action.payload
    };
  }
  if (action.type === 'DELETE_MESSAGE'){
    return{
    	...state, deleted_elem : action.payload
    };
  }
  return state;
};