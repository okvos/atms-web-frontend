import { APIRequest, HTTPMethod } from "@atms/api/api";
import { APIResponse } from "@atms/api/models";

// check if following
type GetUserFollowRequestType = {
  userId: number;
};
type GetUserFollowResponseType = {
  following: boolean;
};

// follow user
type PostUserFollowRequestType = {
  userId: number;
};
type PostUserFollowResponseType = {
  success: boolean;
};

// unfollow user
type DeleteUserFollowRequestType = {
  userId: number;
};
type DeleteUserFollowResponseType = {
  success: boolean;
};

export class GetUserFollowRequest extends APIRequest {
  constructor(body: GetUserFollowRequestType) {
    super();
    this.path = `/user/${body.userId}/follow`;
    this.method = HTTPMethod.GET;
  }

  async execute(): Promise<GetUserFollowResponseType> {
    return super.execute();
  }
}

export class PostUserFollowRequest extends APIRequest {
  constructor(body: PostUserFollowRequestType) {
    super();
    this.path = `/user/${body.userId}/follow`;
    this.method = HTTPMethod.POST;
  }

  async execute(): Promise<PostUserFollowResponseType> {
    return super.execute();
  }

  handleResponse(resp: APIResponse): PostUserFollowResponseType {
    return {
      success: resp.success,
    };
  }
}

export class DeleteUserFollowRequest extends APIRequest {
  constructor(body: DeleteUserFollowRequestType) {
    super();
    this.path = `/user/${body.userId}/follow`;
    this.method = HTTPMethod.DELETE;
  }

  async execute(): Promise<DeleteUserFollowResponseType> {
    return super.execute();
  }

  handleResponse(resp: APIResponse): DeleteUserFollowResponseType {
    return {
      success: resp.success,
    };
  }
}
