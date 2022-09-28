import './App.css';
import { Routes, Route, Navigate, BrowserRouter as Router } from 'react-router-dom'

import VideoPage from './pages/VideoPage';
import HeaderContainer from './components/Header/HeaderContainer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import { userLoginRequest } from './redux';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import LibraryPage from './pages/LibraryPage';


function App({ user, userLoginRequest }) {
  useEffect(() => {
    userLoginRequest()
  }, [])
  return (
    <div className="App">
      {
        user && user.user
          ? <Router>
            <HeaderContainer />
            <Routes>
              <Route path='/' exact element={<HomePage />} />
              <Route path='/watch' element={<VideoPage />} />
              <Route path='/library' element={<LibraryPage />} />
              <Route path='*' element={<HomePage />} />
            </Routes>
          </Router>
          : <Router>
            <Routes><Route path='*' element={<LoginPage />} /></Routes></Router>
      }
    </div>
  );
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    userLoginRequest: () => dispatch(userLoginRequest())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);