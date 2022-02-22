import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Table extends Component {
  onDeleteClick = () => {

  }

  renderTableRows = () => {
    const { expenses } = this.props;
    return expenses.map((expense) => {
      const { id, description, tag, method, value, currency, exchangeRates } = expense;
      const currencyName = exchangeRates[currency].name;
      const exchangeRate = parseFloat(exchangeRates[currency].ask);
      const convertedValue = (parseFloat(value) * exchangeRate).toFixed(2);
      const cells = [
        description,
        tag,
        method,
        parseFloat(value).toFixed(2),
        'Real',
        exchangeRate.toFixed(2),
        convertedValue,
        currencyName,
      ];
      const row = cells.map((cell, i) => <td key={ i }>{cell}</td>);

      return (
        <tr key={ id }>
          {row}
          <td>
            <button type="button" id={ id }>
              Editar
            </button>
          </td>
          <td>
            <button
              type="button"
              id={ id }
              data-testid="delete-btn"
              onClick={ this.onDeleteClick }
            >
              Excluir
            </button>
          </td>
        </tr>
      );
    });
  };

  render() {
    const { expenses } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th scope="col">Descrição</th>
            <th scope="col">Tag</th>
            <th scope="col">Método de pagamento</th>
            <th scope="col">Valor</th>
            <th scope="col">Moeda</th>
            <th scope="col">Câmbio utilizado</th>
            <th scope="col">Valor convertido</th>
            <th scope="col">Moeda de conversão</th>
            <th scope="col">Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>{expenses.length > 0 && this.renderTableRows()}</tbody>
      </table>
    );
  }
}
Table.propTypes = {
  expenses: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.object,
      ]),
    ),
  ),
};

Table.defaultProps = {
  expenses: [],
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
