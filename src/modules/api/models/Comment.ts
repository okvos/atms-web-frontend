import { ProfileSummary } from "@atms/api/models/ProfileSummary";

export type Comment = {
  comment_id: number;
  author: ProfileSummary;
  text: string;
  date: number;
};
