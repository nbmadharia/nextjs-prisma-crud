"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import PostForm from "../../../../components/PostForm";

interface Post {
  id?: number;
  title: string;
  content: string;
}

export default function EditPostPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string | undefined;

  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    let mounted = true;
    (async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/posts/${id}`);
        if (!res.ok) throw new Error("Failed to load post");
        const data = await res.json();
        if (mounted) setPost(data);
      } catch (err: any) {
        if (mounted) setError(err.message || "Error");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [id]);

  const handleSubmit = async (data: { title: string; content: string }) => {
    if (!id) return;
    try {
      const res = await fetch(`/api/posts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Update failed");
      router.push("/posts");
    } catch (err: any) {
      setError(err.message || "Update error");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!post) return <p>Post not found</p>;

  return (
    <div>
      <h1>Edit Post</h1>
      <PostForm post={post} onSubmit={handleSubmit} />
    </div>
  );
}