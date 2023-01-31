import React, { useEffect, useState } from "react";
import { Block } from "baseui/block";
import { MessageCard } from "baseui/message-card";
import { Grid, Cell, BEHAVIOR } from "baseui/layout-grid";

import { useParams } from "react-router-dom";
import { FeedPost } from "../feed/post/FeedPost";
import { toast } from "../../modules/notifications/toast";
import {
  GetPostsByUserIdRequest,
  GetPostsByUserIdResponse,
} from "../../util/api/models/feed/GetPostsByUserId";
import { Post } from "../../util/api/models/feed/Post";

export default function Profile() {
  const { username } = useParams();
  const [feedPosts, setFeedPosts] = useState<Post[]>([]);

  let request = new GetPostsByUserIdRequest({
    user_id: 1,
  });
  async function fetchFeedPosts() {
    try {
      let response: GetPostsByUserIdResponse = await request.execute();
      setFeedPosts(response.posts);
    } catch (e: any) {
      toast("error", e.message);
    }
  }

  useEffect(() => {
    fetchFeedPosts();
  }, []);

  if (!username) {
    return <></>;
  }

  return (
    <>
      <Block marginTop={"20px"}>
        <Grid behavior={BEHAVIOR.fluid}>
          <Cell span={[12, 12, 4]}>
            <MessageCard
              heading={username}
              buttonLabel="Follow"
              onClick={() => alert("click")}
              paragraph="hi welcome to my page!"
              image={{
                ariaLabel: "Test",
                src: "https://images.unsplash.com/photo-1530789253388-582c481c54b0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80",
              }}
            />
          </Cell>
          <Cell span={[12, 12, 8]}>
            {feedPosts &&
              feedPosts.map((post, key) => {
                return (
                  <FeedPost
                    key={key}
                    username={username}
                    date={post.date}
                    text={post.text}
                  />
                );
              })}
          </Cell>
        </Grid>
      </Block>
    </>
  );
}
