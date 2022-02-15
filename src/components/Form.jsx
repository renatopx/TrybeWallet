import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Form extends Component {
  render() {
    const { currency } = this.props;
    return (
      <form>
        <fieldset>
          <label htmlFor="value">
            Valor da despesa
            <input type="number" id="value" data-testid="value-input" />
          </label>
          <label htmlFor="descricao">
            Descrição
            <input type="text" id="descricao" data-testid="description-input" />
          </label>
          <label htmlFor="moeda">
            Moeda
            <select id="moeda" data-testid="currency-input">
              {currency.map((curr, i) => (curr.includes('USDT') ? null : (
                <option key={ i } data-testid={ curr }>
                  {curr}
                </option>
              )))}
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
    );
  }
}

Form.propTypes = {
  currency: PropTypes.array,
}.isRequired;

export default Form;
