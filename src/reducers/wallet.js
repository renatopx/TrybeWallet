const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  loading: false,
  error: '',
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'REQUEST_EXCHANGE_RATES':
    return ({
      ...state,
      loading: true,
    });
  case 'UPDATE_EXPENSES':
    return ({
      ...state,
      expenses: [...state.expenses, action.payload],
      loading: false,
      error: '',
    });
  case 'SAVE_EXCHANGE_RATES':
    return ({
      ...state,
      currencies: Object.keys(action.payload).filter((currency) => currency !== 'USDT'),
      loading: false,
      error: '',
    });
  default:
    return state;
  }
};

export default walletReducer;
