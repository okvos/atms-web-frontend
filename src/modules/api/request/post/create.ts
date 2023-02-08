import { APIRequest, HTTPMethod } from "@atms/api/api";

type PostCreatePostRequestType = {
  text: string;
};

type PostCreatePostResponseType = {
  post_id: number;
};

export class PostCreatePostRequest extends APIRequest {
  constructor(body: PostCreatePostRequestType) {
    super();
    this.method = HTTPMethod.POST;
    this.body = body;
    this.path = "/post/create";
  }

  async execute(): Promise<PostCreatePostResponseType> {
    return super.execute();
  }
}
