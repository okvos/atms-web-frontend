import React, { useState } from "react";
import { CreatePostContainer } from "@atms/components/feed/post/styled-components";
import { Textarea } from "baseui/textarea";
import { FormControl } from "baseui/form-control";
import { Button, SIZE } from "baseui/button";
import { toast } from "@atms/modules/notifications/toast";
import { PostCreatePostRequest } from "@atms/api/request/post/create";
import { Post } from "@atms/api/models";
import { useAuth } from "@atms/modules/auth/auth";

export const ButtonOverrides = {
  display: "flex",
  marginLeft: "auto",
};

export function CreatePost({
  addFeedPost,
}: {
  addFeedPost: (post: Post) => void;
}) {
  const { account } = useAuth();

  const [postText, setPostText] = useState<string>("");
  const [isSharing, setIsSharing] = useState<boolean>(false);

  async function sharePost() {
    if (isSharing) return toast("info", "Please wait....");
    if (postText.length < 1 || postText.length > 1000)
      return toast("error", "Your post should be 1-1000 characters");

    setIsSharing(true);
    let req = new PostCreatePostRequest({ text: postText });
    try {
      let { post_id } = await req.execute();
      let post: Post = {
        post_id: post_id,
        username: account.username || "",
        user_id: account.user_id || 0,
        text: postText,
        date: new Date().getTime() / 1000,
        is_liked: false,
      };
      addFeedPost(post);
    } catch (e) {
      toast(
        "error",
        "There was an error creating your post. Please try again."
      );
    } finally {
      setIsSharing(false);
    }
  }

  return (
    <CreatePostContainer>
      <FormControl
        label="Create a Post"
        caption={
          postText.length > 0
            ? `${postText.length} / 1000 characters`
            : undefined
        }
      >
        <Textarea
          onChange={(e) => setPostText(e.target.value)}
          placeholder="What's on your mind?"
        />
      </FormControl>
      {postText !== "" && (
        <Button
          onClick={sharePost}
          isLoading={isSharing}
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
