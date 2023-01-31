import { APIRequest, HTTPMethod } from "../../api";
import { APIResponse } from "../Response";
import { Profile } from "./Profile";

type _GetProfileByUsernameRequest = {
  username: string;
};

export type GetProfileByUsernameResponse = {
  profile: Profile;
};

export class GetProfileByUsernameRequest extends APIRequest {
  constructor(body: _GetProfileByUsernameRequest) {
    super();
    this.path = `/profile/${body.username}`;
    this.method = HTTPMethod.GET;
  }

  handleResponse(resp: APIResponse): GetProfileByUsernameResponse {
    return resp.response;
  }
}
