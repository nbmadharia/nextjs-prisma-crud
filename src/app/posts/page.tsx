import { useEffect, useState } from 'react';
import PostList from '@/components/PostList';

const PostsPage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/posts');
      const data = await response.json();
      setPosts(data);
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <h1>Posts</h1>
      <PostList posts={posts} />
    </div>
  );
};

export default PostsPage;