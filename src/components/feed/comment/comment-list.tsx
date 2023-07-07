import React, { useEffect, useState } from "react";
import { Comment } from "@atms/api/models/Comment";
import { CommentComponent } from "./comment";
import { CommentCreate } from "@atms/components/feed/comment/comment-create";
import { useAuth } from "@atms/modules/auth/auth";
import {
  GetPostIdCommentsRequest,
  GetPostIdCommentsRequestType,
} from "@atms/api/request/post/id/comments";
import { Button, KIND, SIZE } from "baseui/button";
import { InteractionButtonOverrides } from "@atms/components/feed/post/styled-components";

type CommentListPropsType = {
  postId: number;
  totalComments: number;
};

async function fetchComments(
  postId: number,
  lastId: number
): Promise<Comment[]> {
  let body: GetPostIdCommentsRequestType = {
    post_id: postId,
  };
  if (lastId !== 0) body.last_id = lastId;

  let request = new GetPostIdCommentsRequest(body);
  let resp = await request.execute();

  return resp.comments;
}

export function CommentList(props: CommentListPropsType) {
  const { isLoggedIn } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [lastCommentId, setLastCommentId] = useState<number>(0);
  const [isFetchingComments, setIsFetchingComments] = useState<boolean>(false);

  function addComment(comment: Comment) {
    setComments((prevComments) => [...prevComments, comment]);
  }

  async function doFetchComments() {
    if (
      lastCommentId === -1 || // -1 indicates we're done fetching comments (e.g. no more left)
      props.totalComments === 0 ||
      comments.length >= props.totalComments
    ) {
      setLastCommentId(-1);
      return false;
    }
    setIsFetchingComments(true);
    let fetchedComments: Comment[] = await fetchComments(
      props.postId,
      lastCommentId
    );
    setIsFetchingComments(false);
    if (fetchedComments.length === 0) {
      setLastCommentId(-1);
      return;
    }
    setComments((previousComments) => [
      ...fetchedComments,
      ...previousComments,
    ]);
    setLastCommentId(fetchedComments[fetchedComments.length - 1].comment_id);
  }

  useEffect(() => {
    doFetchComments();
  }, []);
  return (
    <>
      {props.totalComments > comments.length && lastCommentId !== -1 && (
        <Button
          overrides={InteractionButtonOverrides}
          kind={KIND.secondary}
          size={SIZE.compact}
          onClick={doFetchComments}
          isLoading={isFetchingComments}
          disabled={isFetchingComments}
        >
          View previous {props.totalComments - comments.length} comments...
        </Button>
      )}
      {comments.map((comment, key) => {
        return <CommentComponent key={key} comment={comment} />;
      })}
      {isLoggedIn && (
        <CommentCreate postId={props.postId} addComment={addComment} />
      )}
    </>
  );
}
