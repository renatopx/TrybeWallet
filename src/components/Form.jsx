import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addExpense, fetchCurrencies } from '../actions';

const STATE = {
  value: '',
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
};

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = STATE;
  }

  componentDidMount() {
    const { requestCurrencies } = this.props;
    requestCurrencies();
  }

  handleChange = ({ target }) => {
    const { id, value } = target;
    this.setState({ [id]: value });
  }

  AddExpenses = () => {
    const { saveExpense, expenses } = this.props;
    let id = 0;
    if (expenses.length !== 0) {
      id = expenses[(expenses.length - 1)].id + 1;
    }
    saveExpense({ id, ...this.state });
    this.setState(STATE);
  }

  renderCurrencies = () => {
    const { currency } = this.state;
    const { currencies } = this.props;

    const currencyOptions = currencies.map((option) => (
      <option
        key={ option }
        value={ option }
        data-testid={ option }
      >
        { option }
      </option>
    ));

    return (
      <label htmlFor="currency">
        Moeda:
        <select
          id="currency"
          value={ currency }
          data-testid="currency-input"
          onChange={ this.handleChange }
        >
          { currencyOptions }
        </select>
      </label>
    );
  }

  render() {
    const { value, description, method, tag } = this.state;
    const { currencies } = this.props;
    return (
      <form>
        <fieldset>
          <label htmlFor="value">
            Valor
            <input
              type="number"
              id="value"
              data-testid="value-input"
              value={ value }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="description">
            Descrição
            <input
              type="text"
              id="description"
              data-testid="description-input"
              value={ description }
              onChange={ this.handleChange }
            />
          </label>
          {(currencies.length) && this.renderCurrencies()}
          <label htmlFor="method">
            Método de pagamento
            <select
              id="method"
              data-testid="method-input"
              value={ method }
              onChange={ this.handleChange }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            Tag
            <select
              id="tag"
              data-testid="tag-input"
              value={ tag }
              onChange={ this.handleChange }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          <button type="button" onClick={ this.AddExpenses }>Adicionar despesa</button>
        </fieldset>
      </form>
    );
  }
}

Form.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
  ]))),
  saveExpense: PropTypes.func,
  currencies: PropTypes.arrayOf(PropTypes.string),
  requestCurrencies: PropTypes.func,
}.isRequired;

Form.defaultProps = {
  expenses: [],
  currencies: [],
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  saveExpense: (expense) => dispatch(addExpense(expense)),
  requestCurrencies: () => dispatch(fetchCurrencies()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
