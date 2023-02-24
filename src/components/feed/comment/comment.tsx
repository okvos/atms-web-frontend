import React from "react";
import { Comment } from "@atms/api/models/Comment";
import {
  CommentAuthor,
  CommentContainer,
  CommentContent,
  CommentTextBubble,
} from "@atms/components/feed/comment/styled-components";
import { Avatar } from "baseui/avatar";
import { LabelSmall } from "baseui/typography";
import moment from "moment/moment";

type CommentPropsType = {
  comment: Comment;
};
export function CommentComponent(props: CommentPropsType) {
  const { comment } = props;
  return (
    <CommentContainer>
      <Avatar
        overrides={{
          Root: {
            style: ({ $theme }) => ({
              ...$theme.borders.border600,
            }),
          },
        }}
        name={comment.author.username}
        size="scale1000"
        src="https://avatars.dicebear.com/api/human/yard.svg?width=285&mood=sad"
      />
      <CommentContent>
        <CommentTextBubble>{comment.text}</CommentTextBubble>
        <CommentAuthor>
          {comment.author.username} • {moment(comment.date * 1000).fromNow()}
        </CommentAuthor>
      </CommentContent>
    </CommentContainer>
  );
}
