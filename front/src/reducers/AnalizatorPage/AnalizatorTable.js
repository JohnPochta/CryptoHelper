const initialState = {stats : {}};

export default function Info(state = initialState, action) {
  if (action.type === 'SELECT_STATISTIC_TO_ANALIZATOR_TABLE'){
    return{
    	...state, stats : action.payload
    };
  }
  else if (action.type === 'SELECT_PIECE_OF_STATISTIC_TO_ANALIZATOR_TABLE'){
  	var new_stats = {};
  	for (let x in state.stats ){
  		new_stats[x] = state.stats[x];
  	};
  	for (let x in action.payload) {
	    new_stats[x] = action.payload[x];
	};
    return{
    	...state, stats : new_stats
    };
  }
  return state;
};