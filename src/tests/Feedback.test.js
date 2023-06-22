import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';

describe('Testes encima da pagina de feedbacks da aplicação', () => {
  test('Verifica se a rota está correta', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    expect(history.location.pathname).toBe('/');
    history.push('/feedback');
    const { pathname } = history.location;
    expect(pathname).toBe('/feedback');
    expect(history.location.pathname).toBe('/feedback');

  })
    test('Testa se o componente header no feedback, tem as informações do usuario', () => {
      const { history } = renderWithRouterAndRedux(<App />);
      expect(history.location.pathname).toBe('/');
      history.push('/Feedback');
      expect(history.location.pathname).toBe('/feedback');
      const imgUserGravatar = screen.getByTestId('header-profile-picture')
      const nameUser = screen.getByTestId('header-player-name');
      const scoreUser = screen.getByTestId('header-score');
      expect(nameUser).toBeInTheDocument();
      expect(imgUserGravatar).toBeInTheDocument();
      expect(scoreUser).toBeInTheDocument();
    });

  test('Verifica se existe o botão de "Play Again"', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    expect(history.location.pathname).toBe('/');
    history.push('/feedback');
    expect(history.location.pathname).toBe('/feedback');
    const playAgainBtn = screen.getByTestId('btn-play-again');
    expect(playAgainBtn).toBeInTheDocument();
    userEvent.click(playAgainBtn);
    expect(history.location.pathname).toBe('/');
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  })
  test('Verifica se existe o botão de "Ranking"', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    expect(history.location.pathname).toBe('/');
    history.push('/feedback');
    expect(history.location.pathname).toBe('/feedback');
    const rankingBtn = screen.getByTestId('btn-ranking');
    expect(rankingBtn).toBeInTheDocument();
    userEvent.click(rankingBtn);
    expect(history.location.pathname).toBe('/ranking');
    const { pathname } = history.location;
    expect(pathname).toBe('/ranking');
  })
})