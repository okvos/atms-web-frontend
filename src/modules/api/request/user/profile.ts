import { APIRequest, HTTPMethod } from "@atms/api/api";

// update profile
type PutUserProfileRequestType = {
  bio: string;
  display_name: string;
  header_image_url: string;
};
type PutUserProfileResponseType = {
  success: boolean;
};

export class PutUserProfileRequest extends APIRequest {
  constructor(body: PutUserProfileRequestType) {
    super();
    this.path = `/user/profile`;
    this.method = HTTPMethod.PUT;
    this.body = body;
  }

  async execute(): Promise<PutUserProfileResponseType> {
    return super.execute();
  }
}
