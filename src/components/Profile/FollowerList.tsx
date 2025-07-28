import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './FollowerList.css'
import { UserData } from './UserCard';

interface FollowerListProps {
  username: UserData;
  authToken: string;
  setUser:Function;
}
const per_page:number=30;

function getRandomNumber(min: number=0, max: number=100000000): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const FollowerList: React.FC<FollowerListProps> = ({ username, authToken ,setUser}) => {
  const [followers, setFollowers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(false);
  const [followed, setFollowed] = useState<string[]>([]);
  const [follow,setFollower]=useState<UserData[]>([]);
  const [since,setSince]=useState<number>(getRandomNumber);
  const [isUserFollowing, setIsUserFollowing] = useState<Record<string, boolean>>({});
  const [page,setPage]=useState<number>(1);


  useEffect(() => {
    const fetchFollowers = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`https://api.github.com/users/${username.login}/followers?per_page=${per_page}&page=${page}`,
            {
              headers: {
                Authorization: `token ${authToken}`,
                Accept: 'application/vnd.github+json',
              },
            }
        );
        setFollowers(res.data);
      } catch (err) {
        console.error('Error fetching followers:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFollowers();
  }, [username.login,authToken,page]);

  useEffect(() => {
    const fetchFollower = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`https://api.github.com/users?since=${since}&$per_page=${per_page}`,
            {
              headers: {
                Authorization: `token ${authToken}`,
                Accept: 'application/vnd.github+json',
              },
            }
        );
        setFollower(res.data);
      } catch (err) {
        console.error('Error fetching followers:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchFollower();
  }, [since,authToken]);

  const handleFollow = async (targetUsername: string) => {
    try {
      await axios.put(
        `https://api.github.com/user/following/${targetUsername}`,
        {},
        {
          headers: {
            Authorization: `token ${authToken}`,
            Accept: 'application/vnd.github+json',
          },
        }
      );
    console.log(targetUsername);
    setIsUserFollowing(prev => ({
      ...prev,
      [targetUsername]: true,
    }));
      setUser((prev:UserData) => ({
       ...prev,
       following: (prev.following || 0) + 1,
    }));
      setFollowed((prev) => [...prev, targetUsername]);
    } catch (err) {
      console.error(`Error following ${targetUsername}:`, err);
    }
  };

  const handleRefresh= async () => {
    setSince(getRandomNumber)
  };

    useEffect(() => {
      const checkFollowingStatus = async () => {
        const statusMap: Record<string, boolean> = {};
    
        await Promise.all(
          follow.map(async (follower) => {
            try {
              const res = await axios.get(`https://api.github.com/user/following/${follower.login}`,
                {
                  headers: {
                    Authorization: `token ${authToken}`,
                    Accept: 'application/vnd.github+json',
                  },
                }
              );
              statusMap[follower.login] = res.status === 204;
              console.log(follower.login+" "+res.status);
            } catch {
              statusMap[follower.login] = false;
              console.log(follower.login+" "+404);
            }
          })
        );
        setIsUserFollowing(statusMap);
      };
      if (follow.length > 0) checkFollowingStatus();
    }, [follow,authToken]);

   const handlePrev=()=>{
      if(page>=1) setPage(page-1);
   }
   
   const handleNext=()=>{
      if(page<Math.ceil(username.followers/per_page)) setPage(page+1);
   }

  return (
    <div className="follow">
    <div className="follow__list">
      <h2>{username.login}'s Followers</h2>
      {loading && <p>Loading followers...</p>}
      {!loading && followers.length === 0 && <p>No followers found.</p>}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {followers.map((follower) => (
          <li key={follower.login} 
              style={{ marginBottom: '16px', display: 'flex', alignItems: 'center' }}>
            <img
              src={follower.avatar_url}
              alt={follower.login}
              style={{ width: 40, height: 40, borderRadius: '50%', marginRight: 10 }}
            />
            <a href={follower.html_url} target="_blank" rel="noreferrer" 
                style={{ marginRight: 'auto' }}>
              {follower.login}
            </a>
          </li>
        ))}
      </ul>
      {!loading && followers.length !== 0 && <p>No followers found.</p> && 
        <div className="button__container">
        <button onClick={handlePrev} className="prev__button">
           prev
        </button>
        <button onClick ={handleNext} className="next__button">
           next
        </button>
      </div>}
    </div>
    <div className="follow__list">
        <div className="follow__refresh">
            <h2>Who to Follow</h2>
            <button onClick={handleRefresh} className="refresh__button">refresh</button>
        </div>
        <ul style={{ listStyle: 'none', padding: 0 }}>
        {follow.map((follower) => (
          <li key={follower.login} 
              style={{ marginBottom: '16px', display: 'flex', alignItems: 'center' }}>
            <img
              src={follower.avatar_url}
              alt={follower.login}
              style={{ width: 40, height: 40, borderRadius: '50%', marginRight: 10 }}
            />
            <a href={follower.html_url} target="_blank" rel="noreferrer" 
               style={{ marginRight: 'auto' }}>
              {follower.login}
            </a>
            <button
              onClick={() => handleFollow(follower.login)}
              disabled={followed.includes(follower.login)}
              className={isUserFollowing[follower.login]?'active':'not-active'}
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
