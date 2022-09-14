import { getAuth, signOut } from "firebase/auth";
import { addDoc, collection, getDocs, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Tweets from "../components/Tweets";
import classes from "./Home.module.css";

const Home = ({ db, userInfo }) => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [tweet, setTweet] = useState("");
  const [tweets, setTweets] = useState([]);

  const onLogout = () => {
    signOut(auth).then(navigate("/"));
  };

  const onChange = (event) => setTweet(event.target.value);

  const onSubmit = async (event) => {
    event.preventDefault();
    await addDoc(collection(db, "tweets"), {
      text: tweet,
      createAt: Date.now(),
      creatorId: userInfo.uid,
    });
    setTweet("");
  };

  useEffect(() => {
    onSnapshot(collection(db, "tweets"), (snapshot) => {
      const tweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTweets(tweetArray);
    });
  }, []);

  return (
    <div className={classes.wrap}>
      <header className={classes.header}>
        <h1>memo</h1>
        <button onClick={onLogout}>
          <span>Logout</span>
          <i className="fa-solid fa-arrow-right-from-bracket"></i>
        </button>
      </header>
      <form onSubmit={onSubmit} className={classes.memo_form}>
        <input
          className={classes.memo_input}
          type="text"
          onChange={onChange}
          value={tweet}
          placeholder="메모를 작성하세요"
        />
        <button type="submit" className={classes.submit}>
          <i className="fa-solid fa-pen"></i>
        </button>
      </form>
      <div>
        {tweets.map((tweet) => (
          <Tweets
            key={tweet.id}
            db={db}
            tweet={tweet}
            isOwner={userInfo.uid === tweet.creatorId}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
