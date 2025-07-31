import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import Login from './Login.tsx';
import { Provider } from 'react-redux';
import { store } from '../../store/store';

test('shows "Bad credentials" when user enters wrong personal token', async () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    </Provider>
  );
  const UsernameElement = screen.getByPlaceholderText('Username');
  const inputElement = screen.getByPlaceholderText('Password');
  const loginButton = screen.getByTestId('login-Button');
  await userEvent.type(UsernameElement, 'some__username');
  await userEvent.type(inputElement, 'something_which_is_definetely_not_a_token');
  await userEvent.click(loginButton);
  await waitFor(() => {
    expect(screen.getByText('Bad credentials')).toBeInTheDocument();
  });
});
