import React, { useEffect, useState } from 'react';
import {
  getFollowers,
  getSuggestedUsers,
  followUser,
  isFollowingUser,
} from '@services/githubServices';
import './FollowerList.css';
import { UserData } from './UserCard';

interface FollowerListProps {
  username: UserData;
  authToken: string;
  setUser: React.Dispatch<React.SetStateAction<UserData>>;
}

function getRandomNumber(min = 0, max = 100000000): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const per_page = 30;

const FollowerList: React.FC<FollowerListProps> = ({ username, authToken, setUser }) => {
  const [followers, setFollowers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(false);
  const [follow, setFollower] = useState<UserData[]>([]);
  const [since, setSince] = useState<number>(getRandomNumber);
  const [isUserFollowing, setIsUserFollowing] = useState<Record<string, boolean>>({});
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    const fetchFollowers = async () => {
      setLoading(true);
      try {
        const data = await getFollowers(username.login, authToken, page, per_page);
        setFollowers(data);
      } catch (err) {
        console.error('Error fetching followers:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchFollowers();
  }, [username.login, authToken, page]);

  useEffect(() => {
    const fetchFollower = async () => {
      try {
        const data = await getSuggestedUsers(since, authToken, per_page);
        setFollower(data);
      } catch (err) {
        console.error('Error fetching suggestions:', err);
      }
    };
    fetchFollower();
  }, [since, authToken]);

  const handleFollow = async (targetUsername: string) => {
    try {
      await followUser(targetUsername, authToken);
      setIsUserFollowing((prev) => ({ ...prev, [targetUsername]: true }));
      setUser((prev: UserData) => ({
        ...prev,
        following: (prev.following || 0) + 1,
      }));
    } catch (err) {
      console.error(`Error following ${targetUsername}:`, err);
    }
  };

  const handleRefresh = () => setSince(getRandomNumber());

  useEffect(() => {
    const checkFollowingStatus = async () => {
      const statusMap: Record<string, boolean> = {};

      await Promise.all(
        follow.map(async (follower) => {
          const isFollowing = await isFollowingUser(follower.login, authToken);
          statusMap[follower.login] = isFollowing;
        })
      );

      setIsUserFollowing(statusMap);
    };

    if (follow.length > 0) checkFollowingStatus();
  }, [follow, authToken]);

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (Math.ceil(username.followers / per_page) < page) setPage(page + 1);
  };

  return (
    <div className="flex--spaced">
      <div className="follow__list">
        <h2>{username.login}'s Followers</h2>
        {loading && <p>Loading followers...</p>}
        {!loading && followers.length === 0 && <p>No followers found.</p>}
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {followers.map((follower) => (
            <li
              key={follower.login}
              style={{ marginBottom: '16px', display: 'flex', alignItems: 'center' }}
            >
              <img
                src={follower.avatar_url}
                alt={follower.login}
                style={{ width: 40, height: 40, borderRadius: '50%', marginRight: 10 }}
              />
              <a
                href={follower.html_url}
                target="_blank"
                rel="noreferrer"
                style={{ marginRight: 'auto' }}
              >
                {follower.login}
              </a>
            </li>
          ))}
        </ul>
        {!loading && followers.length !== 0 && <p>No followers found.</p> && (
          <div className="button--container flex--spaced">
            <button onClick={handlePrev} className="primary--button">
              prev
            </button>
            <button onClick={handleNext} className="primary--button">
              next
            </button>
          </div>
        )}
      </div>
      <div className="follow__list">
        <div className="flex--spaced">
          <h2>Who to Follow</h2>
          <button onClick={handleRefresh} className="primary--button">
            refresh
          </button>
        </div>
        <ul className="follower-list">
          {follow.map((follower) => (
            <li key={follower.login} className="follower-item">
              <img src={follower.avatar_url} alt={follower.login} className="follower-avatar" />
              <a
                href={follower.html_url}
                target="_blank"
                rel="noreferrer"
                className="follower-link"
              >
                {follower.login}
              </a>
              <button
                onClick={() => handleFollow(follower.login)}
                disabled={isUserFollowing[follower.login]}
                className={
                  isUserFollowing[follower.login]
                    ? 'follow-button primary--button active'
                    : 'follow-button primary--button not-active'
                }
              >
                {isUserFollowing[follower.login] ? 'Following' : 'Follow'}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FollowerList;
