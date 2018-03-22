const initialState = {
	emailInput : '',
	passwordInput : '', 
};

export default function Info(state = initialState, action) {
  if (action.type === 'CHANGE_EMAIL_AUTH'){
    return{
    	...state, emailInput : action.payload
    };
  }
  else if (action.type === 'CHANGE_PASSWORD_AUTH'){
    return{
    	...state, passwordInput : action.payload
    };
  }
  else if (action.type === 'TO_INITIAL'){
    return{
      ...initialState
    };
  }
  return state;
};