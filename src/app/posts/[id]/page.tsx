"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const PostPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchPost = async () => {
        const response = await fetch(`/api/posts/${id}`);
        const data = await response.json();
        setPost(data);
        setLoading(false);
      };
      fetchPost();
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <p>Author: {post.author}</p>
      <p>Created at: {new Date(post.createdAt).toLocaleString()}</p>
    </div>
  );
};

export default PostPage;