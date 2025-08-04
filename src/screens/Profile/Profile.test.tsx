import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Profile from './Profile';
import { BrowserRouter } from 'react-router-dom';

describe('Profile Component', () => {
  it('renders user login from redux state', () => {
    const mockUser = {
      login: 'mockuser',
      avatar_url: 'https://example.com/avatar.png',
      html_url: 'https://github.com/mockuser',
    };

    const store = configureStore({
      reducer: {
        auth: () => ({
          user: mockUser,
          isAuthenticated: true,
        }),
      },
    });
    
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Profile />
        </BrowserRouter>
      </Provider>
    );
    screen.debug();
    expect(screen.getByText(/Welcome, mockuser/i)).toBeInTheDocument();
  });
});
