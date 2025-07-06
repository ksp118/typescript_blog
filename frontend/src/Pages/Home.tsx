import { useEffect, useState } from "react";
import type { Post } from "../types/post";
import type { ApiResponse } from "../types/api";
import axios from "axios";
import { Link } from "react-router-dom";
import ScrollIndicator from "../Components/ScrollIndicator";

export const Home = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);

  useEffect(() => {
    axios
      .get<ApiResponse<Post[]>>("/api/posts")
      .then((res) => {
        if (res.data.success) {
          setPosts(res.data.data);
        } else {
          console.error("server error:", res.data.error);
        }
      })
      .catch((err) => {
        console.error("failed to request:", err);
      });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setShowScrollIndicator(false);
        window.removeEventListener("scroll", handleScroll);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="layout-container">
      <div className="flex flex-col md:flex-row items-center justify-center md:justify-between min-h-[calc(100dvh-var(--header-height))] gap-8 text-center md:text-left">
        <div className="flex flex-col gap-4">
          <p className="text-7xl text-black">Gyuho Lee</p>
          <p className="text-xl">
            Lost in the middle of Electrical and Computer Engineering
          </p>
        </div>
        <img
          className="w-72 h-fit rounded-xl order-[-1] md:order-none"
          src="/img/main_img.jpg"
          alt="it's me"
        />
        {showScrollIndicator && <ScrollIndicator scrollToId="here" />}
      </div>
      <div id="here" className="content-area max-w-5xl mx-auto">
        <div>
          <h1>Main</h1>
          <hr className="border-t-2 border-[#f59e0b] my-2" />
          <ul>
            {posts.map((post) => (
              <li
                key={post.id}
                className="flex items-center justify-between my-4"
              >
                <Link to={`/post/${post.slug}`}>{post.title}</Link>
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
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
