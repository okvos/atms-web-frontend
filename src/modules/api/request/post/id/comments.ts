import { APIRequest, HTTPMethod } from "@atms/api/api";
import { Comment } from "@atms/api/models/Comment";

export type GetPostIdCommentsRequestType = {
  post_id: number;
  last_id?: number;
};

export type GetPostIdCommentsResponseType = {
  comments: Comment[];
};

export class GetPostIdCommentsRequest extends APIRequest {
  constructor(body: GetPostIdCommentsRequestType) {
    super();
    this.path = `/post/${body.post_id}/comments`;
    if (body.last_id && body.last_id !== 0 && !isNaN(body.last_id))
      this.path += `?last_id=${body.last_id}`;
    this.method = HTTPMethod.GET;
  }

  async execute(): Promise<GetPostIdCommentsResponseType> {
    return super.execute();
  }
}

type PostPostIdCommentsRequestType = {
  text: string;
  post_id: number;
};

type PostPostIdCommentsResponseType = {
  comment_id: number;
};

export class PostPostIdCommentsRequest extends APIRequest {
  constructor(body: PostPostIdCommentsRequestType) {
    super();
    this.method = HTTPMethod.POST;
    this.body = { text: body.text };
    this.path = `/post/${body.post_id}/comments`;
  }

  async execute(): Promise<PostPostIdCommentsResponseType> {
    return super.execute();
  }
}
