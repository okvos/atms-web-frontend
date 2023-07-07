export type Post = {
  post_id: number;
  user_id: number;
  date: number;
  text: string;
  is_liked: boolean;
  username: string;
  num_comments: number;
  num_likes: number;
  num_shares: number;
};
