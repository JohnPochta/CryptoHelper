const initialState = {
	info: [],
  already : 1,
  selected_pairs : []
};

export default function Info(state = initialState, action) {
  if (action.type === 'SELECT_INFO') {
    return{
    	...state, info : action.payload
    };
  }
  else if (action.type === 'SELECT_SELECTED_PAIRS') {
    return{
      ...state, selected_pairs : action.payload
    };
  }
 else if (action.type === 'ALREADY_INFO') {
    return{
      ...state, already : action.payload
    };
  }
  return state;
}