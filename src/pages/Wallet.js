import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

async function getCurrency() {
  const request = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await request.json();
  return data;
}
class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      currency: [],
    };
  }

  async componentDidMount() {
    const currency = await getCurrency();
    this.saveCurrency(Object.keys(currency));
  }

  saveCurrency = (currency) => {
    this.setState({ currency });
  }

  render() {
    const { email } = this.props;
    const { currency } = this.state;

    return (
      <header data-testid="email-field">
        <h3>{email}</h3>
        <span data-testid="total-field">0</span>
        <span data-testid="header-currency-field"> BRL</span>
        <form>
          <fieldset>
            <label htmlFor="value">
              Valor da despesa
              <input
                type="number"
                id="value"
                data-testid="value-input"
              />
            </label>
            <label htmlFor="descricao">
              Descrição
              <input
                type="text"
                id="descricao"
                data-testid="description-input"
              />
            </label>
            <label htmlFor="moeda">
              Moeda
              <select id="moeda" data-testid="currency-input">
                {currency.map((curr, i) => (
                  curr.includes('USDT') ? null
                    : <option key={ i } data-testid={ curr }>{curr}</option>
                ))}
              </select>
            </label>
            <select id="moeda" data-testid="method-input">
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de Crédito">Cartão de Crédito</option>
              <option value="Cartão de Débito">Cartão de Débito</option>
            </select>
            <select id="descricao" data-testid="tag-input">
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
            <button type="submit">Adicionar despesa</button>
          </fieldset>
        </form>
      </header>
    );
  }
}

Wallet.propTypes = {
  email: PropTypes.string,
}.isRequired;

const mapStateToProps = ({ user }) => ({
  email: user.email,
});

export default connect(mapStateToProps)(Wallet);
