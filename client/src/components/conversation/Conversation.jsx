import './Conversation.css'

import React, { useEffect, useState } from 'react'
import { publicRequest } from '../../Request';

const Conversation = ({conversation, currentUser}) => {
    const [user, setUser] = useState(null);

    useEffect(()=>{
      const friendId = conversation.members.find((m) => m !== currentUser?._id)

      const getUser = async () => {
        try{
          const res = await publicRequest("user?userId=" + friendId)
          // console.log(res);
          setUser(res.data);
        }catch(err){
          console.log(err);
        }
      };

      getUser();
    }, [currentUser, conversation])

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div className="conversation">
      <img
        className="conversationImg"
        src={
          user?.profilePic
            ? PF + user.profilePic
            : PF + "person/noAvatar.png"
        }
        alt=""
      />
      <span className="conversationName">{user?.username}</span>
    </div>
  )
}

export default Conversation
