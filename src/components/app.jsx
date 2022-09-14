import { useState } from "react";
import AppRouter from "./Router";
import { authService } from "../fbase";
import { useEffect } from "react";
import "./app.css";

function App({ db }) {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserInfo(user);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  return (
    <div className="container">
      {init ? (
        <AppRouter isLoggedIn={isLoggedIn} db={db} userInfo={userInfo} />
      ) : (
        <div className="loading">
          <div className="spinner" />
          <span>Loading...</span>
        </div>
      )}
    </div>
  );
}

export default App;
