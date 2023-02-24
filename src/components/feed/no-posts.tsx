import React from "react";
import { styled } from "baseui";

const NoPostsBlock = styled("div", ({ $theme }) => ({
  ...$theme.typography.HeadingSmall,
  padding: "5em 1em",
  textAlign: "center",
  color: $theme.colors.contentStateDisabled,
  backgroundColor: $theme.colors.backgroundSecondary,
  borderRadius: $theme.borders.radius400,
  userSelect: "none",
}));

export function NoPosts() {
  return <NoPostsBlock>This user hasn't posted yet.</NoPostsBlock>;
}
