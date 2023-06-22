import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import fetchApi, { localStorageToken } from '../services/fetchApi';
import { fetchGravatar } from '../redux/action';

class Login extends React.Component {
  state = {
    playerName: '',
    playerEmail: '',
    btnDisabled: true,
  };

  handleChange = ({ target: { value, name } }) => {
    if (name === 'player-name') {
      this.setState({ playerName: value }, () => {
        const { playerName, playerEmail } = this.state;
        const isAblilit = playerName.length > 0 && playerEmail.length > 0;
        this.setState({ btnDisabled: !isAblilit });
      });
    } else if (name === 'player-email') {
      this.setState({ playerEmail: value }, () => {
        const { playerName, playerEmail } = this.state;
        const isAblilitTwo = playerName.length > 0 && playerEmail.length > 0;
        this.setState({ btnDisabled: !isAblilitTwo });
      });
    }
  };

  handleClickSettings = () => {
    const { history } = this.props;
    history.push('/Settings');
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { playerName, playerEmail } = this.state;
    const { history, startLogin } = this.props;
    const userInfo = { name: playerName,
      email: playerEmail,
    };

    startLogin(userInfo);
    const data = await fetchApi();
    localStorageToken(data.token);
    history.push('/game');
  };

  render() {
    const {
      playerName,
      playerEmail,
      btnDisabled,
    } = this.state;

    return (
      <form onSubmit={ this.handleSubmit }>
        <label htmlFor="player-name">
          Nome:
          <input
            type="text"
            value={ playerName }
            id="player-name"
            name="player-name"
            data-testid="input-player-name"
            onChange={ this.handleChange }
          />
        </label>

        <label htmlFor="player-email">
          Email:
          <input
            type="text"
            value={ playerEmail }
            id="player-email"
            name="player-email"
            data-testid="input-gravatar-email"
            onChange={ this.handleChange }
          />
        </label>

        <button
          type="submit"
          disabled={ btnDisabled }
          data-testid="btn-play"
        >
          Play
        </button>
        <button
          data-testid="btn-settings"
          type="button"
          onClick={ this.handleClickSettings }
        >
          Configurações
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  startLogin: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispacth) => ({
  startLogin: (userInfo) => dispacth(fetchGravatar(userInfo)),
});

export default connect(null, mapDispatchToProps)(Login);
