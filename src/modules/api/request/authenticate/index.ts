import { User } from "@atms/api/models";
import { APIRequest, HTTPMethod } from "../../api";

type PutAuthenticateRequestType = {
  username: string;
  password: string;
};

export type PutAuthenticateResponseType = {
  user: User;
};

export class PutAuthenticateRequest extends APIRequest {
  constructor(body: PutAuthenticateRequestType) {
    super();
    this.path = "/authenticate";
    this.method = HTTPMethod.PUT;
    this.body = body;
  }

  async execute(): Promise<PutAuthenticateResponseType> {
    return super.execute();
  }
}
