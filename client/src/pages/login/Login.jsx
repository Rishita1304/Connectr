import { useContext, useRef } from "react";
import "./login.css";
import { LoginCalls } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@material-ui/core";
import { Link } from "react-router-dom";

export default function Login() {

  const username = useRef();
  const password = useRef();

  const {user, isFetching, dispatch} = useContext(AuthContext);

const handleClick =(e) => {
  e.preventDefault();
  LoginCalls({username: username.current.value,password: password.current.value}, dispatch )
}

console.log(user);
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Connectr</h3>
          <div className="loginDesc">
            Connect with friends and the world around you!
          </div>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input placeholder="Username" required className="loginInput" ref={username}/>
            <input type="password" placeholder="Password" minLength={6} className="loginInput" required ref={password} />
            <button className="loginButton" type="submit" disabled={isFetching}>{isFetching? <CircularProgress color="while" size="20px"/> : "Log In"}</button>
            <span className="loginForgot">Forgot Password?</span>
            <Link to='/register'>

            <button className="loginRegisterButtonn" disabled={isFetching}> Create a new acoount
            </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
