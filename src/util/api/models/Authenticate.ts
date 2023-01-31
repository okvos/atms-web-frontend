import { User } from "./User";
import { APIRequest, HTTPMethod } from "../api";
import { APIResponse } from "./Response";

type _AuthenticateRequest = {
  username: string;
  password: string;
};

export type AuthenticateResponse = {
  user: User;
};

export class AuthenticateRequest extends APIRequest {
  constructor(body: _AuthenticateRequest) {
    super();
    this.path = "/authenticate";
    this.method = HTTPMethod.PUT;
    this.body = body;
  }

  handleResponse(resp: APIResponse): AuthenticateResponse {
    return resp.response;
  }
}
