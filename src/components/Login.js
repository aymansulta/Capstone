import { useState, useContext } from "react";
import { AuthContext } from "./AuthContext";
import { auth } from "../config/firebase";


function Login() {

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
    console.log(auth?.currentUser?.email);

  const { signUp, signInWithGoogle, logout } = useContext(AuthContext);

  const handleSignUp = (e) => {
    e.preventDefault();
    signUp(email, password);
  };

  const handleSignInWithGoogle = (e) => {
    e.preventDefault();
    signInWithGoogle();
  };

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
  };


  return (
    <div className="App">
      <div>
        <form>
          <fieldset>
            <div className="loginInput">
              <div>
                <label htmlFor="email">Email:</label>
                <input id="email" placeholder="email..." type="email" onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div>
                <label htmlFor="password">Password:</label>
                <input id="password" placeholder="password..." type="password" onChange={(e) => setPassword(e.target.value)} />
              </div>
            </div>
            <div className="loginBtn">
              <button className="loginBtns" onClick={handleSignUp}>Sign up</button>
              <button className="loginBtns" onClick={handleSignInWithGoogle}>Sign up with Google</button>
              <button className="loginBtns" onClick={handleLogout}>Logout</button>
            </div>
          </fieldset>
        </form>
      </div>

    </div>
  );
}

export default Login;