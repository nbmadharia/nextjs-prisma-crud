"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import PostForm from '../../../components/PostForm';

export default function NewPostPage() {
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (data) => {
    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to create post');
      }
      else{
        console.log('Post created successfully inside new');
      }

      router.push('/posts');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h1>Create New Post</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <PostForm onSubmit={handleSubmit} />
    </div>
  );
}