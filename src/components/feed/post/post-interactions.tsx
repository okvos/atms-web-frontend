import { ButtonGroup } from "baseui/button-group";
import { Button } from "baseui/button";

const ButtonGroupOverrides = {
  Root: {
    style: ({ $theme }: any) => ({
      borderTop: `1.2px solid ${$theme.borders.border200.borderColor}`,
      backgroundColor: $theme.colors.inputFill,
      justifyContent: "space-around",
      paddingTop: "0.5em",
    }),
  },
};

const ButtonOverrides = {
  BaseButton: {
    style: ({ $theme, $isSelected }: any) => ({
      backgroundColor:
        $isSelected === true
          ? $theme.colors.inputFillActive
          : $theme.colors.inputFill,
      color: $theme.colors.buttonSecondaryText,
    }),
  },
};

type PostInteractionsProps = {
  isLiked?: boolean;
};

export function PostInteractions({ isLiked }: PostInteractionsProps) {
  return (
    <ButtonGroup overrides={ButtonGroupOverrides}>
      <Button overrides={ButtonOverrides} isSelected={isLiked}>
        Like
      </Button>
      <Button overrides={ButtonOverrides}>Comments</Button>
      <Button overrides={ButtonOverrides}>Share</Button>
    </ButtonGroup>
  );
}
