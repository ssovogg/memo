import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import React, { useRef, useState } from "react";
import classes from "./Tweets.module.css";

const Tweets = ({ db, tweet, isOwner }) => {
  const TweetTextRef = doc(db, "tweets", tweet.id);
  const [editMode, setEditMode] = useState(false);
  const [newTweet, setNewTweet] = useState(tweet.text);

  const onDelete = async () => {
    const ok = window.confirm("삭제하시겠습니가?");
    if (ok) {
      await deleteDoc(TweetTextRef);
    }
  };

  const toggleEditMode = () => {
    setEditMode((prev) => !prev);
  }
  const onChange = (event) => {
    setNewTweet(event.target.value);
  };
  const onSubmit = (event) => {
    event.preventDefault();
    updateDoc(TweetTextRef, {
      text: newTweet,
    });
    setEditMode(false);
  };
  return (
    <div className={classes.wrap}>
      {editMode ? (
        <>
          <form onSubmit={onSubmit} className={classes.edit_form}>
            <input type="text" value={newTweet} onChange={onChange} />
            <button type="submit">
              <span>Edit</span>
              <i className="fa-solid fa-pen-to-square"></i>
            </button>
            <button onClick={toggleEditMode}>
              <span>Cancle</span>
            <i className="fa-solid fa-xmark"></i>
            </button>
          </form>
        </>
      ) : (
        <div className={classes.memo}>
          <span>{tweet.text}</span>
          {isOwner && (
            <div className={classes.btn}>
              <button onClick={toggleEditMode}>
                <span>Edit</span>
                <i className="fa-solid fa-pen-to-square"></i>
              </button>
              <button onClick={onDelete}>
                <span>Delete</span>
                <i className="fa-solid fa-eraser"></i>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Tweets;
