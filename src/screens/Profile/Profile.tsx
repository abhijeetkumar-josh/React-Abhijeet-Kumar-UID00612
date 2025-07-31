import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@store/store.tsx';
import UserCard from '@profile/UserCard.tsx';
import FollowerList from '@profile/FollowerList.tsx';
import { UserData } from '@profile/UserCard.tsx';
import './Profile.css';

const Profile: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [User, setUser] = useState<UserData>(user);
  const { token } = useSelector((state: RootState) => state.auth);
  return (
    <div>
      <div className="profile__header flex--spaced">
        <h2>Welcome, {User?.login}</h2>
      </div>
      <div className="profile__content flex--spaced">
        <UserCard user={User}></UserCard>
      </div>
      <div className="profile__following flex--center">
        <div>
          {token ? (
            <FollowerList username={User} authToken={token} setUser={setUser}></FollowerList>
          ) : (
            'Login to see the followers list'
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
