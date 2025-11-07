"use client";
import React, { useEffect, useState } from 'react';
import PostList from '../../components/PostList';

interface Post {
  id: number;
  title: string;
  content: string;
}

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    setLoading(true);
    const res = await fetch('/api/posts');
    if (res.ok) {
      setPosts(await res.json());
    } else {
      console.error('Failed to load posts');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this post?')) return;
    const res = await fetch(`/api/posts/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setPosts((p) => p.filter((x) => x.id !== id));
    } else {
      console.error('Delete failed');
    }
  };

  return (
    <div>
      <h1>Posts</h1>
      {loading ? <p>Loading...</p> : <PostList posts={posts} onDelete={handleDelete} />}
    </div>
  );
}