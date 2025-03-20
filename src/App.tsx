import React from 'react';
import { BrowserRouter as Router, Routes, Route,Navigate  } from "react-router-dom";
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './components/Dashboard';
import AuthRoute from './AuthRoute';
import './index.css'

const App = () => {
  return (
    <Router>
    <Routes>
    <Route path="/" element={<Navigate replace to="/login" />} /> 
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/Dashboard" element={ <AuthRoute><Dashboard/></AuthRoute>}/>

    </Routes>
  </Router>
  );
}

export default App;
