import { ButtonGroup } from "baseui/button-group";
import { Button } from "baseui/button";
import {
  InteractionButtonOverrides,
  InteractionButtonGroupOverrides,
} from "./styled-components";
import { useAuth } from "../../../modules";
import { UnlikePostRequest } from "../../../util/api/models/feed/UnlikePost";

type PostInteractionsProps = {
  isLiked?: boolean;
  likePost: () => void;
};

export function PostInteractions({ isLiked, likePost }: PostInteractionsProps) {
  const { isLoggedIn } = useAuth();

  return (
    <ButtonGroup overrides={InteractionButtonGroupOverrides}>
      <Button
        overrides={InteractionButtonOverrides}
        isSelected={isLiked}
        disabled={!isLoggedIn}
        onClick={likePost}
      >
        {isLiked === true ? "Unlike" : "Like"}
      </Button>
      <Button overrides={InteractionButtonOverrides}>Comments</Button>
      <Button overrides={InteractionButtonOverrides}>Share</Button>
    </ButtonGroup>
  );
}
