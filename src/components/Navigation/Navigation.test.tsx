import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import Navbar from './Navigation';

const renderWithProviders = (isAuthenticated: boolean, initialRoute: string = '/') => {
  const store = configureStore({
    reducer: {
       auth: () => ({
        user: null,
        isAuthenticated,
        loading: false,
        error: null,
        token: null,
      })
    },
  });

  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[initialRoute]}>
        <Navbar />
      </MemoryRouter>
    </Provider>
  );
};

describe('Navbar', () => {
  it('renders Home, Profile, Login links when not authenticated', () => {
    renderWithProviders(false);

    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/Profile/i)).toBeInTheDocument();
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
  });

  it('renders Logout when authenticated and on /profile', () => {
    renderWithProviders(true, '/profile');

    expect(screen.getByText(/Logout/i)).toBeInTheDocument();
  });

  it('renders Home, Profile, Login when authenticated but not on /profile', () => {
    renderWithProviders(true, '/');

    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/Profile/i)).toBeInTheDocument();
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
  });
});
