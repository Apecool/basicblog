import React, { useState, useEffect } from 'react';
import { createPost, updatePost, fetchPost } from '../src/api';
import { useNavigate, useParams } from 'react-router-dom';

function PostForm({ isEditing }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (isEditing) {
      // Load post data for editing
      const loadPost = async () => {
        try {
          const post = await fetchPost(id);
          setTitle(post.title);
          setContent(post.content);
        } catch (error) {
          console.error('Failed to load post', error);
        }
      };
      loadPost();
    }
  }, [isEditing, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await updatePost(id, { title, content });
      } else {
        await createPost({ title, content });
      }
      navigate('/list');
    } catch (error) {
      console.error('Failed to save post', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <label>
        Content:
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </label>
      <button type="submit">{isEditing ? 'Update' : 'Create'} Post</button>
    </form>
  );
}

export default PostForm;
