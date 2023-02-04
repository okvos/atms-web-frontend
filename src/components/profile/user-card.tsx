import React, { useEffect, useState } from "react";
import { Profile } from "@atms/models/profile/Profile";
import {
  UserCardAuthorContainer,
  UserCardButton,
  UserCardContainer,
  UserCardHeader,
  UserCardInfoContainer,
  UserCardStatsContainer,
  UserCardUsername,
} from "./styled-components";
import { LabelLarge, LabelSmall, ParagraphSmall } from "baseui/typography";
import { Avatar } from "baseui/avatar";
import { theme } from "../../config/theme";
import { Button, KIND, SHAPE, SIZE } from "baseui/button";
import {
  DeleteUserFollowRequest,
  GetUserFollowRequest,
  PostUserFollowRequest,
} from "@atms/api/request/user/follow";
import { useAuth } from "@atms/modules/auth/auth";

export function UserCard({ profile }: { profile: Profile }) {
  const { isLoggedIn } = useAuth();

  const [isFollowing, setIsFollowing] = useState<boolean | null>(null);

  async function checkIfFollowing() {
    if (!isLoggedIn) setIsFollowing(false);
    const request = new GetUserFollowRequest({ userId: profile.user_id });
    const response = await request.execute();
    setIsFollowing(response.following);
  }

  async function followUser() {
    if (!isLoggedIn) return false;
    const currentIsFollowing = isFollowing === true;

    // disable button while request processes
    setIsFollowing(null);

    if (!currentIsFollowing) {
      const req = new PostUserFollowRequest({ userId: profile.user_id });
      const resp = await req.execute();
      if (resp.success) setIsFollowing(true);
    } else if (currentIsFollowing) {
      const req = new DeleteUserFollowRequest({ userId: profile.user_id });
      const resp = await req.execute();
      if (resp.success) setIsFollowing(false);
    }
  }

  useEffect(() => {
    checkIfFollowing();
  }, []);

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
            <Button
              kind={isFollowing === true ? KIND.secondary : KIND.primary}
              onClick={followUser}
              isLoading={isFollowing === null}
              size={SIZE.compact}
              shape={SHAPE.pill}
              disabled={!isLoggedIn || isFollowing === null}
            >
              {isFollowing === true ? "Unfollow" : "Follow"}
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
