import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Form from '../components/Form';
import Table from '../components/Table';

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
      <>
        <header data-testid="email-field">
          <h3>{email}</h3>
          <span data-testid="total-field">0</span>
          <span data-testid="header-currency-field"> BRL</span>
        </header>
        <Form currency={ currency } />
        <Table />
      </>
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
