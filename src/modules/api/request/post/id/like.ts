import { APIRequest, HTTPMethod } from "@atms/api/api";
import { APIResponse } from "@atms/api/models";

// like post
type PostLikePostIdRequestType = {
  postId: number;
};
type PostLikePostIdResponseType = {
  success: boolean;
};

// unlike post
type DeletePostIdLikeRequestType = {
  postId: number;
};
type DeletePostIdLikeResponseType = {
  success: boolean;
};
export class PostLikePostIdRequest extends APIRequest {
  constructor(body: PostLikePostIdRequestType) {
    super();
    this.path = `/post/${body.postId}/like`;
    this.method = HTTPMethod.POST;
  }

  async execute(): Promise<PostLikePostIdResponseType> {
    return super.execute();
  }

  handleResponse(resp: APIResponse): PostLikePostIdResponseType {
    return {
      success: resp.success,
    };
  }
}

export class DeletePostIdLikeRequest extends APIRequest {
  constructor(body: DeletePostIdLikeRequestType) {
    super();
    this.path = `/post/${body.postId}/like`;
    this.method = HTTPMethod.DELETE;
  }

  async execute(): Promise<DeletePostIdLikeResponseType> {
    return super.execute();
  }

  handleResponse(resp: APIResponse): DeletePostIdLikeResponseType {
    return {
      success: resp.success,
    };
  }
}
