import React, { useEffect, useState } from "react";
import { Block } from "baseui/block";
import { Grid, Cell, BEHAVIOR } from "baseui/layout-grid";

import { useParams } from "react-router-dom";
import { toast } from "../../modules/notifications/toast";
import { GetProfileByUsernameRequest } from "@atms/api/request/profile";
import { GetUserIdPostsRequest } from "@atms/api/request/user/id/posts";
import { Post } from "@atms/api/models/Post";
import { Profile as ProfileModel } from "@atms/api/models/Profile";
import { FeedPostList } from "../feed/post/feed-post-list";
import { UserCard } from "@atms/components/profile/user-card";
import { NoPosts } from "@atms/components/feed/no-posts";
import { CreatePost } from "@atms/components/feed/post/create-post";
import { useAuth } from "@atms/modules/auth/auth";

export default function Profile() {
  const { username } = useParams();
  const [profile, setProfile] = useState<ProfileModel | null>(null);
  const [feedPosts, setFeedPosts] = useState<Post[]>([]);

  const [isMyProfile, setIsMyProfile] = useState<boolean>(false);

  const { isLoggedIn, account } = useAuth();

  async function fetchProfile() {
    if (!username) return toast("error", "Profile not found!");

    // fetch profile
    let request = new GetProfileByUsernameRequest({
      username,
    });

    try {
      let response = await request.execute();
      setProfile(response.profile);
      if (isLoggedIn)
        setIsMyProfile(account.user_id === response.profile.user_id);

      // fetch feed posts after profile fetch success
      fetchFeedPosts(response.profile.user_id);
    } catch (e: any) {
      console.log(e);
      toast("error", e.message);
    }
  }

  async function fetchFeedPosts(userId: number) {
    let request = new GetUserIdPostsRequest({
      user_id: userId,
    });
    try {
      let response = await request.execute();
      setFeedPosts(response.posts);
    } catch (e: any) {}
  }

  useEffect(() => {
    setProfile(null);
    fetchProfile();
  }, [username]);

  if (!profile) {
    return <></>;
  }

  return (
    <>
      <Block marginTop={"20px"}>
        <Grid behavior={BEHAVIOR.fluid}>
          <Cell span={[12, 12, 4]}>
            <UserCard username={username} profile={profile} />
          </Cell>
          <Cell span={[12, 12, 8]}>
            {isMyProfile && <CreatePost />}
            {feedPosts.length === 0 && <NoPosts />}
            {feedPosts && <FeedPostList posts={feedPosts} />}
          </Cell>
        </Grid>
      </Block>
    </>
  );
}
