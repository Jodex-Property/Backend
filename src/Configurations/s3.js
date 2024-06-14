import AWS from "aws-sdk";
import * as secrets from "../secrets.js";

const s3 = new AWS.S3({
  accessKeyId: secrets.AMAZON_S3_ACCESS_KEY_ID,
  secretAccessKey: secrets.AMAZON_S3_ACCESS_SECRET,
  region: secrets.AWS_BUCKET_REGION,
});
export default s3;
