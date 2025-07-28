import React from "react";
import "./UserCard.css";

export interface UserData {
  avatar_url: string;
  login: string;
  location?: string;
  followers: number;
  bio?: string;
  html_url: string;
  blog?: string;
  email?: string;
  following?:number;
}

export interface UserCardProps {
  user: Partial<UserData>;
}

const UserCard: React.FC<UserCardProps>= ({ user }) => {
  return (
    <div className="user-card">
      <img src={user.avatar_url} alt="Avatar" className="user-card__avatar" />
      <div className="user-card__info">
        <h2 className="user-card__username">@{user.login}</h2>
        {user.location && <p><strong>📍 Location:</strong> {user.location}</p>}
        <p><strong>👥 Followers:</strong> {user.followers}</p>
        <p><strong>👥 Following:</strong> {user.following}</p>
        {user.bio && <p><strong>🧠 Bio:</strong> {user.bio}</p>}
        <p>
          <strong>🔗 GitHub:</strong>{" "}
          <a href={user.html_url} target="_blank" rel="noopener noreferrer">
            {user.html_url}
          </a>
        </p>
        {user.blog && (
          <p>
            <strong>📰 Blog:</strong>{" "}
            <a href={user.blog} target="_blank" rel="noopener noreferrer">
              {user.blog}
            </a>
          </p>
        )}
        {user.email && <p><strong>✉️ Email:</strong> {user.email}</p>}
      </div>
    </div>
  );
};

export default UserCard;
