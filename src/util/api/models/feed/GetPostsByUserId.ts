import { APIRequest, HTTPMethod } from "../../api";
import { APIResponse } from "../Response";
import { Post } from "./Post";

type _GetPostsByUserIdRequest = {
  user_id: number;
};

export type GetPostsByUserIdResponse = {
  posts: Post[];
};

export class GetPostsByUserIdRequest extends APIRequest {
  constructor(body: _GetPostsByUserIdRequest) {
    super();
    this.path = `/user/${body.user_id}/posts`;
    this.method = HTTPMethod.GET;
  }

  handleResponse(resp: APIResponse): GetPostsByUserIdResponse {
    return resp.response;
  }
}
