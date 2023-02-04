import React, { useEffect, useState } from "react";
import { Block } from "baseui/block";
import { Grid, Cell, BEHAVIOR } from "baseui/layout-grid";

import { useParams } from "react-router-dom";
import { toast } from "../../modules/notifications/toast";
import {
  GetPostsByUserIdRequest,
  GetPostsByUserIdResponse,
  GetProfileByUsernameRequest,
  GetProfileByUsernameResponse,
} from "../../util/api";
import { Post } from "@atms/models/feed/Post";
import { Profile as ProfileModel } from "@atms/models/profile/Profile";
import { FeedPostList } from "../feed/post/feed-post-list";
import { UserCard } from "@atms/components/profile/user-card";

export default function Profile() {
  const { username } = useParams();
  const [profile, setProfile] = useState<ProfileModel | null>(null);
  const [feedPosts, setFeedPosts] = useState<Post[]>([]);

  async function fetchProfile() {
    if (!username) return toast("error", "Profile not found!");

    // fetch profile
    let request = new GetProfileByUsernameRequest({
      username,
    });

    try {
      let response: GetProfileByUsernameResponse = await request.execute();
      setProfile(response.profile);

      // fetch feed posts after profile fetch success
      fetchFeedPosts();
    } catch (e: any) {
      console.log(e);
      toast("error", e.message);
    }
  }

  async function fetchFeedPosts() {
    let request = new GetPostsByUserIdRequest({
      user_id: 1,
    });
    try {
      let response: GetPostsByUserIdResponse = await request.execute();
      setFeedPosts(response.posts);
    } catch (e: any) {
      toast("error", e.message);
    }
  }

  useEffect(() => {
    fetchProfile();
  }, []);

  if (!profile) {
    return <></>;
  }

  return (
    <>
      <Block marginTop={"20px"}>
        <Grid behavior={BEHAVIOR.fluid}>
          <Cell span={[12, 12, 4]}>
            <UserCard profile={profile} />
          </Cell>
          <Cell span={[12, 12, 8]}>
            {feedPosts && <FeedPostList posts={feedPosts} />}
          </Cell>
        </Grid>
      </Block>
    </>
  );
}
