import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import Header from './components/Header/Header';
import Intro from './components/IntroPage/Intro';
import LogIn from './components/Login/LogIn';
import Register from './components/Register/Register';
import Scores from './components/Scores/Scores';
import Startgame from './components/StartGame/Startgame';
import { database } from './firebase/firebase';
import { updateScores } from './Redux/questionsSlice';

function App() {
  const collectionRef = collection(database, "users");
  const dispatch = useDispatch();

  useEffect(() => {
    if(localStorage.getItem('usertk')){
      getDocs(collectionRef).then((res) => {
        let myUser = res.docs.find((users) => {
          return users.id === localStorage.getItem("docid");
        });
        const { scores } = { ...myUser?.data() };
        dispatch(updateScores(scores));
      });
    }
  }, []);

  return (
    <div className='app'>
      <Header />
      <Routes>
        <Route path='/' element={<Intro />} />
        <Route path='/login' element={<LogIn />} />
        <Route path='/register' element={<Register />} />
        <Route path='/scores' element={<Scores />} />
        <Route path='/startGame' element={<Startgame />} />
      </Routes>
    </div>
  );
}

export default App;
