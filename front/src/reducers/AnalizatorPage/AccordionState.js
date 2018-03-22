const initialState = {activeIndexAOD : -1, activeIndexAB : -1 };

export default function Info(state = initialState, action) {
  if (action.type === 'ACCORDION_CHOOSE_AOD'){
    return{
    	...state, activeIndexAOD : action.payload
    };
  }
  else if (action.type === 'ACCORDION_CHOOSE_AB'){
    return{
    	...state, activeIndexAB : action.payload
    };
  }
  return state;
};