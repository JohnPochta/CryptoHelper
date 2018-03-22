const initialState = { activeItem : 'homepage', login : '', avatar : ''};

export default function Info(state = initialState, action) {
  if (action.type === 'GO'){
    return{
    	...state, activeItem : action.payload
    };
  }
  else if (action.type === 'LOGIN'){
    return{
      ...state, login : action.payload
    };
  }
  else if (action.type === 'AVATAR'){
    return{
      ...state, avatar : action.payload
    };
  }
  return state;
};