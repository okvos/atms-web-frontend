import { APIRequest, HTTPMethod } from "@atms/api/api";

export enum ImageType {
  PNG = "png",
  JPG = "jpg",
  GIF = "gif",
}

type PostUploadImageRequestType = {
  image_type: ImageType;
};

type PostUploadImageResponseType = {
  url: string;
  key: string;
};

export class PostUploadImageRequest extends APIRequest {
  constructor(body: PostUploadImageRequestType) {
    super();
    this.method = HTTPMethod.POST;
    this.path = "/upload-image";
    this.body = body;
  }

  async execute(): Promise<PostUploadImageResponseType> {
    return super.execute();
  }
}
