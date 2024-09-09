// src/components/PostDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPost } from '../src/api';

const Post = () => {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
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
    }, [id]);

    if (!title) return <div>Loading...</div>;

    return (
        <div>
            <h1>{title}</h1>
            <p>{content}</p>
        </div>
    );
};

export default Post;
