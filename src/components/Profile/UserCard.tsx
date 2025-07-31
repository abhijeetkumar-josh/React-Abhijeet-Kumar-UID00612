import React from 'react';
import './UserCard.css';

export interface UserData {
  avatar_url: string;
  login: string;
  location?: string;
  followers: number;
  bio?: string;
  html_url: string;
  blog?: string;
  email?: string;
  following?: number;
}

export interface UserCardProps {
  user: Partial<UserData>;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <div className="usercard">
      <img src={user.avatar_url} alt="Avatar" className="usercard__avatar" />
      <div className="usercard__info">
        <h2 className="usercard__username">@{user.login}</h2>
        {user.location && (
          <p>
            <strong> Location:</strong> {user.location}
          </p>
        )}
        <p className="usercard__para-tag">
          <strong> Followers:</strong> {user.followers}
        </p>
        <p className="usercard__para-tag">
          <strong> Following:</strong> {user.following}
        </p>
        {user.bio && (
          <p>
            <strong> Bio:</strong> {user.bio}
          </p>
        )}
        <p className="usercard__para-tag">
          <strong> GitHub:</strong>{' '}
          <a
            className="usercard__anchor-tag"
            href={user.html_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {user.html_url}
          </a>
        </p>
        {user.blog && (
          <p className="usercard__para-tag">
            <strong> Blog:</strong>{' '}
            <a
              className="usercard__anchor-tag"
              href={user.blog}
              target="_blank"
              rel="noopener noreferrer"
            >
              {user.blog}
            </a>
          </p>
        )}
        {user.email && (
          <p className="usercard__para-tag">
            <strong> Email:</strong> {user.email}
          </p>
        )}
      </div>
    </div>
  );
};

export default UserCard;
