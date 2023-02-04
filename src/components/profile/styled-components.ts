import { styled } from "baseui";

export const UserCardContainer = styled("div", ({ $theme }) => ({
  backgroundColor: $theme.colors.backgroundSecondary,
  borderRadius: $theme.borders.radius400,
  overflow: "hidden"
}));

export const UserCardHeader = styled<"div", {
  $theme?: any,
  $src: string
}>("div", ({$src}) => ({
  width: "100%",
  height: "132px",
  backgroundImage: `url(${$src})`,
  backgroundPosition: "center",
  backgroundSize: "cover"
}));

export const UserCardAuthorContainer = styled("div", ({$theme}) => ({
  display: "flex",
  alignItems: "center"
}));

export const UserCardInfoContainer = styled("div", ({$theme}) => ({
  padding: "1em",
}));

export const UserCardUsername = styled("div", () => ({
  marginLeft: "10px"
}));
export const UserCardButton = styled("div", () => ({
  marginLeft: "auto"
}));
export const UserCardStatsContainer = styled("div", ({$theme}) => ({
  ...$theme.typography.ParagraphSmall,
  color: $theme.colors.contentSecondary,
  display: "flex",
  justifyContent: "space-evenly",
  paddingTop: "10px",
  borderTop: `1px solid ${$theme.borders.border200.borderColor}`
}));
