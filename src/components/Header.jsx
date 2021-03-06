import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  totalExpenses = () => {
    const { expenses } = this.props;
    if (expenses.length === 0) return '0.00';

    return expenses.reduce((acc, curr) => {
      const { value, currency, exchangeRates } = curr;
      const quotation = exchangeRates[currency].ask;
      return (acc + (parseFloat(value) * parseFloat(quotation)));
    }, 0).toFixed(2);
  }

  render() {
    const { email } = this.props;
    return (
      <header data-testid="email-field">
        <h3>
          Olá,
          {' '}
          {email}
        </h3>
        <p>
          Despesa total: R$
          {' '}
          <span data-testid="total-field">{this.totalExpenses()}</span>
          <span data-testid="header-currency-field"> BRL</span>
        </p>
      </header>
    );
  }
}
Header.propTypes = {
  email: PropTypes.string,
}.isRequired;

Header.defaultProps = {
  expenses: [],
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
