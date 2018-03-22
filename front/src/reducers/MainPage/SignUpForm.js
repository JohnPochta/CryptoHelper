const initialState = {
	loginInput : '',
	emailInput : '',
	passwordInput : '', 
	passwordCheckInput : '',
	checked : false,
};

export default function Info(state = initialState, action) {
  if (action.type === 'CHANGE_LOGIN'){
    return{
    	...state, loginInput : action.payload
    };
  }
  else if (action.type === 'CHANGE_EMAIL'){
    return{
    	...state, emailInput : action.payload
    };
  }
  else if (action.type === 'CHANGE_PASSWORD'){
    return{
    	...state, passwordInput : action.payload
    };
  }
  else if (action.type === 'CHANGE_PASSWORD_CHECK'){
    return{
    	...state, passwordCheckInput : action.payload
    };
  }
  else if (action.type === 'CHECKED'){
    return{
    	...state, checked : action.payload
    };
  }
  else if (action.type === 'TO_INITIAL'){
    return{
      ...initialState
    };
  }
  return state;
};