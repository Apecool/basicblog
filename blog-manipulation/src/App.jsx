import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PostList from '../components/PostList';
import PostForm from '../components/PostForm';
import Register from '../components/Register';
import Login from '../components/Login';
import Post from '../components/Post';
//import { fetchPost } from './api';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <a href="/register">Register</a> | <a href="/login">Login</a>
        </nav>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/list" element={<PostList />} />
          <Route path="/list/:id" element={<Post />} />
          <Route path="/delete/:id" element={<PostList />} />
          <Route path="/create" element={<PostForm isEditing={false} />} />
          <Route path="/edit/:id" element={<PostForm isEditing={true} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
