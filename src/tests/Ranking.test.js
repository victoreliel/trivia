import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

const initialState = {
  player: {
    name:"Jensen",
    score:166,
    assertions:2,
    gravatarEmail:"jensen123@email.com",
    imgSrc:"https://www.gravatar.com/avatar/d376b9e54203b12ba5bf8490232714d5",
  }
}

describe('Testes encima da pagina de Ranking', () => {
  test('Testa se a página ranking existe, e é renderizada sem nenhum jogador', () => {
    localStorage.setItem('ranking', JSON.stringify([]));
    renderWithRouterAndRedux(<App />, initialState, '/ranking');
  })
  test('Testa se a página ranking é renderizada com usuários', () => {
    localStorage.setItem('ranking', JSON.stringify([
      { name: 'Jensen', score: 156, picture: 'url_da_foto_no_gravatar' }, 
      { name: 'Oliva', score: 1, picture: 'url_da_foto_no_gravatar_2' },
    ]));
    renderWithRouterAndRedux(<App />, initialState, '/ranking');

  })

  test('Testa a página ranking é renderizada com usuários, ordenando pelos pontos', () => {
    localStorage.setItem('ranking', JSON.stringify([
      { name: 'Jensen', score: 156, picture: 'url_da_foto_no_gravatar' }, 
      { name: 'Oliva', score: 1, picture: 'url_da_foto_no_gravatar_2' },
    ]));
    renderWithRouterAndRedux(<App />, initialState, '/ranking');
  })


  test('Verifica se a página ranking contem o botão para voltar a página inicial', () => {
    const {history} = renderWithRouterAndRedux(<App />, initialState, '/ranking');
    const buttonHome = screen.getByText('Início');
    userEvent.click(buttonHome);
    expect(history.location.pathname).toBe('/');
  })
});