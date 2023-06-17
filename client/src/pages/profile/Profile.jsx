import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { publicRequest } from "../../Request";

export default function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER

  const [users, setUsers] = useState({});
  const username = useParams().username;

  useEffect(()=>{
    const fetchUser = async () => {

      const res =await publicRequest.get(`user/?username=${username}`);
      console.log(res);
      setUsers(res.data)
    };
    fetchUser();
  },[username])
  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={users.coverPic || `${PF}/person/noCover.png`}
                alt=""
              />
              <img
                className="profileUserImg"
                src={users.profilePic? PF+users.profilePic : `${PF}person/noAvatar.png`}
                alt=""
              />
            </div>
            <div className="profileInfo">
                <h4 className="profileInfoName">{users.username}</h4>
                <span className="profileInfoDesc">Hello my friends!</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed />
            <Rightbar users={users}/>
          </div>
        </div>
      </div>
    </>
  );
}
