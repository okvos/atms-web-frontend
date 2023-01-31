import React from "react";
import { Block } from "baseui/block";
import { MessageCard } from "baseui/message-card";
import { Grid, Cell, BEHAVIOR } from "baseui/layout-grid";

import { useParams } from "react-router-dom";
import { FeedPost } from "../feed/post/FeedPost";

export default function Profile() {
  const { username } = useParams();
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
            <FeedPost
              username={username}
              date={"1 hour ago"}
              text="Test 123 post component"
            />
          </Cell>
        </Grid>
      </Block>
    </>
  );
}
