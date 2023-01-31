import { APIResponse } from "./models/Response";
import { API_URL } from "../../config/constants";

export enum HTTPMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}
type HTTPBody = {
  method: HTTPMethod;
  body?: string;
  headers?: object;
};

export async function apiRequest(
  method: HTTPMethod,
  path: string,
  body?: object | null
) {
  let reqBody: HTTPBody = {
    method: method,
  };
  if (body && typeof body === "object") {
    reqBody.body = JSON.stringify(body);
    reqBody.headers = {
      "Content-Type": "application/json",
    };
  }
  return await fetch(`${API_URL}${path}`, reqBody as object);
}

export class APIRequest {
  body: object | null = {};
  path = "/foo";
  method = HTTPMethod.GET;

  async execute() {
    if (this.method === HTTPMethod.GET)
      this.body = null;
    const req = await apiRequest(this.method, this.path, this.body);
    if (!req || !req.ok || req.status === 500) {
      throw Error("Server error. Please try again later.");
    }
    let respJson;
    try {
      respJson = await req.json();
    } catch (e) {
      throw Error("Invalid response from server");
    }

    if (respJson.error !== null) {
      throw Error(respJson.response.message);
    }

    return this.handleResponse(respJson);
  }

  handleResponse(resp: APIResponse): any {
    return null;
  }
}
