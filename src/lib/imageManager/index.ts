import { environment } from "@/constants";
import AWS from "aws-sdk";
import { CredentialsOptions } from "aws-sdk/lib/credentials";
import { v4 } from "uuid";

export class ImageManager {
  s3: AWS.S3;

  constructor(credentials: CredentialsOptions) {
    this.s3 = new AWS.S3({
      region: environment.region,
      credentials,
    });
  }

  async uploadDataUrl(data: Blob) {
    const buffer = await data.arrayBuffer();

    return this.s3.upload({
      Body: buffer,
      Key: v4(),
      Bucket: environment.region,
      ContentType: "image/png",
    });
  }
}
