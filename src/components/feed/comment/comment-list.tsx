import React from "react";
import { Comment } from "@atms/api/models/Comment";
import { CommentComponent } from "./comment";
import { CommentCreate } from "@atms/components/feed/comment/comment-create";
import { useAuth } from "@atms/modules/auth/auth";

type CommentListPropsType = {
  comments: Comment[];
  total_comments: number;
};

export function CommentList(props: CommentListPropsType) {
  const { isLoggedIn } = useAuth();
  return (
    <>
      {props.comments.map((comment, key) => {
        return <CommentComponent key={key} comment={comment} />;
      })}
      {isLoggedIn && <CommentCreate />}
    </>
  );
}
