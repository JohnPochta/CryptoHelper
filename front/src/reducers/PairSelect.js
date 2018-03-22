const initialState = {
	pair: '',
	ticker_statistics:'',
	depth_statistics:'',
	trades_statistics:'',
	oneofpair:'',
	pair_already_added: '',
};
export default function Info(state = initialState, action) {
	if (action.type === 'SELECT_ONE_OF_PAIR') {
		return{
			...state, oneofpair : action.payload
		};
	}
	else if (action.type === 'SELECT_PAIR') {
		return{
			...state, pair : action.payload
		};
	}
	else if (action.type === 'TICKER_RESPONSE') {
		return{
			...state, ticker_statistics : action.payload
		};
	}
	else if (action.type === 'DEPTH_RESPONSE') {
		return{
			...state, depth_statistics : action.payload
		};
	}
	else if (action.type === 'TRADES_RESPONSE') {
		return{
			...state, trades_statistics : action.payload
		};
	}
	else if (action.type === 'IS_PAIR_ADDED_RESPONSE') {
		return{
			...state, pair_already_added : action.payload
		};
	}
	return state;
}