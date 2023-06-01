import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import { MyInfoContext } from '../contexts/MyInfoContext';
import { useEffect, useState } from 'react';
import ProtectedRoute from './ProtectedRoute';
import { getToken, removeToken, saveToken } from '../utils/storage';
import { auth } from '../utils/auth';

export default function App() {
  const navigate = useNavigate();
  const [token, setToken] = useState(/** @type {string | null} */ getToken());
  const [myInfo, setMyInfo] = useState(/** @type {import("../types").MyInfo | null} */ null);

  useEffect(() => {
    getMyInfo();
  }, [token]);

  /**
   *
   * @param {import("../types").SigninResponse} res
   */
  function handleLogin(res) {
    saveToken(res.token);
    setToken(res.token);
  }

  function handleLogout() {
    removeToken();
    setToken(null);
    setMyInfo(null);
  }

  function getMyInfo() {
    if (!token) {
      setMyInfo(null);
      return;
    }

    auth
      .getMyInfo(token)
      .then(res => {
        setMyInfo(res.data);
        navigate('/');
      })
      .catch(err => console.error(err));
  }

  return (
    <div className="App body">
      <MyInfoContext.Provider value={myInfo}>
        <Routes>
          <Route
            path="/"
            element={<ProtectedRoute loggedIn={token} element={Home} onLogout={handleLogout} />}
          />
          <Route
            path="/sign-in"
            element={token ? <Navigate to="/" replace /> : <Login onLogin={handleLogin} />}
          />
          <Route path="/sign-up" element={token ? <Navigate to="/" replace /> : <Register />} />
        </Routes>
      </MyInfoContext.Provider>
    </div>
  );
}
