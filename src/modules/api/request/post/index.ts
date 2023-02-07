import { APIRequest, HTTPMethod } from "../../api";
import { Post } from "@atms/api/models";

type GetPostByIdRequestType = {
  post_id: number;
};

export type GetPostByIdResponseType = {
  post: Post;
};

export class GetPostByIdRequest extends APIRequest {
  constructor(body: GetPostByIdRequestType) {
    super();
    this.path = `/post/${body.post_id}`;
    this.method = HTTPMethod.GET;
  }

  async execute(): Promise<GetPostByIdResponseType> {
    return super.execute();
  }
}
