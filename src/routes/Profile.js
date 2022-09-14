import { getAuth, signOut } from 'firebase/auth';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = ({ db, userInfo }) => {
  const auth = getAuth();
  const navigate = useNavigate();
  const onLogOut = () => {
    signOut(auth).then(navigate("/"));
  }
  
  const getMyTweets = async () => {
    const q = query(
      collection(db, "tweets"),
      where("creatorId", "===", userInfo.uid),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(doc => {
      console.log(doc.data());
    })
    console.log(q);
  }

  useEffect(()=>{
    getMyTweets();
  }, [])
  return (
    <>
      <h1>profile</h1>
      <button onClick={onLogOut}>Logout</button>
    </>
  )};

export default Profile;