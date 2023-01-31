import { APIRequest, HTTPMethod } from "../../api";
import { APIResponse } from "../Response";
import { Post } from "./Post";

type _GetPostByIdRequest = {
  post_id: number;
};

export type GetPostByIdResponse = {
  post: Post;
};

export class GetPostByIdRequest extends APIRequest {
  constructor(body: _GetPostByIdRequest) {
    super();
    this.path = `/post/${body.post_id}`;
    this.method = HTTPMethod.GET;
  }

  handleResponse(resp: APIResponse): GetPostByIdResponse {
    return resp.response;
  }
}
