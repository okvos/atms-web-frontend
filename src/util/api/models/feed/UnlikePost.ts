import { APIRequest, HTTPMethod } from "../../api";
import { APIResponse } from "../Response";

type UnlikePostRequestType = {
  post_id: number;
};

export type UnlikePostResponseType = {
  success: boolean;
};

export class UnlikePostRequest extends APIRequest {
  constructor(body: UnlikePostRequestType) {
    super();
    this.path = `/post/${body.post_id}/like`;
    this.method = HTTPMethod.DELETE;
  }

  handleResponse(resp: APIResponse): UnlikePostResponseType {
    return { success: resp.success };
  }
}
