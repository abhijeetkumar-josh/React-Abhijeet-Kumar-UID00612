import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import Wrapper from './Wrapper';
import '@testing-library/jest-dom';

test('shows "No profile to show" when invalid user is searched', async () => {
  render(
    <MemoryRouter>
      <Wrapper />
    </MemoryRouter>
  );
  const inputElement = screen.getByPlaceholderText('Search GitHub Users...');
  const searchButton = screen.getByText('Search');
  await userEvent.type(inputElement, 'invalid-user-12345-nonexistent');
  await userEvent.click(searchButton);
  await waitFor(() => {
    expect(screen.getByText(/No profile to show/i)).toBeInTheDocument();
  });
});
