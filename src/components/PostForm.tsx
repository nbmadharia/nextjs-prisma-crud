"use client";
import React, { useState } from 'react';

interface Post {
  id?: number;
  title: string;
  content: string;
}

export default function PostForm({
  post,
  onSubmit,
}: {
  post?: Post;
  onSubmit?: (data: { title: string; content: string }) => Promise<void> | void;
}) {
  const [formData, setFormData] = useState<Post>({
    title: post?.title || '',
    content: post?.content || '',
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (onSubmit) {
        await onSubmit({ title: formData.title, content: formData.content });
      } else {
        const method = post ? 'PUT' : 'POST';
        const url = post ? `/api/posts/${post.id}` : '/api/posts';

        const response = await fetch(url, {
          method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          window.location.href = '/posts';
        } else {
          console.error('Failed to submit the form');
        }
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-row">
        <label htmlFor="title">Title</label>
        <input id="title" name="title" value={formData.title} onChange={handleChange} required />
      </div>
      <div className="form-row">
        <label htmlFor="content">Content</label>
        <textarea id="content" name="content" value={formData.content} onChange={handleChange} required />
      </div>
      <button type="submit" disabled={submitting}>
        {post ? 'Update Post' : 'Create Post'}
      </button>
    </form>
  );
}