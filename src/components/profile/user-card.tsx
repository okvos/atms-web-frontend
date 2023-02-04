import React from "react";
import { Profile } from "@atms/models/profile/Profile";
import {
  UserCardAuthorContainer,
  UserCardButton,
  UserCardContainer,
  UserCardHeader,
  UserCardInfoContainer, UserCardStatsContainer,
  UserCardUsername,
} from "./styled-components";
import { LabelLarge, LabelSmall, ParagraphSmall } from "baseui/typography";
import { Avatar } from "baseui/avatar";
import { theme } from "../../config/theme";
import { Button, SHAPE, SIZE } from "baseui/button";

export function UserCard({ profile }: { profile: Profile }) {
  return (
    <UserCardContainer>
      <UserCardHeader $src={profile.header_image_url} />
      <UserCardInfoContainer>
        <UserCardAuthorContainer>
          <Avatar
              overrides={{
                Root: {
                  style: ({ $theme }) => ({
                    ...$theme.borders.border600,
                  }),
                },
              }}
              name={profile.username}
              size="scale1600"
              src="https://avatars.dicebear.com/api/human/yard.svg?width=285&mood=happy"
          />
          <UserCardUsername>
            <LabelLarge>{profile.username}</LabelLarge>
            <LabelSmall color={theme.colors.contentSecondary}>
              @{profile.username}
            </LabelSmall>
          </UserCardUsername>
          <UserCardButton>
            <Button size={SIZE.compact} shape={SHAPE.pill}>
              Follow
            </Button>
          </UserCardButton>
        </UserCardAuthorContainer>

        <ParagraphSmall>{profile.bio}</ParagraphSmall>
        <UserCardStatsContainer>
          <span>132 followers</span>
          <span>132 following</span>
        </UserCardStatsContainer>
      </UserCardInfoContainer>
    </UserCardContainer>
  );
}
