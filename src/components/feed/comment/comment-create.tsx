import React, { useState } from "react";
import { SIZE } from "baseui/textarea";
import { Input } from "baseui/input";
import { Button, KIND } from "baseui/button";
import { CommentSendButtonOverrides } from "./styled-components";
import { PostPostIdCommentsRequest } from "@atms/api/request/post/id/comments";
import { Comment } from "@atms/api/models/Comment";
import { useAuth } from "@atms/modules/auth/auth";
import { ProfileSummary } from "@atms/api/models/ProfileSummary";

type CommentCreateProps = {
  postId: number;
  addComment: (comment: Comment) => void;
};

export function CommentCreate({ postId, addComment }: CommentCreateProps) {
  const { account } = useAuth();
  const [value, setValue] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  async function submitComment() {
    if (value.trim().length === 0) {
      return false;
    }
    setIsSubmitting(true);
    const req = new PostPostIdCommentsRequest({
      text: value,
      post_id: postId,
    });
    const resp = await req.execute();
    let author: ProfileSummary = {
      user_id: account.user_id || 0,
      username: account.username || "",
      header_image_url: "",
    };
    let comment: Comment = {
      comment_id: resp.comment_id,
      author: author,
      text: value,
      date: new Date().getTime() / 1000,
    };
    addComment(comment);
    setIsSubmitting(false);
  }

  return (
    <>
      <Input
        overrides={{
          Root: {
            style: {
              paddingRight: "0px",
            },
          },
        }}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        size={SIZE.compact}
        placeholder="Add a comment"
        endEnhancer={() => (
          <Button
            kind={KIND.secondary}
            overrides={CommentSendButtonOverrides}
            size={SIZE.mini}
            disabled={isSubmitting}
            isLoading={isSubmitting}
            onClick={submitComment}
          >
            {value !== "" && "Share"}
          </Button>
        )}
      />
    </>
  );
}
