import SearchBar from '@components/SearchBar/SearchBar.tsx';
import UserCard from '@profile/UserCard.tsx';
import { useState } from 'react';
import '@components/SearchBar/SearchBar.css';
import '@profile/UserCard.css';
import './Wrapper.css';
import { getUserByUsername } from '@services/githubServices.tsx';

const Wrapper = () => {
  const [UserInfo, setUserData] = useState<object>({});
  const handleSearch = async (query: string) => {
    const data = await getUserByUsername(query);
    if (data.login) {
      setUserData(data);
    } else {
      setUserData({});
    }
  };

  return (
    <div>
      <div className="flex--center">
        <h1>GitHub User Search</h1>
      </div>
      <SearchBar onSearch={handleSearch} />
      {Object.keys(UserInfo).length > 3 ? (
        <UserCard user={UserInfo}></UserCard>
      ) : (
        <h2 className="no_profile">No profile to show</h2>
      )}
    </div>
  );
};

export default Wrapper;
