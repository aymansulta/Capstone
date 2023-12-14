import { useState } from "react";
import { auth, googleProvider } from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
// import { validateEmail } from "./Utils";

// const PasswordErrorMessage = () => {
//   return (
//     <p className="FieldError">Password should have at least 8 characters</p>
//   );
// };

function Login() {


//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
//   const [password, setPassword] = useState({
//     value: "",
//     isTouched: false,
//   });
//   const [role, setRole] = useState("role");

    const [password, setPassword] = useState("");
    console.log(auth?.currentUser?.email);

  const signIn = async () => {
    try {
        await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
        console.error(err);
    }
  };

  const signInWithGoogle = async () => {
    try {
        await signInWithPopup(auth, googleProvider)
    }catch(err) {
        console.error(err)
    }
  }

  const logout = async () => {
    try {
        await signOut(auth);
    }catch(err) {
        console.error(err);
    }
  }

//   const getIsFormValid = () => {
//     // Implement this function
//     return (
//       firstName &&
//     //   validateEmail (email) &&
//         email &&
//       password.value.length >= 8 &&
//       role !== "role"
//     );
//   };

//   const clearForm = () => {
//     // Implement this function
//     setFirstName("");
//     setLastName("");
//     setEmail("");
//     setPassword({
//       value: "",
//       isTouched: false
//     });
//     setRole("role");
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     alert("Account created!");
//     signIn();
//     clearForm();
//   };

  return (
    <div className="App">
      {/* <form onSubmit={handleSubmit}>
        <fieldset>
          <h2>Sign Up</h2>
          <div className="Field">
            <label htmlFor="fName">
              First name <sup>*</sup>
            </label>
            <input id="fName" placeholder="First name" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
          </div>
          <div className="Field">
            <label htmlFor="lName">Last name</label>
            <input id="lName" placeholder="Last name" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
          </div>
          <div className="Field">
            <label  htmlFor="email">
              Email address <sup>*</sup>
            </label>
            <input id="email" placeholder="Email address" type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
          </div>
          <div className="Field">
            <label htmlFor="password">
              Password <sup>*</sup>
            </label>
            <input
            id="password"
            placeholder="Password"
            type="password"
            onChange={(e) => {
              setPassword({...password, value: e.target.value});
            }}
            onBlur={() => {
              setPassword({...password, isTouched: true});
            }}
            />
            {password.isTouched && password.value.length < 8 ? (
              <PasswordErrorMessage />
            ) : null}
          </div>
          <div className="Field">
            <label  htmlFor="role">
              Role <sup>*</sup>
            </label>
            <select id="role" value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="role">Role</option>
              <option value="individual">Individual</option>
              <option value="business">Business</option>
            </select>
          </div>
          <button type="submit" disabled={!getIsFormValid()}>
            Create account
          </button>
        </fieldset>
      </form> */}

      <div>
        <input placeholder="email..." type="email" onChange={(e) => setEmail(e.target.value)} />
        <input placeholder="password..." type="password" onChange={(e) => setPassword(e.target.value)} />
        <button onClick={signIn}>Sign In</button>
        <button onClick={signInWithGoogle}>Sign In with Google</button>
        <button onClick={logout}>Logout</button>
      </div>

    </div>
  );
}

export default Login;