import React, { useState } from "react";
import { Avatar } from "baseui/avatar";
import {
  PostTextContainer,
  PostTitleContainer,
  PostContainer,
  PostAuthorContainer,
  PostTitleDate,
  PostCommentsContainer,
} from "./styled-components";
import { LabelMedium } from "baseui/typography";
import { PostInteractions } from "./post-interactions";
import {
  PostLikePostIdRequest,
  DeletePostIdLikeRequest,
} from "@atms/api/request/post/id/like";
import { Post } from "@atms/api/models/Post";
import moment from "moment";
import { CommentList } from "@atms/components/feed/comment/comment-list";
import {Comment} from "@atms/api/models/Comment";

type FeedPostPropsType = {
  post: Post;
};

const testComments: Comment[] = [
  {
    author: {
      user_id: 0,
      username: "Test",
      header_image_url: ""
    },
    text: "This is a test comment",
    date: 0
  }
]

export function FeedPost({ post }: FeedPostPropsType) {
  const [isPostLiked, setIsPostLiked] = useState<boolean>(post.is_liked);

  async function likePost() {
    let req;
    // if post is liked, the request will be to Unlike
    if (isPostLiked) {
      req = DeletePostIdLikeRequest;
    } else req = PostLikePostIdRequest; // otherwise, the request is to Like

    req = new req({ postId: post.post_id });
    let resp = await req.execute();

    // if the request was a success, update like state
    if (resp.success) {
      setIsPostLiked(!isPostLiked);
    }
  }
  return (
    <PostContainer>
      <div style={{ padding: "0.7em" }}>
        <PostTitleContainer>
          <Avatar
            overrides={{
              Root: {
                style: ({ $theme }) => ({
                  ...$theme.borders.border600,
                }),
              },
            }}
            name={post.username}
            size="scale1600"
            src="https://avatars.dicebear.com/api/human/yard.svg?width=285&mood=happy"
          />
          <PostAuthorContainer>
            <LabelMedium>{post.username}</LabelMedium>
            <PostTitleDate>{moment(post.date * 1000).fromNow()}</PostTitleDate>
          </PostAuthorContainer>
        </PostTitleContainer>

        <PostTextContainer>{post.text}</PostTextContainer>

        <PostInteractions isLiked={isPostLiked} likePost={likePost} />
        <PostCommentsContainer>
          <CommentList total_comments={2} comments={testComments} />
        </PostCommentsContainer>
      </div>
    </PostContainer>
  );
}
