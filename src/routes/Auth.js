import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import React, { useState } from "react";
import classes from "./Auth.module.css";
// import firebaseApp from "../fbase";
// import { authService } from "../fbase";

const Auth = (props) => {
  const auth = getAuth();
  const [newAccount, setNewAccount] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      let data;
      if (newAccount) {
        // 계정 없으면 생성
        data = await createUserWithEmailAndPassword(auth, email, password);
        setNewAccount(false);
      } else {
        // 계정 있으면 로그인
        data = await signInWithEmailAndPassword(auth, email, password);
      }
      console.log(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const toggleAccount = () => setNewAccount((prev) => !prev);

  const onSocialLogin = (event) => {
    const {
      target: { name },
    } = event;
    let provider;
    if (name === "google") {
      provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider);
    } else if (name === "github") {
      alert("not yet..");
    }
  };

  return (
    <div className={classes.wrap}>
      <h1 className={classes.title}>MEMO</h1>
      <form onSubmit={onSubmit} className={classes.login}>
        <input
          type="text"
          required
          name="email"
          placeholder="Email"
          onChange={onChange}
          value={email}
        />
        <input
          type="password"
          required
          name="password"
          placeholder="Password"
          onChange={onChange}
          value={password}
        />
        <input type="submit" value={newAccount ? "회원가입" : "로그인"} />
        <button onClick={toggleAccount} className={classes.account}>
          {newAccount ? "로그인하기" : "회원가입하기"}
        </button>
      </form>
      <p className={classes.error}>{error}</p>
      <div className={classes.socail_login}>
        <button name="google" onClick={onSocialLogin}>
          Login with Google
        </button>
        <button name="github" onClick={onSocialLogin}>
          Login with Github
        </button>
      </div>
    </div>
  );
};

export default Auth;
