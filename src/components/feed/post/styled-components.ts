import { styled } from "baseui";

export const PostTextContainer = styled("div", ({ $theme }) => ({
  ...$theme.typography.ParagraphSmall,
  marginTop: "0.3em",
  marginBottom: "1em",
}));

export const PostTitleContainer = styled("div", ({ $theme }) => ({
  display: "flex",
  marginBottom: "1em",
  ...$theme.typography.ParagraphSmall,
}));

export const PostAuthorContainer = styled("div", () => ({
  lineHeight: "20px",
  alignSelf: "center",
  marginLeft: "0.75em",
}));

export const PostTitleDate = styled("span", ({ $theme }) => ({
  color: $theme.colors.primary400,
}));

export const PostContainer = styled("section", ({ $theme }) => ({
  backgroundColor: $theme.colors.inputFill,
  borderRadius: $theme.borders.radius400,
  width: "100%",
  color: $theme.colors.primary,
  boxShadow: `0 1px 2px ${$theme.borders.border500.borderColor}`,
}));

export const InteractionButtonGroupOverrides = {
  Root: {
    style: ({ $theme }: any) => ({
      borderTop: `1.2px solid ${$theme.borders.border200.borderColor}`,
      backgroundColor: $theme.colors.inputFill,
      justifyContent: "space-around",
      paddingTop: "0.5em",
    }),
  },
};

export const InteractionButtonOverrides = {
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

export const CreatePostContainer = styled("div", ({ $theme }) => ({
  ...$theme.typography.font200,
  padding: "1em 2em",
  backgroundColor: $theme.colors.backgroundSecondary,
  borderRadius: $theme.borders.radius400,
  color: $theme.colors.contentSecondary,
  marginBottom: "1em",
}));
