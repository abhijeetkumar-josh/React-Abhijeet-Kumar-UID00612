import { render, screen, fireEvent } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import SearchBar from './SearchBar';
import '@testing-library/jest-dom';
import { vi } from 'vitest';

test('calls onClick when button is clicked', async () => {
  const handleSearch = vi.fn();

  render(<SearchBar onSearch={handleSearch}></SearchBar>);
  const inputElement = screen.getByPlaceholderText('Search GitHub Users...');
  const buttonElement = screen.getByText('Search');
  fireEvent.change(inputElement, { target: { value: 'torvaldsisadvndvuenbfrv' } });
  await userEvent.click(buttonElement);
  expect(handleSearch).toHaveBeenCalledTimes(1);
  expect(handleSearch).toHaveBeenCalledWith('torvaldsisadvndvuenbfrv');
});
