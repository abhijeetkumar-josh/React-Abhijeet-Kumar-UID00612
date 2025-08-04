import React, { useEffect, useState ,useRef} from 'react';
import { useDispatch } from 'react-redux';
import { updateUserFields } from '@store/authSlice';
import {
  getFollowers,
  getSuggestedUsers,
  followUser,
  isFollowingUser,
} from '@Services/githubServices';
import './FollowerList.css';
import { UserData } from './UserCard';

interface FollowerListProps {
  username: UserData;
  authToken: string;
}

function getRandomNumber(min = 0, max = 100000000): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const per_page = 30;

const FollowerList: React.FC<FollowerListProps> = ({ username, authToken}) => {
  const [followers, setFollowers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(false);
  const [suggestedUsers, setSuggestedUsers] = useState<UserData[]>([]);
  const [since, setSince] = useState<number>(getRandomNumber());
  const [isUserFollowing, setIsUserFollowing] = useState<Record<string, boolean>>({});
  const [page, setPage] = useState<number>(1);
  const dispatch=useDispatch();
  const prevRef=useRef<HTMLButtonElement>(null)
  const nextRef=useRef<HTMLButtonElement>(null)


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
        setSuggestedUsers(data);
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
      dispatch(updateUserFields({...username,following:(username.following?username.following:0)+1}));
    } catch (err) {
      console.error(`Error following ${targetUsername}:`, err);
    }
  };

  const handleRefresh = () => setSince(getRandomNumber());

  useEffect(() => {
    const checkFollowingStatus = async () => {
      const statusMap: Record<string, boolean> = {};

      await Promise.all(
        suggestedUsers.map(async (follower) => {
          const isFollowing = await isFollowingUser(follower.login, authToken);
          statusMap[follower.login] = isFollowing;
        })
      );

      setIsUserFollowing(statusMap);
    };

    if (suggestedUsers.length > 0) checkFollowingStatus();
  }, [suggestedUsers, authToken]);

  const handlePrev = () => {
    if (page > 1){
      setPage(page - 1);
      nextRef!.current!.classList.remove('disable');
    }
    else{
      prevRef!.current!.classList.add('disable');
    }
  };

  const handleNext = () => {
    if (page < Math.ceil(username.followers/ per_page)){
      setPage(page + 1);
      prevRef!.current!.classList.remove('disable');
    }
    else{
      nextRef!.current!.classList.add('disable');
    }
  };

  useEffect(() => {
    if(page === Math.ceil(username.followers/ per_page)) nextRef!.current!.classList.add('disable');
    if(page === 1) prevRef!.current!.classList.add('disable');
  }, []);

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
        {loading && followers.length === 0 && <p>No followers found.</p>}
        <div className="button--container flex--spaced">
          <button onClick={handlePrev} ref={prevRef} className="primary--button">
            prev
          </button>
          <button onClick={handleNext} ref={nextRef} className="primary--button">
            next
          </button>
        </div>
      </div>
      <div className="follow__list">
        <div className="flex--spaced">
          <h2>Who to Follow</h2>
          <button onClick={handleRefresh} className="primary--button">
            refresh
          </button>
        </div>
        <ul className="follower-list">
          {suggestedUsers.map((follower) => (
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
                    ? 'follow-button primary--button active disable'
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
