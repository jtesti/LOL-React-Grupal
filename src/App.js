import './App.scss';
import NavBar from './components/NavBar/NavBar';
import { BrowserRouter as Router, NavLink, Route, Routes } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import { useState } from 'react';
import { JwtContext } from './shared/context/JWTContext';

function App() {
  const [jwt, setJwt] = useState(localStorage.getItem("token")); 

  return (
    <JwtContext.Provider value={{ jwt, setJwt }}>

    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/home' element={<HomePage />} />
          <Route path='/login' element={<LoginPage />} />
        </Routes>
      </Router>
    </div>
    </JwtContext.Provider>
  );
}

export default App;
