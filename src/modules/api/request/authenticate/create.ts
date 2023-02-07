import { APIRequest, HTTPMethod } from "@atms/api/api";
import { User } from "@atms/api/models";

type PutAuthenticateCreateRequestType = {
  username: string;
  password: string;
  email: string;
};

type PutAuthenticateCreateResponseType = {
  user: User;
};

export class PutAuthenticateCreateRequest extends APIRequest {
  constructor(body: PutAuthenticateCreateRequestType) {
    super();
    this.method = HTTPMethod.PUT;
    this.path = "/authenticate/create";
    this.body = body;
  }

  async execute(): Promise<PutAuthenticateCreateResponseType> {
    return super.execute();
  }
}
