import React, { useEffect, useState } from 'react';
import { fetchPosts, deletePost } from '../src/api';
import { Link } from 'react-router-dom';

function PostList() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await fetchPosts();
        setPosts(data);
      } catch (error) {
        setError('Failed to fetch posts');
      }
    };
    loadPosts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deletePost(id);
      setPosts(posts.filter(post => post.id !== id));
    } catch (error) {
      setError('Failed to delete post');
    }
  };

  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>My Blog Posts</h1>
      <Link to="/create">Create New Post</Link>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <Link to={`/list/${post.id}`}>{post.title}</Link>
            <button onClick={() => handleDelete(post.id)}>Delete</button>
            <Link to={`/edit/${post.id}`}>Edit</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PostList;
