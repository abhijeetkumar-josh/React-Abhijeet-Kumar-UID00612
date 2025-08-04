import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import UserCard from './UserCard.tsx';
test('renders user information correctly', () => {
  const dummyUser = {
    avatar_url: 'https://avatars.githubusercontent.com/u/583231?v=4',
    login: 'octocat',
    location: 'San Francisco',
    followers: 1000,
    bio: "GitHub's official mascot",
    html_url: 'https://github.com/octocat',
    blog: 'https://github.blog',
    email: 'octocat@github.com',
  } as const;
  render(
    <BrowserRouter>
      <UserCard user={dummyUser}></UserCard>
    </BrowserRouter>
  );
  expect(screen.getByText(/@octocat/i)).toBeInTheDocument();
  expect(screen.getByText(/San Francisco/i)).toBeInTheDocument();
  expect(screen.getByText(/1000/i)).toBeInTheDocument();
  expect(screen.getByText(/GitHub's official mascot/i)).toBeInTheDocument();
  expect(screen.getByText('https://github.com/octocat')).toBeInTheDocument();
  expect(screen.getByText('octocat@github.com')).toBeInTheDocument();
});
