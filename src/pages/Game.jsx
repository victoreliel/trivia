import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateScore } from '../redux/action';
import Header from '../components/Header';

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 0,
      questions: [{ randomAnswers: [] }],
      isAnswered: false,
      timer: 30,
    };
  }

  async componentDidMount() {
    const token = localStorage.getItem('token');
    const questionsRequest = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const questionsJson = await questionsRequest.json();
    if (questionsJson.response_code === 0) {
      const questions = questionsJson.results;
      for (let i = 0; i < questions.length; i += 1) {
        const allAnswers = [
          ...questions[i].incorrect_answers,
          questions[i].correct_answer,
        ];
        questions[i].randomAnswers = this.shuffleArray(allAnswers);
      }
      this.setState({
        questions,
      });
    } else {
      const { history } = this.props;
      history.push('/');
    }
  }

  componentDidUpdate() {
    const { timer, isAnswered } = this.state;
    if (!isAnswered && timer > 0) {
      this.timerQuestions();
    }
  }

  timerQuestions = () => {
    const { timer } = this.state;
    const TIME_OUT_QUESTIONS = 1000;

    setTimeout(() => {
      this.setState({ timer: timer - 1 });
    }, TIME_OUT_QUESTIONS);
  };

  shuffleArray = (arr) => {
    //  https://www.horadecodar.com.br/2021/05/10/como-embaralhar-um-array-em-javascript-shuffle/
    for (let i = arr.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  setAnswersColors = ({ target }) => {
    const getParent = target.parentElement;
    const correctAnswer = 'correct-answer';
    const answers = getParent.children;

    for (let i = 0; i < answers.length; i += 1) {
      answers[i].style.border = '3px solid red';
    }

    for (let i = 0; i < answers.length; i += 1) {
      if (answers[i].getAttribute('data-testid') === correctAnswer) {
        answers[i].style.border = '3px solid rgb(6, 240, 15)';
      }
    }

    this.setState({
      isAnswered: true,
    });

    if (target.getAttribute('data-testid') === correctAnswer) {
      const { dispatch } = this.props;
      dispatch(updateScore(this.scoreHandler()));
    }
  };

  scoreHandler = () => {
    const { timer, questions, index } = this.state;
    const scoreMin = 10;
    const tres = 3;
    switch (questions[index].difficulty) {
    case 'hard':
      return (timer * tres) + scoreMin;
    case 'medium':
      return (timer * 2) + scoreMin;
    default:
      return timer + scoreMin;
    }
  };

  nextQuestion = () => {
    const { index } = this.state;
    const MAX_INDEX = 4;
    if (index === MAX_INDEX) {
      const { history } = this.props;
      history.push('/feedback');
    }
    this.setState({
      isAnswered: false,
      index: index + 1,
      timer: 30,
    });
  };

  render() {
    const { questions, index, isAnswered, timer } = this.state;
    const isDisabledBtn = timer === 0;
    const nextBtnAbilitated = isAnswered || isDisabledBtn;
    return (
      <div>
        <Header />
        <h4>{ timer }</h4>
        <div>
          { questions !== undefined && questions.map((e) => (
            <div key={ e.question }>
              <p data-testid="question-category">{ e.category }</p>
              <p data-testid="question-text">{ e.question }</p>
              <section
                data-testid="answer-options"
              >
                {
                  questions[index].randomAnswers.map((answer, idx) => (
                    <button
                      key={ idx }
                      type="button"
                      disabled={ isDisabledBtn }
                      onClick={ this.setAnswersColors }
                      data-testid={
                        answer === questions[index].correct_answer ? (
                          'correct-answer'
                        ) : `wrong-answer-${idx}`
                      }
                    >
                      { answer }
                    </button>
                  ))
                }
              </section>
            </div>
          ))[index]}
        </div>

        {nextBtnAbilitated
        && (
          <button data-testid="btn-next" type="button" onClick={ this.nextQuestion }>
            Next
          </button>
        )}
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  dispatch: PropTypes.func,
}.isRequired;

export default connect()(Game);
