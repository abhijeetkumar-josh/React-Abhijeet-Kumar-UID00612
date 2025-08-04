import SearchBar from '@components/SearchBar/SearchBar.tsx';
import UserCard from '@Profile/UserCard.tsx';
import { useState } from 'react';
import '@components/SearchBar/SearchBar.css';
import '@Profile/UserCard.css';
import './Wrapper.css';
import { UserData } from '@Profile/UserCard';
import { getUserByUsername } from '@Services/githubServices.tsx';

const Wrapper = () => {
  const [searchNumber,setSearchNumber]=useState(0)
  const [UserInfo, setUserInfo] = useState<Partial<UserData>>({});
  const handleSearch = async (query: string) => {
    if(searchNumber===0){
       setSearchNumber(1)
    }
    try {
      const data = await getUserByUsername(query);
      if (data) {
        setUserInfo(data);
      } else {
        setUserInfo({});
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      setUserInfo({});
    }
  };

  return (
    <div>
      <div className="flex--center">
        <h1>GitHub User Search</h1>
      </div>
      <SearchBar onSearch={handleSearch} />
      {UserInfo.login ? (
        <UserCard user={UserInfo} />): (
          <>
            <div className='card__container'>
                {searchNumber!==0?(<h2 className='flex--center'>User Does not Exist </h2>):
                  <h2 className='flex--center'>Search for a User</h2>
                }
            </div>
          </>
      )}
    </div>
  );
};

export default Wrapper;
