import { useRef } from "react";
import "./register.css";
import { Link, useNavigate } from "react-router-dom";
import { publicRequest } from "../../Request";

export default function Register() {

  const username = useRef()
  const email = useRef()
  const password = useRef()
  const passwordAgain = useRef()

  const navigate = useNavigate();

  const handleClick = async(e) =>{
    e.preventDefault();
    if(passwordAgain.current.value !== password.current.value){
      passwordAgain.current.setCustomValidity("Passwords don't match!");
    }
    else{
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value
      }
      try{
        const res = await publicRequest.post("auth/register", user)
        console.log(res);
        navigate("/login")
      }catch(err){
        console.log(err);
      }
    }
  } 

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Connectr</h3>
          <span className="loginDesc">
            Connect with friends and the world around you!
          </span>
        </div>
        <div className="loginRight">
          {/* <h5 className="loginLogoo">Sign Up</h5> */}
          <form className="loginBoxx" onSubmit={handleClick}>
            <input placeholder="Username" required ref={username} className="loginInputt" />
            <input placeholder="Email" required ref={email} type="email" className="loginInputt" />
            <input placeholder="Password" type="password" minLength={6} required ref={password} className="loginInputt" />
            <input placeholder="Password Again" type="password" required ref={passwordAgain} className="loginInputt" />
            <button className="loginButtonn" type="submit">Sign Up</button>
            <Link to='/login'>
            <button className="loginRegisterButtonn">
              Log into Existing Account
            </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
