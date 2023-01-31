import { APIResponse } from "./models/Response";
import { API_URL } from "../../config/constants";

export enum HTTPMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

export async function apiRequest(
  method: HTTPMethod,
  path: string,
  body?: object
) {
  return await fetch(`${API_URL}${path}`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: typeof body === "object" ? JSON.stringify(body) : null,
  });
}

export class APIRequest {
  body = {};
  path = "/foo";
  method = HTTPMethod.GET;

  async execute() {
    const req = await apiRequest(this.method, this.path, this.body);
    if (!req.ok || req.status === 500) {
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
