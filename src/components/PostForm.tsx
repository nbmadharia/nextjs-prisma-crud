import { useEffect, useState } from 'react';

interface Post {
  id?: number;
  title: string;
  content: string;
}

const PostForm = ({ post }: { post?: Post }) => {
  const [formData, setFormData] = useState<Post>({
    title: post?.title || '',
    content: post?.content || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = post ? 'PUT' : 'POST';
    const url = post ? `/api/posts/${post.id}` : '/api/posts';

    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      // Handle successful submission (e.g., redirect or show a success message)
      window.location.href = '/posts';
    } else {
      // Handle error (e.g., show an error message)
      console.error('Failed to submit the form');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">{post ? 'Update Post' : 'Create Post'}</button>
    </form>
  );
};

export default PostForm;