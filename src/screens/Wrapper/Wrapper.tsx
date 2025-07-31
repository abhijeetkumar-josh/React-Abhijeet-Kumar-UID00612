import SearchBar from "@components/SearchBar/SearchBar.tsx";
import UserCard from "@profile/UserCard.tsx";
import { useState } from "react";
import "@components/SearchBar/SearchBar.css";
import "@profile/UserCard.css";
import "./Wrapper.css";
import { getUserByUsername } from "@services/githubServices.tsx";
import { useNavigate } from "react-router-dom";

const Wrapper = () => {
  const navigate = useNavigate();
  const [UserInfo, setUserData] = useState<object>({});
  const handleSearch = async (query: string) => {
    const data = await getUserByUsername(query);
    if (data.login) {
      setUserData(data);
    } else {
      setUserData({});
    }
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    navigate("/login");
  };

  return (
    <div>
      <div className="">
        <div className="wrapper__header">
          <h1>GitHub User Search</h1>
          <button onClick={handleSubmit} className="primary--button primary--button__modifier">
            Login
          </button>
        </div>
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
