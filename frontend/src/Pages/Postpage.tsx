import { useParams } from "react-router-dom";
import type { Post } from "../types/post";
import { useEffect, useState } from "react";
import axios from "axios";
import type { ApiResponse } from "../types/api";
import { MarkdownRenderer } from "../Components/MarkdownRenderer";

export function PostPage() {
  const { slug } = useParams<{ slug: Post["slug"] }>();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    axios
      .get<ApiResponse<Post>>(`/api/posts/${slug}`)
      .then((res) => {
        if (res.data.success) {
          setPost(res.data.data);
        } else {
          console.error("server error:", res.data.error);
          setPost(null);
        }
      })
      .catch((err) => {
        console.error("failed to request:", err);
        setPost(null);
      });
  }, [slug]);

  if (!post) return <p>Loading...</p>;

  return (
    <div className="layout-container my-10">
      <div className="bg-[#f9f5ee] rounded-xl">
        <div className="px-3 py-5">
          <div>
            <h1 className="text-5xl">{post?.title}</h1>
            <div>
              {new Intl.DateTimeFormat("ko-KR", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              }).format(new Date(post.created_at))}
            </div>
          </div>
          <hr className="my-6 border-t-2 border-[#e0e0e0] rounded-full" />
          <div className="markdown-content">
            <MarkdownRenderer content={post?.content}></MarkdownRenderer>
          </div>
        </div>
      </div>
    </div>
  );
}
