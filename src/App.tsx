import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import AddUser from './pages/AddUser';
import UpdateUser from './pages/UpdateUser';
import DeleteUser from './pages/DeleteUser';
import NavBar from './components/NavBar'


function App() {
  return (
    <>
      <NavBar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/add-user" element={<AddUser />}/>
          <Route path="/update-user" element={<UpdateUser />}/>
          <Route path="/delete-user" element={<DeleteUser />}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
