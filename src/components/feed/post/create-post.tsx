import React, { useState } from "react";
import { CreatePostContainer } from "@atms/components/feed/post/styled-components";
import { Textarea } from "baseui/textarea";
import { FormControl } from "baseui/form-control";
import { Button, SIZE } from "baseui/button";

export const ButtonOverrides = {
  display: "flex",
  marginLeft: "auto",
};

export function CreatePost() {
  const [postText, setPostText] = useState<string>("");
  return (
    <CreatePostContainer>
      <FormControl
        label="Create a Post"
        caption={`${postText.length} / 1000 characters`}
      >
        <Textarea
          onChange={(e) => setPostText(e.target.value)}
          placeholder="What's on your mind?"
        />
      </FormControl>
      {postText !== "" && (
        <Button
          overrides={{
            BaseButton: {
              style: ButtonOverrides,
            },
          }}
          size={SIZE.compact}
        >
          Share Post
        </Button>
      )}
    </CreatePostContainer>
  );
}
