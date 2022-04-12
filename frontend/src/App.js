import React from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Connexion from './pages/Connexion';
import Header from './components/Header';


const App = () => {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/connexion" element={<Connexion/>} />
        <Route path="*" element={<Home/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;