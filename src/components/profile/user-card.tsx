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
import { EditProfile } from "@atms/components/profile/edit-profile";

export function UserCard({
  username,
  profile,
}: {
  username?: string;
  profile: Profile;
}) {
  const { isLoggedIn, account } = useAuth();
  const isMyProfile = profile.user_id === account.user_id;

  const [isFollowing, setIsFollowing] = useState<boolean | null>(null);
  const [followerCount, setFollowerCount] = useState<number>(
    profile.follower_count
  );

  const [profileInfo, setProfileInfo] = useState<Profile>(profile);
  function updateProfileInfo(username: string, bio: string) {
    setProfileInfo((prev) => ({
      ...profileInfo,
      username: username,
      bio: bio,
    }));
  }

  async function checkIfFollowing() {
    if (!isLoggedIn || isMyProfile) return setIsFollowing(false);
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
      if (resp.success) {
        setIsFollowing(true);
        setFollowerCount((prev) => prev + 1);
      }
    } else if (currentIsFollowing) {
      const req = new DeleteUserFollowRequest({ userId: profile.user_id });
      const resp = await req.execute();
      if (resp.success) {
        setIsFollowing(false);
        setFollowerCount((prev) => prev - 1);
      }
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
            <LabelLarge>{profileInfo.username}</LabelLarge>
            <LabelSmall color={theme.colors.contentSecondary}>
              @{username}
            </LabelSmall>
          </UserCardUsername>
          <UserCardButton>
            {!isMyProfile && (
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
            )}
            {isMyProfile && (
              <EditProfile updateProfileInfo={updateProfileInfo} />
            )}
          </UserCardButton>
        </UserCardAuthorContainer>

        <ParagraphSmall>{profileInfo.bio}</ParagraphSmall>
        <UserCardStatsContainer>
          <span>
            {followerCount} follower{followerCount !== 1 ? "s" : ""}
          </span>
          <span>{profile.following_count} following</span>
        </UserCardStatsContainer>
      </UserCardInfoContainer>
    </UserCardContainer>
  );
}
