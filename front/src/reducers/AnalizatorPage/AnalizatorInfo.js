const initialState = {
  pair: '',
  ticker_statistics:'',
  depth_statistics:'',
  trades_statistics:'',
  oneofpair:'',
};
export default function Info(state = initialState, action) {
  if (action.type === 'SELECT_ONE_OF_PAIR_A') {
    return{
      ...state, oneofpair : action.payload
    };
  }
  else if (action.type === 'SELECT_PAIR_A') {
    return{
      ...state, pair : action.payload
    };
  }
  return state;
}