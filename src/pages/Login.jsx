import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actionLogin } from '../actions';
import Input from '../components/Input';

const PWORD_LENGTH = 6;

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      disableBtn: true,
    };
  }

  emailValidation = (email) => {
    // email validation from https://www.horadecodar.com.br/2020/09/13/como-validar-email-com-javascript/
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => {
      const { email, password } = this.state;
      const pwordOk = password.length >= PWORD_LENGTH;
      const emailOk = this.emailValidation(email);
      const enableBtn = pwordOk && emailOk;
      this.setState({ disableBtn: !enableBtn });
    });
  };

  handleClick = () => {
    const { history, dispatchSetValue } = this.props;
    dispatchSetValue(this.state);
    history.push('/carteira');
  };

  render() {
    const { email, password, disableBtn } = this.state;

    return (
      <fieldset>
        <Input
          type="email"
          testId="email-input"
          name="email"
          value={ email }
          placeHolder="Email"
          onchange={ this.handleChange }
        />
        <Input
          type="password"
          testId="password-input"
          name="password"
          value={ password }
          placeHolder="Senha"
          onchange={ this.handleChange }
        />
        <button type="submit" disabled={ disableBtn } onClick={ this.handleClick }>
          Entrar
        </button>
      </fieldset>
    );
  }
}

Login.propTypes = {
  dispatchSetValue: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  dispatchSetValue: ({ email }) => dispatch(actionLogin(email)),
});

export default connect(null, mapDispatchToProps)(Login);
