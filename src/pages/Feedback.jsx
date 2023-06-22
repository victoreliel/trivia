import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { localStorageRanking } from '../services/fetchApi';
import { resetScore } from '../redux/action';

class Feedback extends Component {
  playAgain = () => {
    const { history, dispatch } = this.props;
    dispatch(resetScore());
    history.push('/');
  };

  redirectRanking = () => {
    const { history, user, score } = this.props;

    const newPlayer = {
      name: user.name,
      imgSrc: user.imgSrc,
      score,
    };
    localStorageRanking(newPlayer);

    history.push('/ranking');
  };

  render() {
    const { assertions, score } = this.props;
    const minAnswers = 3;
    return (
      <div>
        <Header />
        <p
          data-testid="feedback-text"
        >
          { assertions < minAnswers ? 'Could be better...' : 'Well Done!' }
        </p>
        <p data-testid="feedback-total-score">
          {score}
        </p>
        <p data-testid="feedback-total-question">
          {assertions}
        </p>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ this.playAgain }
        >
          Play Again
        </button>
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ this.redirectRanking }
        >
          Ranking
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
  user: state.player.user,
});

Feedback.propTypes = {
  dispatch: PropTypes.func,
  assertions: PropTypes.number,
  score: PropTypes.number,
  user: PropTypes.shape({}),
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default connect(mapStateToProps)(Feedback);
