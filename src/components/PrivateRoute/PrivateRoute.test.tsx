import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

const DummyComponent = () => <div>Private Content</div>;
const LoginComponent = () => <div>Login Page</div>;

const renderWithProviders = (isAuthenticated: boolean) => {
  const store = configureStore({
    reducer: {
      auth: () => ({ isAuthenticated }),
    },
  });

  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/protected']}>
        <Routes>
          <Route
            path="/protected"
            element={
              <PrivateRoute>
                <DummyComponent />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<LoginComponent />} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );
};

describe('PrivateRoute', () => {
  it('renders children when authenticated', () => {
    renderWithProviders(true);
    expect(screen.getByText('Private Content')).toBeInTheDocument();
  });

  it('redirects to login when not authenticated', () => {
    renderWithProviders(false);
    expect(screen.getByText('Login Page')).toBeInTheDocument();
  });
});
