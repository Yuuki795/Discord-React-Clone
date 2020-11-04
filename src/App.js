import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux"
import './App.css';
import Chat from './chat/Chat';
import Sidebar from './sidebar/Sidebar'
import { selectUser } from "./features/userSlice"
import Login from './Login';
import { auth } from './firebase';
import { login, logout } from './features/userSlice';
import {Text, View} from 'react-native';

function App() {
const dispatch = useDispatch();
  const user = useSelector(selectUser)

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
    if (authUser) {
      //login
      dispatch(
        login({
        uid: authUser.uid,
        photo: authUser.photoURL,
        email: authUser.email,
        displayName: authUser.displayName
      }))
    } else {
      //yeeeet
      dispatch(logout());
    }

    });
  }, [dispatch]);

  return (
    <div className="App">
        {user ? (
          <>
          <Sidebar />
          <Chat />
        </>
        ) : (
          <Login />
        )}
        
    </div>
  );
}

export default App;
