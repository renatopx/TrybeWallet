const INITIAL_STATE = {
  currencies: [], // exchangeRates entra aqui
  expenses: [],
  loading: false,
  error: '',
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  // case FETCH_LOADING:
  // case FETCH_ERROR:
  // case SAVE_EXPENSES
  default:
    return state;
  }
};

export default walletReducer;
