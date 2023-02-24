import { ProfileSummary } from "@atms/api/models/ProfileSummary";

export type Comment = {
  author: ProfileSummary;
  text: string;
  date: number;
};
