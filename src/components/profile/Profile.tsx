import React, { useEffect, useState } from "react";
import { Block } from "baseui/block";
import { MessageCard } from "baseui/message-card";
import { Grid, Cell, BEHAVIOR } from "baseui/layout-grid";

import { useParams } from "react-router-dom";
import { FeedPost } from "../feed/post/feed-post";
import { toast } from "../../modules/notifications/toast";
import {
  GetPostsByUserIdRequest,
  GetPostsByUserIdResponse,
  GetProfileByUsernameRequest,
  GetProfileByUsernameResponse,
} from "../../util/api";
import { Post } from "../../util/api/models/feed/Post";
import { Profile as ProfileModel } from "../../util/api/models/profile/Profile";

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
            <MessageCard
              heading={profile.username}
              buttonLabel="Follow"
              onClick={() => alert("click")}
              paragraph={profile.bio}
              image={{
                ariaLabel: "Test",
                src: profile.header_image_url,
              }}
            />
          </Cell>
          <Cell span={[12, 12, 8]}>
            {feedPosts &&
              feedPosts.map((post, key) => {
                return (
                  <FeedPost
                    key={key}
                    post={post}
                  />
                );
              })}
          </Cell>
        </Grid>
      </Block>
    </>
  );
}
