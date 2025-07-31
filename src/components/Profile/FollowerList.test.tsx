import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import FollowerList from './FollowerList';
import { vi } from 'vitest';

const mockFollowers = [
  { login: 'john', avatar_url: 'john.jpg', html_url: 'https://github.com/john' },
  { login: 'jane', avatar_url: 'jane.jpg', html_url: 'https://github.com/jane' },
];

const mockSuggestions = [
  { login: 'alex', avatar_url: 'alex.jpg', html_url: 'https://github.com/alex' },
];

const mockUser = {
  login: 'torvalds',
  followers: 2,
  following: 0,
};

describe('<FollowerList />', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  vi.mock('../../Services/githubServices', async () => {
    return {
      getFollowers: () => Promise.resolve(mockFollowers),
      getSuggestedUsers: () => Promise.resolve(mockSuggestions),
      followUser: () => Promise.resolve(undefined),
      isFollowingUser: () => Promise.resolve(false),
    };
  });

  const mockSetUser = vi.fn();

  it('renders followers and suggested users', async () => {
    render(<FollowerList username={mockUser} authToken="fake-token" setUser={mockSetUser} />);

    await waitFor(() => {
      expect(screen.getByText(/torvalds's Followers/i)).toBeInTheDocument();
      expect(screen.getByText('john')).toBeInTheDocument();
      expect(screen.getByText('jane')).toBeInTheDocument();
      expect(screen.getByText('alex')).toBeInTheDocument();
    });
  });

  it('handles following a user', async () => {
    render(<FollowerList username={mockUser} authToken="fake-token" setUser={mockSetUser} />);

    await waitFor(() => screen.getByText('alex'));
    const followButton = screen.getByRole('button', { name: /follow/i });
    fireEvent.click(followButton);

    await waitFor(() => {
      expect(mockSetUser).toHaveBeenCalled();
      expect(screen.getByRole('button', { name: /following/i })).toBeDisabled();
    });
  });
});
