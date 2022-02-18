export function actionLogin(email) {
  return { type: 'LOGIN', email };
}

const updateExpenses = (payload) => ({
  type: 'UPDATE_EXPENSES',
  payload,
});

export const addExpense = (payload) => async (dispatch) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const exchangeRates = await response.json();
  return dispatch(updateExpenses({ ...payload, exchangeRates }));
};

const saveCurrencies = (payload) => ({
  type: 'SAVE_EXCHANGE_RATES',
  payload,
});

export const fetchCurrencies = () => async (dispatch) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const exchangeRates = await response.json();
  return dispatch(saveCurrencies(exchangeRates));
};
