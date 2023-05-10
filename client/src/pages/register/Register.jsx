import "./register.css";

export default function Register() {
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Lamasocial</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Lamasocial.
          </span>
        </div>
        <div className="loginRight">
          <div className="loginBoxx">
            <input placeholder="Username" className="loginInputt" />
            <input placeholder="Email" className="loginInputt" />
            <input placeholder="Password" className="loginInputt" />
            <input placeholder="Password Again" className="loginInputt" />
            <button className="loginButtonn">Sign Up</button>
            <button className="loginRegisterButton">
              Log into Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
