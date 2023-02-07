import React from "react";
import { Post } from "@atms/api/models/Post";
import { FeedPost } from "./feed-post";
import "./feed-list.css";

type FeedPostListType = {
  posts: Post[];
};
export function FeedPostList({ posts }: FeedPostListType) {
  return (
    <div className="feed-list">
      {posts.map((post, key) => {
        return <FeedPost key={key} post={post} />;
      })}
    </div>
  );
}
