// import React from 'react'
import SearchBar from "../SearchBar/SearchBar.tsx";
import UserCard from "../Profile/UserCard.tsx";
import { useState } from "react";
import './SearchBar.css'
import './UserCard.css'
import './Wrapper.css'
import { useNavigate} from "react-router-dom";

const Wrapper = () => {
  const navigate=useNavigate()
  // const dummyUser: object = {
  //   avatar_url: "https://avatars.githubusercontent.com/u/583231?v=4",
  //   login: "octocat",
  //   location: "San Francisco",
  //   followers: 1000,
  //   bio: "GitHub's official mascot",
  //   html_url: "https://github.com/octocat",
  //   blog: "https://github.blog",
  //   email: "octocat@github.com",
  // };
  const [UserInfo,setUserData]=useState<object>({})
  const handleSearch = (query: string)=> {
    fetch(`https://api.github.com/users/${query}`)
    .then(response=>response.json())
    .then(function (data){
      if(data.login) setUserData(data)
      else setUserData({})
    })
    .catch(error=>console.error(error))
  };

  const handleSubmit=(e:React.SyntheticEvent)=>{
    e.preventDefault()
    navigate('/login')
  }
  
  return (
    <div>
      <div className="Heading">
        <h1>GitHub User Search</h1>
        <button onClick={handleSubmit} className="primary__button">Login</button>
      </div>
      <SearchBar onSearch={handleSearch} />
      {Object.keys(UserInfo).length >3?<UserCard user={UserInfo}></UserCard>:
        <h2 className="no_profile">No profile to show</h2>}
    </div>
  );
};

export default Wrapper
