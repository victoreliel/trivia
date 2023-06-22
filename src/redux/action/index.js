import md5 from 'crypto-js/md5';

export const login = (userInfo) => ({
  type: 'LOGIN',
  name: userInfo.name,
  email: userInfo.email,
  imgSrc: userInfo.imgSrc,
});

export const resetScore = () => ({
  type: 'RESET_SCORE',
});

export const fetchGravatar = (userInfo) => async (dispatch) => {
  const hash = md5(userInfo.email).toString();
  // const response = await fetch(`https://br.gravatar.com/site/implement/${hash}/`);
  // const imgSrc = await response.json();

  userInfo.imgSrc = hash;

  dispatch(login(userInfo));
};

export const updateScore = (score) => ({
  type: 'UPDATE_SCORE',
  score,
});
