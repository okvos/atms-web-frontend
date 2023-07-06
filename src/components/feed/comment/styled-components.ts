import { styled } from "baseui";

export const CommentSendButtonOverrides = {
  BaseButton: {
    style: ({ $theme, $isSelected }: any) => ({
      backgroundColor:
        $isSelected === true ? $theme.colors.inputFillActive : "transparent",
      color: $theme.colors.buttonSecondaryText,
    }),
  },
};

export const CommentContainer = styled("div", ({ $theme }) => ({
  margin: "1em 0.5em",
  display: "flex",
  alignItems: "center",
}));

export const CommentTextBubble = styled("div", ({ $theme }) => ({
  backgroundColor: $theme.colors.primary700,
  padding: "10px",
  borderRadius: $theme.borders.radius400,
  ...$theme.typography.font200,
}));

export const CommentContent = styled("div", ({ $theme }) => ({
  marginLeft: "10px",
}));

export const CommentAuthor = styled("label", ({ $theme }) => ({
  ...$theme.typography.LabelXSmall,
  color: $theme.colors.primary400,
  marginLeft: "5px",
}));
