"use client";
import React from 'react';
import Link from 'next/link';

interface Post {
  id: number;
  title: string;
  content: string;
}

export default function PostList({
  posts,
  onDelete,
}: {
  posts: Post[];
  onDelete?: (id: number) => Promise<void> | void;
}) {
  const handleDelete = async (id: number) => {
    if (onDelete) return onDelete(id);

    if (!confirm('Delete this post?')) return;
    const res = await fetch(`/api/posts/${id}`, { method: 'DELETE' });
    if (!res.ok) {
      console.error('Failed to delete post');
      return;
    }
    window.location.reload();
  };

  return (
    <ul className="post-list">
      {posts.map((post) => (
        <li key={post.id} className="post-item">
          <div>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
          </div>
          <div className="post-actions">
            <Link href={`/posts/${post.id}`}>View</Link>
            <Link href={`/posts/${post.id}/edit`} className="secondary">Edit</Link>
            <button onClick={() => handleDelete(post.id)}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  );
}