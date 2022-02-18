import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Form from '../components/Form';
import Table from '../components/Table';
import Header from '../components/Header';

class Wallet extends React.Component {
  render() {
    const { email } = this.props;

    return (
      <>
        <Header email={ email } />
        <Form />
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
