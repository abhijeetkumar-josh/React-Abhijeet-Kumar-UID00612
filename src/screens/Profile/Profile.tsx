import { useSelector } from 'react-redux';
import { RootState } from '@store/store.tsx';
import UserCard from '@Profile/UserCard.tsx';
import FollowerList from '@Profile/FollowerList.tsx';
import './Profile.css';

const Profile: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { token } = useSelector((state: RootState) => state.auth);
  return (
    <div>
      <div className="profile__header flex--spaced">
        <h2>Welcome, {user?.login}</h2>
      </div>
      <div className="profile__content flex--spaced">
        <UserCard user={user || {}}></UserCard>
      </div>
      <div className="profile__following flex--center">
        <div>
          {token ? (
            <FollowerList username={user} authToken={token} ></FollowerList>
          ) : (
            'Login to see the followers list'
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
