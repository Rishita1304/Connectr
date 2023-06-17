import React, { useEffect, useState } from 'react'
import './chatOnline.css'
import { publicRequest } from '../../Request'

const ChatOnline = ({ onlineUsers, currentId, setCurrentChat }) => {
  const [friends, setFriend] = useState([])
  const [onlineFriends, setOnlineFriend] = useState([])

  useEffect(()=>{
    const getFriends = async() => {
      const res = await publicRequest.get("/user/friends/" + currentId);
      setFriend(res.data)
    }
    getFriends(); 
  },[currentId]);

  useEffect(()=>{
    setOnlineFriend(friends.filter((f)=> onlineUsers.includes(f._id)))
  },[friends, onlineUsers])

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const handleClick = async(user) => {
    try{
      const res = await publicRequest.get(`/conversation/find/${currentId}/${user._id}`)
      setCurrentChat(res.data)
    }catch(err){
      console.log(err);
    }
  }

  return (
    <div className="chatOnline">
    {onlineFriends.map((o) => (
      <div className="chatOnlineFriend" onClick={()=>handleClick(o)}>
        <div className="chatOnlineImgContainer">
          <img
            className="chatOnlineImg"
            src={
              o?.profilePicture
                ? PF + o.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt=""
          />
          <div className="chatOnlineBadge"></div>
        </div>
        <span className="chatOnlineName">{o.username}</span>
      </div>
    ))} 
  </div>
  )
}

export default ChatOnline
