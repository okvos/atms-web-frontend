import { APIRequest, HTTPMethod } from "../../api";
import { Profile } from "@atms/api/models";

type GetProfileByUsernameRequestType = {
  username: string;
};

export type GetProfileByUsernameResponseType = {
  profile: Profile;
};

export class GetProfileByUsernameRequest extends APIRequest {
  constructor(body: GetProfileByUsernameRequestType) {
    super();
    this.path = `/profile/${body.username}`;
    this.method = HTTPMethod.GET;
  }

  async execute(): Promise<GetProfileByUsernameResponseType> {
    return super.execute();
  }
}
