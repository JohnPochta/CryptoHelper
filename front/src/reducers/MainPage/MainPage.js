const initialState = {activeModal : -1, post_response : 0, auth_response : 0 };

export default function Info(state = initialState, action) {
  if (action.type === 'CHOOSEN_MODAL'){
    return{
    	...state, activeModal : action.payload
    };
  }
  else if (action.type === 'POST_RESPONSE'){
    return{
    	...state, post_response : action.payload
    };
  }
  else if (action.type === 'AUTH_RESPONSE'){
    return{
      ...state, auth_response : action.payload
    };
  }
  return state;
};