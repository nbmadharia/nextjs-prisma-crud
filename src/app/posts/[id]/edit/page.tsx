import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PostForm from '@/components/PostForm';

const EditPostPage = () => {
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

  const handleUpdate = async (updatedPost) => {
    await fetch(`/api/posts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedPost),
    });
    router.push(`/posts/${id}`);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Edit Post</h1>
      {post && <PostForm post={post} onSubmit={handleUpdate} />}
    </div>
  );
};

export default EditPostPage;