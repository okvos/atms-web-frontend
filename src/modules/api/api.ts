import { APIResponse } from "./models/Response";
import { API_URL } from "../../config/constants";
import {toast} from "@atms/modules/notifications/toast";

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
  credentials: string;
};

export async function apiRequest(
  method: HTTPMethod,
  path: string,
  body?: object | null
) {
  let reqBody: HTTPBody = {
    method: method,
    credentials: "include",
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
    if (this.method === HTTPMethod.GET) this.body = null;
    const req = await apiRequest(this.method, this.path, this.body);

    let respJson;
    try {
      respJson = await req.json();
    } catch (e) {
      throw Error("Server error. Please try again later. (1)");
    }

    if (respJson.error !== null && respJson.error !== false) {
      if (typeof respJson.response === "string") {
        toast("error", respJson.response);
        throw Error(respJson.response);
      }
      else if (respJson.response.message !== undefined)
        throw Error(respJson.response.message);
      else {
        throw Error("Server error. Please try again later. (2)");
      }
    }

    if (!req || !req.ok) {
      throw Error("Server error. Please try again later. (3)");
    }

    return this.handleResponse(respJson);
  }

  handleResponse(resp: APIResponse): any {
    return resp.response;
  }
}
