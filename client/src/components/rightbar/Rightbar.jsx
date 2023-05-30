import "./rightbar.css";
import { Users } from "../../dummyData";
import Online from "../online/Online";
import { useContext, useEffect, useState } from "react";
import axios from 'axios'
import {Link} from 'react-router-dom'
import { AuthContext } from "../../context/AuthContext";
import { Add, Remove } from "@material-ui/icons";
import { publicRequest } from "../../Request";

export default function Rightbar({ users }) {

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const [friends, setFriends] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(
    currentUser?.followings?.includes(users?._id)
  );
  // console.log(users._id);

  useEffect(()=>{
    const getFriends = async () =>{
      try{
        const friendList = await publicRequest.get("api/user/friends/" + users?._id);
        setFriends(friendList.data);
        console.log(friendList.data);
      }catch(err){
        console.log(err);
      }
    }
    getFriends();
  },[users?._id])

  const handleClick = async () => {
    try {
      if (followed) {
        await axios.put(`http://localhost:8800/api/user/${users._id}/unfollow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: users._id });
      } else {
        await axios.put(`http://localhost:8800/api/user/${users._id}/follow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "FOLLOW", payload: users._id });
      }
      setFollowed(!followed);
    } catch (err) {
    }
  };

  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src="assets/gift.png" alt="" />
          <span className="birthdayText">
            <b>Pola Foster</b> and <b>3 other friends</b> have a birhday today.
          </span>
        </div>
        <img className="rightbarAd" src="assets/ad.png" alt="" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {Users.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
       {users.username !== currentUser.username && (
          <button className="rightbarFollowButton" onClick={handleClick}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <Remove /> : <Add />}
          </button>
        )}
        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{users.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{users.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">{users.relationship}</span>
          </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
          {friends?.map((friend) => (
            <Link to={"/profile/"+ friend.username} >

            <div className="rightbarFollowing" >
            <img
              src={friend.profilePic? PF+ friend.profilePic :  PF+"/person/noAvatar.png"}
              alt=""
              className="rightbarFollowingImg"
              />
            <span className="rightbarFollowingName" >{friend.username}</span>
          </div>
              </Link>
            ))}
        </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {users ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}
