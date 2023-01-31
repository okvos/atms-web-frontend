import React from "react";
import { Avatar } from "baseui/avatar";
import {
  PostTextContainer,
  PostTitleContainer,
  PostContainer,
  PostAuthorContainer,
  PostTitleDate,
} from "./styled-components";
import { LabelMedium } from "baseui/typography";

type FeedPostProps = {
  username: string;
  date: number;
  text: string;
};

export function FeedPost({ username, date, text }: FeedPostProps) {
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
            name={username}
            size="scale1600"
            src="https://avatars.dicebear.com/api/human/yard.svg?width=285&mood=happy"
          />
          <PostAuthorContainer>
            <LabelMedium>{username}</LabelMedium>
            <PostTitleDate>{new Date(date * 1000).toString()}</PostTitleDate>
          </PostAuthorContainer>
        </PostTitleContainer>

        <PostTextContainer>{text}</PostTextContainer>
      </div>
    </PostContainer>
  );
}
