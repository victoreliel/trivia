const INITIAL_STATE = { user: {
  name: '',
  email: '',
  imgSrc: '',
},
score: 0,
assertions: 0,
};

function player(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'LOGIN':
    return { ...state,
      user: {
        name: action.name,
        email: action.email,
        imgSrc: action.imgSrc,
      } };
  case 'UPDATE_SCORE':
    return { ...state,
      score: action.score + state.score,
      assertions: state.assertions + 1,
    };
  case 'RESET_SCORE':
    return {
      ...state,
      score: 0,
    };
  default:
    return state;
  }
}

export default player;
