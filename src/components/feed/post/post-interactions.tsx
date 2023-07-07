import { ButtonGroup } from "baseui/button-group";
import { Button } from "baseui/button";
import {
  InteractionButtonOverrides,
  InteractionButtonGroupOverrides,
  InteractionLabel,
} from "./styled-components";
import { useAuth } from "@atms/modules/auth/auth";
import { LikeFilled, LikeOutline } from "@atms/components/icons/like";
import { CommentOutlineDots } from "@atms/components/icons/comment";
import { CommentFilledDots } from "@atms/components/icons/comment/comment-filled-dots";
import { useState } from "react";

type PostInteractionsProps = {
  isLiked?: boolean;
  likePost: () => void;
  showComments: () => void;
  totalLikes: number;
  totalComments: number;
};

export function PostInteractions({
  isLiked,
  likePost,
  totalLikes,
  totalComments,
  showComments,
}: PostInteractionsProps) {
  const { isLoggedIn } = useAuth();
  const [isLiking, setIsLiking] = useState<boolean>(false);

  return (
    <ButtonGroup overrides={InteractionButtonGroupOverrides}>
      <Button
        overrides={InteractionButtonOverrides}
        disabled={!isLoggedIn || isLiking}
        isLoading={isLiking}
        onClick={async () => {
          setIsLiking(true);
          await likePost();
          setIsLiking(false);
        }}
      >
        {isLiked === true ? <LikeFilled /> : <LikeOutline />}{" "}
        <InteractionLabel>
          {totalLikes === 0
            ? "Be the first to like this!"
            : `${totalLikes} like${totalLikes === 1 ? "" : "s"}`}
        </InteractionLabel>
      </Button>
      <Button onClick={showComments} overrides={InteractionButtonOverrides}>
        <CommentFilledDots />
        <InteractionLabel>
          {totalComments === 0
            ? "No replies"
            : `${totalComments} repl${totalComments === 1 ? "y" : "ies"}`}
        </InteractionLabel>
      </Button>
    </ButtonGroup>
  );
}
