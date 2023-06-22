import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import mockToken from './helpers/mockToken';
import mockQuest from './helpers/mockQuest';
import mockLocalStorage from './helpers/mockLocalStorage';
import App from '../App';

const idName = 'input-player-name';
const idEmail = 'input-gravatar-email';

describe('testa a pagina de Login', () => {
  test('se o form de login funciona', () => {
    renderWithRouterAndRedux(<App />);

    const inputName = screen.getByTestId(idName);
    const inputEmail = screen.getByTestId(idEmail);
    const btnPlay = screen.getByTestId('btn-play');

    expect(btnPlay).toHaveAttribute('disabled');
    userEvent.type(inputName, 'name');
    expect(btnPlay).toHaveAttribute('disabled');
    userEvent.clear(inputName);
    userEvent.type(inputEmail, 'email');
    expect(btnPlay).toHaveAttribute('disabled');
    userEvent.type(inputName, 'name');
    expect(btnPlay).not.toHaveAttribute('disabled');
  });

  test('se ao clicar no botão a API é chamada', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValueOnce({
      json: async () => mockToken,
    });

    renderWithRouterAndRedux(<App />);

    const inputName = screen.getByTestId(idName);
    const inputEmail = screen.getByTestId(idEmail);
    const btnPlay = screen.getByTestId('btn-play');

    userEvent.type(inputName, 'name');
    userEvent.type(inputEmail, 'email');
    userEvent.click(btnPlay);

    global.fetch.mockResolvedValueOnce({
      json: async () => mockQuest,
    });

    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  test('se a chave token é salva no localStorage', () => {
    global.localStorage = mockLocalStorage;

    jest.spyOn(window, 'fetch');
    fetch.mockResolvedValue({
      json: async () => mockToken,
    });

    renderWithRouterAndRedux(<App />);

    const inputName = screen.getByTestId(idName);
    const inputEmail = screen.getByTestId(idEmail);
    const btnPlay = screen.getByTestId('btn-play');

    userEvent.type(inputName, 'name');
    userEvent.type(inputEmail, 'email');
    userEvent.click(btnPlay);

    global.fetch.mockResolvedValueOnce({
      json: async () => mockQuest,
    });

    expect(localStorage.setItem).toHaveBeenCalledWith('token');
  });

  test('se existe um botão para ', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const btnSettings = screen.getByTestId('btn-settings');

    userEvent.click(btnSettings);

    expect(history.location.pathname).toBe('/Settings');

    const titleSettings = screen.getByTestId('settings-title');

    expect(titleSettings).toBeInTheDocument();
  });
});
