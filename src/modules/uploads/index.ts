import { toast } from "@atms/modules/notifications/toast";
import {
  ImageType,
  PostUploadImageRequest,
} from "@atms/api/request/upload-image";

function readFileAsync(file: File) {
  return new Promise((resolve, reject) => {
    let reader = new FileReader();

    reader.onload = () => {
      resolve(reader.result);
    };

    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
}

export async function uploadImage(imageFile: File): Promise<string> {
  let file = await readFileAsync(imageFile) as ArrayBuffer;
  let arr = new Uint8Array(file).subarray(0, 4);
  let header = "";
  let imageType;
  for (let i = 0; i < arr.length; i++) {
    header += arr[i].toString(16);
  }
  switch (header) {
    case "89504e47":
      imageType = ImageType.PNG;
      break;
    case "47494638":
      imageType = ImageType.GIF;
      break;
    case "ffd8ffe0":
    case "ffd8ffe1":
    case "ffd8ffe2":
    case "ffd8ffe3":
    case "ffd8ffe8":
      imageType = ImageType.JPG;
      break;
    default:
      toast("error", "Invalid image type. Only PNG, JPG, or GIF are allowed.");
      return "";
  }

  let req = new PostUploadImageRequest({ image_type: imageType });
  let resp = await req.execute();

  await fetch(resp.url, {
    method: "PUT",
    body: file,
  });

  return resp.key;
}
