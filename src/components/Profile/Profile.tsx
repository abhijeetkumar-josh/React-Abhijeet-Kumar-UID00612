import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/authSlice.tsx';
import { RootState, AppDispatch } from '../../store/store.tsx';
import { useNavigate } from 'react-router-dom';
import UserCard from './UserCard.tsx';
import FollowerList from './FollowerList.tsx';
import { UserData } from './UserCard.tsx';
import './Profile.css'

const Profile: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);
  const [User,setUser]=useState<UserData>(user)
  const token:string|null =localStorage.getItem('token');
  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };
  console.log(user);
  return (
    <div>
      <div className="profile__header">
        <h2>Welcome, {User?.login}</h2>
        <button className="profile__button" onClick={handleLogout} >Logout</button>
      </div>
      <div className="profile__content">
        <UserCard user={User}></UserCard>
      </div>
      <div className="profile__following">
          <div>
            {token?<FollowerList username={User} authToken={token} 
              setUser={setUser}></FollowerList>:"Login to see the followers list"}
          </div>
        </div>
    </div>
  );
};

export default Profile;
