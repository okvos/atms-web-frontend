import { APIRequest, HTTPMethod } from "@atms/api/api";
import { Post } from "@atms/api/models/Post";

type GetUserIdPostsRequestType = {
  user_id: number;
};

export type GetUserIdPostsResponseType = {
  posts: Post[];
};

export class GetUserIdPostsRequest extends APIRequest {
  constructor(body: GetUserIdPostsRequestType) {
    super();
    this.path = `/user/${body.user_id}/posts`;
    this.method = HTTPMethod.GET;
  }

  async execute(): Promise<GetUserIdPostsResponseType> {
    return super.execute();
  }
}
