import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { publicRequest } from "../../Request";

export default function Feed({username}) {
  const [posts, setPosts] = useState([]);
  const {user} = useContext(AuthContext)

  useEffect(()=>{
    const fetchPost = async () => {
      const res = username 
      ? await publicRequest.get("post/profile/" + username) 
      : await publicRequest.get("post/timeline/" + user?._id)
      console.log(res);
      setPosts(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      )
    };
    fetchPost();
  },[username, user?._id])
  return (
    <div className="feed">
      <div className="feedWrapper">
      {(!username || username === user.username) && <Share />}
        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
}
