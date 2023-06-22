export default async function fetchApi() {
  const URL = 'https://opentdb.com/api_token.php?command=request';
  const response = await fetch(URL);
  const data = await response.json();
  return data;
}

export function localStorageToken(token) {
  localStorage.setItem('token', token);
}

export function localStorageRanking(newPlayer) {
  const data = localStorage.getItem('ranking');
  let players = JSON.parse(data);
  if (data === null) {
    players = [];
  }
  const newPlayers = [...players, newPlayer];
  localStorage.setItem('ranking', JSON.stringify(newPlayers));
}
