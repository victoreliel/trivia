import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { resetScore } from '../redux/action';

class Ranking extends Component {
  state = {
    players: [],
  };

  componentDidMount() {
    const dataPlayers = localStorage.getItem('ranking');
    const players = JSON.parse(dataPlayers);
    this.setState({ players });
  }

  goHome = () => {
    const { history, dispatch } = this.props;
    dispatch(resetScore());
    history.push('/');
  };

  render() {
    const { players } = this.state;
    return (
      <div>
        <h2 data-testid="ranking-title">Ranking</h2>
        <ol>
          {
            players
              .sort((a, b) => b.score - a.score)
              .map((player, idx) => {
                const { name, imgSrc, score } = player;
                return (
                  <ul key={ idx }>
                    <li>
                      <img
                        src={ `https://www.gravatar.com/avatar/${imgSrc}` }
                        alt="User avatar"
                      />
                    </li>
                    <li
                      data-testid={ `player-name-${idx}` }
                    >
                      {name}
                    </li>
                    <li
                      data-testid={ `player-score-${idx}` }
                    >
                      {score}
                    </li>
                  </ul>
                );
              })
          }
        </ol>
        <section>
          <div
            data-testid="ranking-title"
          >
            Ranking
          </div>
          <div>
            <button
              type="button"
              data-testid="btn-go-home"
              onClick={ this.goHome }
            >
              Início
            </button>
          </div>
        </section>
      </div>
    );
  }
}

Ranking.propTypes = {
  dispatch: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default connect()(Ranking);
