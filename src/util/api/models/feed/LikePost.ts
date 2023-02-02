import { APIRequest, HTTPMethod } from "../../api";
import { APIResponse } from "../Response";

type LikePostRequestType = {
  post_id: number;
};

export type LikePostResponseType = {
  success: boolean;
};

export class LikePostRequest extends APIRequest {
  constructor(body: LikePostRequestType) {
    super();
    this.path = `/post/${body.post_id}/like`;
    this.method = HTTPMethod.POST;
  }

  handleResponse(resp: APIResponse): LikePostResponseType {
    return { success: resp.success };
  }
}
