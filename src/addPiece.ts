import * as functions from "firebase-functions";
// import * as admin from "firebase-admin";

export const addPiece = functions.storage.object().onFinalize((obj, ctx) => {
  if (!obj.contentType?.startsWith("images/")) {
    return false;
  }
  functions.logger.info(obj.name);
  functions.logger.info(obj.bucket);
  return true;
});
